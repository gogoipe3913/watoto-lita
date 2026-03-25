"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const pageY = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

// ★ このセクションを“重く”する倍率（1.0=通常, 2.0=2倍重い 等）
const WEIGHT = 3;

const TasteInsertImages: React.FC = () => {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastY = useRef<number>(0);
  const velSmoothed = useRef<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current!;
    const sticky = stickyRef.current!;
    const track = trackRef.current!;
    if (!wrapper || !sticky || !track) return;

    const measure = () => {
      // 横に動く最大距離(px) = トラック総幅 - 画面幅
      const totalX = Math.max(0, track.scrollWidth - window.innerWidth);

      // 実際の横移動距離（見た目の移動量）
      wrapper.style.setProperty("--trackLenX", `${totalX}px`);

      // セクション完走に必要な縦スクロール量 = 重みを乗せる
      wrapper.style.setProperty(
        "--scrollLen",
        `${Math.round(totalX * WEIGHT)}px`
      );

      // リビール距離（右パネルの押し出しに必要な縦スクロール量）
      wrapper.style.setProperty(
        "--revealLen",
        `${Math.round(window.innerWidth * 0.8)}px`
      );

      onScroll();
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current!;
        const sticky = stickyRef.current!;
        const reveal = sticky.querySelector<HTMLElement>(
          `.${styles.TasteInsertImages__reveal}`
        )!;

        const top = pageY(wrapper);
        const cs = getComputedStyle(wrapper);
        const scrollLen = Math.max(
          0,
          parseFloat(cs.getPropertyValue("--scrollLen")) || 0
        );
        const revealLen = Math.max(
          1,
          parseFloat(cs.getPropertyValue("--revealLen")) || 1
        );
        const rel = window.scrollY - top;

        // phase
        const p = scrollLen > 0 ? clamp(rel / scrollLen, 0, 1) : 0;
        sticky.style.setProperty("--p", String(p)); // p は sticky でOK

        const q = clamp((rel - scrollLen) / revealLen, 0, 1);

        // velocity
        const dy = Math.abs(window.scrollY - lastY.current);
        lastY.current = window.scrollY;
        velSmoothed.current = velSmoothed.current * 0.86 + dy * 0.14;
        const velNorm = clamp(velSmoothed.current / 60, 0, 1);

        // curve mix
        const curveMix = clamp((1 - q) * (0.25 + 0.75 * velNorm), 0, 1);
        const maxCurveX = Math.min(window.innerWidth * 0.24, 360);
        const maxCurveY = Math.min(window.innerHeight * 0.6, 680);
        const curveX = Math.round(lerp(16, maxCurveX, curveMix));
        const curveY = Math.round(lerp(24, maxCurveY, curveMix));

        // reveal に直接セット（単位付き）
        reveal.style.setProperty("--q", q.toFixed(3));
        reveal.style.setProperty("--vel", velNorm.toFixed(3));
        reveal.style.setProperty("--curveX", `${curveX}px`);
        reveal.style.setProperty("--curveY", `${curveY}px`);
      });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 画像比（同一なら共通でOK。違う画像が混ざるなら各スライドに個別で）
  const slideStyle: CSSVars = { "--ratio": 1184 / 1480 };

  return (
    <section
      ref={wrapperRef}
      className={styles.TasteInsertImages}
      aria-label="店舗の写真"
    >
      <div ref={stickyRef} className={styles.TasteInsertImages__sticky}>
        {/* 入場（右下→上端先着）フレーム */}
        <div className={styles.TasteInsertImages__frame}>
          <div ref={trackRef} className={styles.TasteInsertImages__track}>
            <div className={styles.TasteInsertImages__slide} style={slideStyle}>
              <Image
                src="/taste/philosophy/1.webp"
                alt="わとと京都の店舗写真1"
                fill
                priority
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className={styles.TasteInsertImages__img}
                sizes="100vw"
              />
            </div>
            <div className={styles.TasteInsertImages__slide} style={slideStyle}>
              <Image
                src="/taste/philosophy/2.webp"
                alt="わとと京都の店舗写真2"
                fill
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className={styles.TasteInsertImages__img}
                sizes="100vw"
              />
            </div>
            <div className={styles.TasteInsertImages__slide} style={slideStyle}>
              <Image
                src="/taste/philosophy/3.webp"
                alt="わとと京都の店舗写真3"
                fill
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className={styles.TasteInsertImages__img}
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* 右から押し出す次セクション色（丸みはスクロール速度で可変） */}
        <div className={styles.TasteInsertImages__reveal} aria-hidden />
      </div>
    </section>
  );
};

export default TasteInsertImages;
