"use client";

import React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import classNames from "classnames";
import { HEADER_HEIGHT, useLenis } from "@/app/lenis-provider";
import styles from "./style.module.scss";

/**
 * グローバルメニュー（Figma: node 2803-252）
 * 右上の watoto マークがトグル。ブラーのかかったパネルが画面右からスライドインし、
 * 出きったところで中のテキストリンクが順にフェードインする。
 */

export type GlobalMenuItem = { label: string; href: string };

type Props = {
  items: GlobalMenuItem[];
  className?: string;
};

/** パネルのスライド時間（style.module.scss の transition と揃える） */
const PANEL_DURATION_MS = 900;
/** スライドを少し追い越して中身のフェードを始めるまでの待ち時間 */
const CONTENT_DELAY_MS = PANEL_DURATION_MS - 350;

const TASTE_URL = "https://watoto-kula.com/";

const SUB_LINKS: GlobalMenuItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/watoto_stay_lita/" },
  { label: "Contact", href: "mailto:cafe.watoto@gmail.com" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

/** フェードインの順番を CSS 変数として渡す */
const fade = (index: number) =>
  ({ "--i": index }) as React.CSSProperties;

const isExternal = (href: string) =>
  /^(https?:|mailto:|tel:)/.test(href);

const GlobalMenu: React.FC<Props> = ({ items, className = "" }) => {
  const lenis = useLenis();
  const [isOpen, setIsOpen] = React.useState(false);
  // パネルを DOM に置いているか（閉じるアニメーションの間も true）
  const [isMounted, setIsMounted] = React.useState(false);
  const [panelIn, setPanelIn] = React.useState(false);
  const [contentIn, setContentIn] = React.useState(false);

  const close = React.useCallback(() => setIsOpen(false), []);

  // 開く: マウントしてから 2 段階 rAF で transform を効かせる（Safari/iOS 対策）
  React.useEffect(() => {
    if (!isOpen) {
      setContentIn(false);
      setPanelIn(false);
      return;
    }
    setIsMounted(true);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPanelIn(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [isOpen]);

  // パネルが出きるころに中身のフェードを開始
  React.useEffect(() => {
    if (!panelIn) return;
    const delay = prefersReducedMotion() ? 0 : CONTENT_DELAY_MS;
    const timer = window.setTimeout(() => setContentIn(true), delay);
    return () => window.clearTimeout(timer);
  }, [panelIn]);

  // 開いている間は Esc で閉じられるようにし、背面のスクロールを止める
  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      // 「動きを減らす」設定のときは lenis-provider 側が止めているので触らない
      if (!prefersReducedMotion()) lenis?.start();
    };
  }, [isOpen, lenis, close]);

  // 閉じきったらパネルを DOM から外す
  const onPanelTransitionEnd = (e: React.TransitionEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (!panelIn) setIsMounted(false);
  };

  // transitionend が来ない場合（動きを減らす設定など）の保険
  React.useEffect(() => {
    if (isOpen || !isMounted) return;
    const timer = window.setTimeout(() => setIsMounted(false), PANEL_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen, isMounted]);

  /**
   * ページ内リンク。閉じる処理でスクロールロックが解除されるのを待たずに済むよう、
   * ここで lenis を再開してから移動させる。
   */
  const onAnchorClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      close();
      if (!href.startsWith("#")) return;
      e.preventDefault();
      document.body.style.overflow = "";
      window.history.replaceState(null, "", href);
      if (lenis && !prefersReducedMotion()) {
        lenis.start();
        lenis.scrollTo(href, { offset: HEADER_HEIGHT });
      } else {
        document.getElementById(href.slice(1))?.scrollIntoView();
      }
    };

  const renderLink = (
    { label, href }: GlobalMenuItem,
    index: number,
    className?: string
  ) => {
    const props = {
      className: classNames(styles.link, className),
      style: fade(index),
      "data-fade": true,
    };

    if (href.startsWith("#")) {
      return (
        <a key={label} href={href} onClick={onAnchorClick(href)} {...props}>
          {label}
        </a>
      );
    }
    if (isExternal(href)) {
      return (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          onClick={close}
          {...props}
        >
          {label}
        </a>
      );
    }
    return (
      <Link key={label} href={href} onClick={close} {...props}>
        {label}
      </Link>
    );
  };

  // フェードの順番。上から順に少しずつ遅らせる
  let step = 0;
  const next = () => step++;

  const panel = (
    <div className={styles.GlobalMenu}>
      <div
        className={classNames(styles.overlay, panelIn && styles.isIn)}
        onClick={close}
      />

      <aside
        className={classNames(styles.panel, panelIn && styles.isIn)}
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
        onTransitionEnd={onPanelTransitionEnd}
      >
        <div className={classNames(styles.contents, contentIn && styles.isIn)}>
          <div className={styles.brands} style={fade(next())} data-fade>
            <a
              className={styles.brand}
              href={TASTE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Taste
            </a>
            <span className={styles.brands__divider} aria-hidden />
            <span
              className={classNames(styles.brand, styles["brand--current"])}
              aria-current="page"
            >
              Stay
            </span>
          </div>

          <nav className={styles.nav} aria-label="グローバルメニュー">
            {items.map((item) => renderLink(item, next()))}
          </nav>

          <span className={styles.rule} style={fade(next())} data-fade aria-hidden />

          <div className={styles.subNav}>
            {SUB_LINKS.map((item) => renderLink(item, next()))}
          </div>

          <span className={styles.rule} style={fade(next())} data-fade aria-hidden />

          <div className={styles.address} style={fade(next())} data-fade>
            <p className={styles.address__ja}>
              〒917-0245
              <br />
              福井県小浜市忠野9-14
            </p>
            <p className={styles.address__en}>
              9-14, Chuno, Obama-shi
              <br />
              Fukui, 917-0245, Japan
            </p>
          </div>

          <p className={styles.copyright} style={fade(next())} data-fade>
            ©︎ 2026 watoto stay lita all rights reserved.
          </p>
        </div>
      </aside>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={classNames(styles.toggle, className)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.toggle__mark} aria-hidden />
      </button>

      {isMounted && typeof document !== "undefined"
        ? createPortal(panel, document.body)
        : null}
    </>
  );
};

export default GlobalMenu;
