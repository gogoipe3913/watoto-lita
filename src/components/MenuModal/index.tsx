// MenuModal.tsx
"use client";

import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import styles from "./style.module.scss";
import HamburgerIcon from "../HamburgerIcon";

type MenuModalProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

const CONTENT_OVERLAP_MS = 550; // ★ スライドインと少し重ねるディレイ（好みで調整）

const MenuModal: React.FC<MenuModalProps> = ({
  className = "",
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [active, setActive] = React.useState(false); // パネルの開閉
  const [contentActive, setContentActive] = React.useState(false); // 中身フェード制御

  // ★ 2段階 rAF（Safari/iOS対策）
  React.useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setActive(true));
      });
    } else {
      // 閉じるときは中身を先にフェードアウト → パネルを閉じる
      setContentActive(false);
      setActive(false);
    }
  }, [isOpen]);

  // Esc クローズ
  React.useEffect(() => {
    if (!isMounted) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMounted, onClose]);

  // 背景スクロール固定
  React.useEffect(() => {
    if (!isMounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMounted]);

  // ★ スライド開始後、少し遅らせて段階フェードを開始（reduce-motion なら即時）
  React.useEffect(() => {
    let timer: number | undefined;
    if (active) {
      let delay = CONTENT_OVERLAP_MS;
      if (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ) {
        delay = 0;
      }
      timer = window.setTimeout(() => setContentActive(true), delay);
    } else {
      setContentActive(false);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [active]);

  // ★ パネルの transform が終わったら（閉じ時のみ）アンマウント
  const onPanelTransitionEnd = (e: React.TransitionEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "transform") return;
    if (!active) {
      setIsMounted(false);
    }
  };

  if (!isMounted) return null;

  const modalNode = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={classNames(styles.MenuModalRoot, className)}
    >
      <div
        className={classNames(styles.Overlay, active && styles.isOpen)}
        onClick={onClose}
      />
      <aside
        className={classNames(styles.Panel, active && styles.isOpen)}
        onTransitionEnd={onPanelTransitionEnd}
      >
        <button
          className={classNames(
            styles.MenuModal__button,
            contentActive ? styles["MenuModal__button--active"] : ""
          )}
          aria-label="Close menu"
          onClick={onClose}
        >
          <HamburgerIcon className={styles.MenuModal__icon} />
        </button>

        <div
          className={classNames(
            styles.MenuModal__info,
            contentActive && styles.isOpen
          )}
        >
          <div className={styles.MenuModal__selectedPage}>
            <p className={styles.MenuModal__selectedPageText}>Taste</p>
            <p>
              <a href="https://www.instagram.com/watoto_stay_lita/">Stay</a>
            </p>
          </div>
          <ul className={styles.MenuModal__links}>
            <li>
              <a href="#philosophy" onClick={onClose}>
                Philosophy
              </a>
            </li>
            <li>
              <a href="#services" onClick={onClose}>
                Services
              </a>
            </li>
            <li>
              <a href="#gallery" onClick={onClose}>
                Gallery
              </a>
            </li>
            <li>
              <a href="#access" onClick={onClose}>
                Access
              </a>
            </li>
          </ul>
          <ul className={styles.MenuModal__links}>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/watoto_kyoto/"
                onClick={onClose}
              >
                instagram
              </a>
            </li>
            <li>
              <a href="mailto:watoto.kyoto@gmail.com" onClick={onClose}>
                contact
              </a>
            </li>
          </ul>
          <div className={styles.MenuModal__address}>
            <p className={styles.MenuModal__addressJa}>
              <span>〒606-0805</span>
              <span>京都府京都市左京区下鴨森本町9</span>
            </p>
            <p className={styles.MenuModal__addressEn}>
              <span>9, Morimoto-cho, Shimogamo,</span>
              <span>Sakyo-ku, Kyoto</span>
              <span>606-0805, Japan</span>
            </p>
          </div>
          <div className={styles.MenuModal__copyright}>
            ©︎ 2025 watoto all rights reserved.
          </div>
        </div>
      </aside>
    </div>
  );

  if (typeof document !== "undefined") {
    return ReactDOM.createPortal(modalNode, document.body);
  }
  return null;
};

export default MenuModal;
