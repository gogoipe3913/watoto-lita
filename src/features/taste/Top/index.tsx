"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./style.module.scss";
import classNames from "classnames";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const AUTOPLAY_MS = 6500;

const TasteTop: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isTouch, setIsTouch] = useState(false);

  // 初期描画アニメ用
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [initReady, setInitReady] = useState(false);

  // セクション（200vh）とヒーロー本体（100vh）
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  // 背景色の退避＆ラッチ状態
  const origBgRef = useRef<string | null>(null);
  const latchedRef = useRef(false);

  // タッチ環境はスワイプ許可
  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(mql.matches);
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    } else {
      // Safari 旧 API
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mql as any).addListener?.(update);
      return () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mql as any).removeListener?.(update);
      };
    }
  }, []);

  const slides = [
    { src: "/taste/top-slides/1.webp", alt: "トップ画像 コーヒーの画像" },
    { src: "/taste/top-slides/2.webp", alt: "トップ画像 バーの画像" },
    { src: "/taste/top-slides/3.webp", alt: "トップ画像 野菜の画像" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true as const,
    pauseOnFocus: false,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: AUTOPLAY_MS,
    draggable: isTouch,
    swipe: isTouch,
    touchMove: isTouch,
    beforeChange: (_: number, next: number) => setActiveIndex(next),
  };

  // 初回のズーム開始
  useEffect(() => {
    const t = setTimeout(() => setActiveIndex(0), 300);
    return () => clearTimeout(t);
  }, []);

  // “擬似 sticky” + 円の半径を JS で更新 + 見た目切替のフラグ付与
  useEffect(() => {
    const section = sectionRef.current;
    const hero = stickyRef.current;
    if (!section || !hero) return;

    // 初期化
    hero.style.setProperty("--r-js", "0px");

    // 初期の body 背景を退避
    if (!origBgRef.current) {
      origBgRef.current = getComputedStyle(document.body).backgroundColor || "";
    }

    let start = 0;
    let end = 0; // start + 100vh
    let ticking = false;

    const recalc = () => {
      const rect = section.getBoundingClientRect();
      start =
        rect.top + (window.scrollY || document.documentElement.scrollTop || 0);
      end = start + window.innerHeight; // 100vh 分で演出
    };

    const computeRadius = () =>
      Math.hypot(window.innerWidth, window.innerHeight) / 2;

    const applyStickyEmulation = (y: number) => {
      if (y < start) {
        hero.style.position = "relative";
        hero.style.top = "0";
        hero.style.left = "0";
        hero.style.right = "0";
      } else if (y >= start && y < end) {
        hero.style.position = "fixed";
        hero.style.top = "0";
        hero.style.left = "0";
        hero.style.right = "0";
      } else {
        // 必要なら離脱時の absolute を有効化
        // hero.style.position = "absolute";
        // hero.style.top = `${window.innerHeight}px`;
        // hero.style.left = "0";
        // hero.style.right = "0";
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;

        // 擬似 sticky の適用
        applyStickyEmulation(y);

        // 円の半径（0..1）→ 0..対角/2
        const progress = Math.min(Math.max((y - start) / (end - start), 0), 1);
        const r = computeRadius() * progress;
        hero.style.setProperty("--r-js", `${r}px`);

        // 円が広がり切ったら（ラッチ）見た目切替
        const shouldLatch = progress >= 0.999;
        if (shouldLatch !== latchedRef.current) {
          latchedRef.current = shouldLatch;
          hero.dataset.latched = shouldLatch ? "true" : "false";

          const de = document.documentElement;
          if (shouldLatch) {
            document.body.style.backgroundColor = "#E4DFD9";
            de.setAttribute("data-hero-latched", "taste");
          } else {
            document.body.style.backgroundColor = origBgRef.current || "";
            de.removeAttribute("data-hero-latched");
          }
        }

        ticking = false;
      });
    };

    const onResize = () => {
      recalc();
      onScroll();
    };

    recalc();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      // ページ離脱時の掃除
      const de = document.documentElement;
      de.removeAttribute("data-hero-latched");
      if (origBgRef.current) {
        document.body.style.backgroundColor = origBgRef.current;
      }
    };
  }, []);

  // 初期描画アニメ：最初の画像＋フォント準備を待ってから開始
  useEffect(() => {
    let cancelled = false;
    const waitFonts = () =>
      (document.fonts?.ready as Promise<unknown>) ?? Promise.resolve();
    if (firstImageLoaded) {
      waitFonts().finally(() => {
        if (!cancelled) {
          // 次フレームで ready → CSS トランジションを確実に発火
          requestAnimationFrame(() => setInitReady(true));
        }
      });
    }
    return () => {
      cancelled = true;
    };
  }, [firstImageLoaded]);

  useEffect(() => {
    const de = document.documentElement;
    if (initReady) {
      de.setAttribute("data-taste-ready", "true");
    } else {
      de.removeAttribute("data-taste-ready");
    }
    return () => {
      de.removeAttribute("data-taste-ready");
    };
  }, [initReady]);

  return (
    <section
      ref={sectionRef}
      className={styles.TasteTop}
      data-ready={initReady ? "true" : "false"}
    >
      <div ref={stickyRef} className={styles.TasteTop__sticky}>
        <Slider {...settings} className={styles.TasteTop__slider}>
          {slides.map((s, i) => (
            <div
              key={s.src}
              className={classNames(
                styles.TasteTop__slide,
                activeIndex === i && styles["TasteTop__slide--active"]
              )}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                onLoadingComplete={() => {
                  if (i === 0) setFirstImageLoaded(true);
                }}
                className={classNames(
                  styles.TasteTop__image,
                  activeIndex === i && styles["TasteTop__image--active"]
                )}
              />
            </div>
          ))}
        </Slider>

        <div className={styles.TasteTop__reveal} aria-hidden />

        <Image
          src="/logo/watoto-taste-logo.svg"
          alt="わとと京都 ロゴ"
          width={68}
          height={175}
          className={styles.TasteTop__logo}
          priority
        />

        <div className={styles.TasteTop__text}>
          <p className={styles.TasteTop__textEn}>
            Savor cocktails in a sanctuary for all,
            <br />
            nestled in the heart of Shimogamo, Kyoto
            <br className={styles.TasteTop__spBr} />
            —where time flows gently,
            <br className={styles.TasteTop__pcBr} />
            and stories intertwine.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TasteTop;
