"use client";

import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./page.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideTimer from "../components/SlideTimer"; // ← index.tsx 構成

const Slider = dynamic(() => import("react-slick"), { ssr: false });

/** しきい値を跨いだ時だけ更新（matchMedia の change で切替） */
function useResponsiveBreakpoint(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);

    // 新API
    const modernHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    // 旧API（Safari 古い版）
    const legacyHandler = () => setIsMobile(mql.matches);

    const hasModern = typeof mql.addEventListener === "function";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasLegacy = typeof (mql as any).addListener === "function";

    if (hasModern) {
      mql.addEventListener("change", modernHandler);
    } else if (hasLegacy) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mql as any).addListener(legacyHandler);
    }

    return () => {
      if (hasModern) {
        mql.removeEventListener("change", modernHandler);
      } else if (hasLegacy) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mql as any).removeListener(legacyHandler);
      }
    };
  }, [breakpoint]);

  return isMobile;
}

type Slide = { src: string; alt: string; href: "/taste" | "/stay" };

export default function Home() {
  const isMobile = useResponsiveBreakpoint(768);

  const AUTOPLAY_MS = 6500; // slick の autoplaySpeed と合わせる

  const tasteSlides: Slide[] = [
    { src: "/top/taste-1.webp", alt: "バーの写真1", href: "/taste" },
    { src: "/top/taste-2.webp", alt: "バーの写真2", href: "/taste" },
    { src: "/top/taste-3.webp", alt: "バーの写真3", href: "/taste" },
  ];
  const staySlides: Slide[] = [
    { src: "/top/stay-1.webp", alt: "宿の写真1", href: "/stay" },
    { src: "/top/stay-2.webp", alt: "宿の写真2", href: "/stay" },
    { src: "/top/stay-3.webp", alt: "宿の写真3", href: "/stay" },
  ];

  // SP 用は TASTE/STAY を交互に
  const mobileSlides = useMemo<Slide[]>(() => {
    const max = Math.max(tasteSlides.length, staySlides.length);
    const mixed: Slide[] = [];
    for (let i = 0; i < max; i++) {
      if (tasteSlides[i]) mixed.push(tasteSlides[i]);
      if (staySlides[i]) mixed.push(staySlides[i]);
    }
    return mixed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // アクティブ制御（ピンチアウト用）
  const [tasteActive, setTasteActive] = useState(0);
  const [stayActive, setStayActive] = useState(0);
  const [singleActive, setSingleActive] = useState(0);
  const currentMobile = isMobile ? mobileSlides[singleActive] : undefined;

  const mobileTitle = currentMobile?.href === "/taste" ? "TASTE" : "STAY";
  const mobileLine1 = currentMobile?.href === "/taste" ? "KYOTO" : "FUKUI";
  const mobileLine2 =
    currentMobile?.href === "/taste" ? "SHIMOGAMO" : "OBAMA, CHUNO";

  // ★ モバイルのタイマー再スタート用（PC用は削除）
  const [singleTick, setSingleTick] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setTasteActive(0);
      setStayActive(0);
      setSingleActive(0);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const common = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnFocus: false,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: AUTOPLAY_MS,
    fade: true as const,
  };

  const pcSettings = { ...common, draggable: false, swipe: false };
  const mobileSettings = { ...common, draggable: true, swipe: true };

  return (
    <div className={styles.Top} key={isMobile ? "sp-layout" : "pc-layout"}>
      <Image
        src="/logo/watoto-hw.svg"
        alt="ロゴ"
        width={220}
        height={77}
        className={styles.Top__logo}
        priority
      />

      {/* PC */}
      {!isMobile && (
        <div className={styles.Top__columns}>
          <Link href="/taste" className={styles.Top__link}>
            <Slider
              key="pc-taste"
              {...pcSettings}
              className={styles.Top__slider}
              beforeChange={(_, next) => setTasteActive(next)}
            >
              {tasteSlides.map((s, i) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  width={720}
                  height={967}
                  className={classNames(
                    styles.Top__image,
                    tasteActive === i && styles["Top__image--active"]
                  )}
                />
              ))}
            </Slider>
            <p className={styles.Top__title}>Taste</p>
            <p className={styles.Top__textTaste}>
              京都・下鴨に佇む、
              <br />
              多様な人々のための空間で味わいのひとときを。
            </p>
          </Link>

          <Link href="/stay" className={styles.Top__link}>
            <Slider
              key="pc-stay"
              {...pcSettings}
              className={styles.Top__slider}
              beforeChange={(_, next) => setStayActive(next)}
            >
              {staySlides.map((s, i) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  width={720}
                  height={967}
                  className={classNames(
                    styles.Top__image,
                    stayActive === i && styles["Top__image--active"]
                  )}
                />
              ))}
            </Slider>
            <p className={styles.Top__title}>Stay</p>
            <p className={styles.Top__textStay}>
              福井・小浜の自然に囲まれて、
              <br />
              自分だけの風景を探すひとときを。
            </p>
          </Link>
        </div>
      )}

      {/* SP */}
      {isMobile && (
        <div className={styles.Top__single}>
          <Slider
            key="sp-single"
            {...mobileSettings}
            className={styles.Top__slider}
            beforeChange={(_, next) => {
              setSingleActive(next);
              setSingleTick((t) => t + 1);
            }}
          >
            {mobileSlides.map((s, i) => (
              <Link
                href={s.href}
                key={`${s.href}-${i}`}
                className={styles.Top__slideLink}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={720}
                  height={967}
                  className={classNames(
                    styles.Top__image,
                    singleActive === i && styles["Top__image--active"]
                  )}
                  priority={i === 0}
                />
              </Link>
            ))}
          </Slider>

          <SlideTimer
            key={`sp-${singleTick}`}
            duration={AUTOPLAY_MS}
            respectReducedMotion={false}
          />

          <div className={styles.Top__mobileInfo}>
            <p className={styles.Top__mobileTitle}>{mobileTitle}</p>
            <p className={styles.Top__mobileText}>
              <span className={styles.Top__mobileTextFirst}>{mobileLine1}</span>
              {mobileLine2}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
