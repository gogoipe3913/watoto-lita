"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type HeroMenuItem = { label: string; href: string };

type Props = {
  items: HeroMenuItem[];
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  markClassName?: string;
};

/**
 * グローバルナビ（Figma: node 2726-734）
 * 画面に固定して追従し、フッターに差し掛かると引っ込む（data-at-footer）。
 * 画面中央あたりを通過しているセクションに ● を出す現在地インジケーター付き。
 * ページ内アンカーは素の <a>（lenis のアンカー処理に任せる）、ページ遷移は Link。
 */
export default function HeroMenu({
  items,
  className,
  linkClassName,
  activeClassName,
  markClassName,
}: Props) {
  const ids = useMemo(
    () =>
      items
        .filter(({ href }) => href.startsWith("#"))
        .map(({ href }) => href.slice(1)),
    [items]
  );
  // 最上部（ヒーロー表示中）は先頭の項目を現在地にしておく
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        // 帯にかかっているもののうち、いちばん後ろのセクションを現在地とする
        // （#access は #information の中にあるため、後ろ勝ちで解決する）
        const current = targets.filter((el) => visible.has(el)).pop();
        if (current) setActiveId(current.id);
      },
      // 画面の高さ 45% の位置に置いた、高さ 0 の判定ライン
      { rootMargin: "-45% 0px -55% 0px", threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [ids]);

  // フッターが見えはじめたら引っ込める
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const io = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(footer);

    return () => io.disconnect();
  }, []);

  return (
    <nav
      className={className}
      aria-label="メインメニュー"
      data-at-footer={atFooter ? "true" : undefined}
    >
      {items.map(({ label, href }) => {
        const isActive = href.startsWith("#") && href.slice(1) === activeId;
        const classes = [linkClassName, isActive && activeClassName]
          .filter(Boolean)
          .join(" ");
        const body = (
          <>
            {label}
            <span className={markClassName} aria-hidden />
          </>
        );

        return href.startsWith("#") ? (
          <a
            key={label}
            className={classes}
            href={href}
            aria-current={isActive ? "location" : undefined}
          >
            {body}
          </a>
        ) : (
          <Link key={label} className={classes} href={href}>
            {body}
          </Link>
        );
      })}
    </nav>
  );
}
