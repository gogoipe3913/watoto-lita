"use client";

import React from "react";
import styles from "./style.module.scss";

type Props = {
  /** slick の autoplaySpeed と同じ値（ms） */
  duration: number;
  /** 直径(px) — 既定: 20 */
  size?: number;
  /** 線の太さ(px) — 既定: 1 */
  stroke?: number;
  /** 背景に合わせてトラック色を微調整 */
  theme?: "light" | "dark";
  /** reduce-motion を尊重するか（既定: true）*/
  respectReducedMotion?: boolean;
  /** 進捗リングの色（既定: 白） */
  color?: string;
  /** a11y ラベル */
  label?: string;
};

export default function SlideTimer({
  duration,
  size = 20,
  stroke = 1,
  theme = "light",
  respectReducedMotion = true,
  color = "var(--color-white)",
  label = "Next image countdown",
}: Props) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  // レイアウト用（サイズ/時間）は CSS 変数で渡す
  const wrapperStyle = {
    ["--timer-size"]: `${size}px`,
    ["--duration"]: `${duration}ms`,
  } as React.CSSProperties;

  // Safari 安定のため dash はインラインで数値指定
  const progressCircleStyle: React.CSSProperties = {
    stroke: color, // ★ 白で進む
    strokeDasharray: `${circumference}px`,
    strokeDashoffset: `${circumference}px`,
  };

  return (
    <div
      className={styles.Timer}
      data-theme={theme}
      data-respect-reduced={respectReducedMotion ? "true" : "false"}
      role="timer"
      aria-label={label}
      aria-live="off"
      style={wrapperStyle}
    >
      <svg
        className={styles.Timer__svg}
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      >
        <circle
          className={styles.Timer__track}
          r={r}
          cx={0}
          cy={0}
          strokeWidth={stroke}
        />
        <circle
          className={styles.Timer__progress}
          r={r}
          cx={0}
          cy={0}
          strokeWidth={stroke}
          style={progressCircleStyle}
        />
      </svg>
    </div>
  );
}
