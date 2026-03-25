"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./style.module.scss";

export default function MouseStalker() {
  const ref = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setVisible(true);

      const t = e.target as Element | null;
      const hit = t?.closest?.(
        'a, button, [role="button"], input, select, textarea, [data-cursor="grow"]'
      );
      setHovering(!!hit);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onVis = () => {
      if (document.visibilityState === "hidden") setVisible(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseenter", onEnter, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    // rAF: --x / --y だけ更新（transformはCSS側でcenter合わせ）
    const tick = () => {
      const el = ref.current;
      if (el) {
        const k = reduced ? 1 : 0.18; // reduce時は即追従
        pos.current.x += (target.current.x - pos.current.x) * k;
        pos.current.y += (target.current.y - pos.current.y) * k;
        el.style.setProperty("--x", `${pos.current.x}px`);
        el.style.setProperty("--y", `${pos.current.y}px`);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduced]);

  if (!mounted) return null;
  if (window.matchMedia("(pointer: coarse)").matches) return null; // タッチで非表示にしたい場合は有効化

  return createPortal(
    <div
      ref={ref}
      className={styles.MouseStalker}
      data-visible={visible}
      data-hover={hovering}
      aria-hidden
      /* デバッグ用: 常時ブラーONを確認したい時は↓を付ける
         data-force-blur="true"
      */
    />,
    document.body
  );
}
