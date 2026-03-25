// hooks/useAutoReveal.ts
"use client";

import { useEffect } from "react";

type Options = {
  root?: HTMLElement | null;
  rootMargin?: string; // 例: "0px 0px -10% 0px"
  threshold?: number | number[];
  once?: boolean; // 既定: true
  attrName?: string; // 既定: "data-reveal"
  revealedClass?: string; // 既定: "is-revealed"
};

export function useAutoReveal({
  root = null,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
  once = true,
  attrName = "data-reveal",
  revealedClass = "is-revealed",
}: Options = {}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      // 古いブラウザは即座に表示
      document.querySelectorAll<HTMLElement>(`[${attrName}]`).forEach((el) => {
        el.classList.add(revealedClass);
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const repeat = el.hasAttribute(`${attrName}-repeat`);
          if (entry.isIntersecting) {
            el.classList.add(revealedClass);
            if (once && !repeat) io.unobserve(el);
          } else if (repeat) {
            el.classList.remove(revealedClass);
          }
        }
      },
      { root, rootMargin, threshold }
    );

    // 初期ノードを監視
    const connectAll = () =>
      document
        .querySelectorAll<HTMLElement>(`[${attrName}]`)
        .forEach((el) => io.observe(el));

    connectAll();

    // 動的に増えるノードも拾う（任意）
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.hasAttribute?.(attrName)) io.observe(n);
          n.querySelectorAll?.<HTMLElement>(`[${attrName}]`).forEach((el) =>
            io.observe(el)
          );
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [root, rootMargin, threshold, once, attrName, revealedClass]);
}
