"use client";
import { useEffect } from "react";

type Opts = {
  root?: HTMLElement | null;
  selector?: string; // .js-parallax
  getSpeed?: (el: HTMLElement) => number; // data-speed
  maxTranslate?: number; // 画面外での振れ幅を安全に制限(px)
};

export function useParallax({
  root,
  selector = ".js-parallax",
  getSpeed = (el) => Number(el.dataset.speed ?? 0.3),
  maxTranslate = 400,
}: Opts) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const targets = Array.from(
      (root ?? document).querySelectorAll<HTMLElement>(selector)
    );

    if (!targets.length) return;

    // 画面内のみ更新したいので監視
    const active = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) active.add(e.target as HTMLElement);
          else active.delete(e.target as HTMLElement);
        }
      },
      { root: null, rootMargin: "20% 0px 20% 0px", threshold: 0 }
    );
    targets.forEach((el) => {
      el.style.willChange = "transform";
      el.style.backfaceVisibility = "hidden";
      el.style.transform = "translate3d(0,0,0)";
      io.observe(el);
    });

    let ticking = false;
    const update = () => {
      ticking = false;
      const scrollY = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;

      active.forEach((el) => {
        // 要素の中心がどれだけスクロールしたかでパララックス量を決定
        const rect = el.getBoundingClientRect();
        const elementCenterY = rect.top + scrollY + rect.height / 2;
        const distanceFromViewportCenter = elementCenterY - (scrollY + vh / 2);

        const speed = getSpeed(el); // 例: 0.2, 0.6, -0.1 など
        let translateY = -distanceFromViewportCenter * speed;

        // 安全のため上限
        if (translateY > maxTranslate) translateY = maxTranslate;
        if (translateY < -maxTranslate) translateY = -maxTranslate;

        el.style.transform = `translate3d(0, ${translateY}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // 初期1回
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      targets.forEach((el) => {
        el.style.willChange = "";
        el.style.backfaceVisibility = "";
        el.style.transform = "";
      });
    };
  }, [root, selector, getSpeed, maxTranslate]);
}
