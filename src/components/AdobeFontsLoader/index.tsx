"use client";

import { useEffect } from "react";

/**
 * Adobe Fonts(Typekit) をクライアント側で確実に読み込むローダー。
 * - ハイドレーション後に <script src="...kit.js"> を挿入
 * - onload で Typekit.load({ async: true }) を呼ぶ
 * - 二重挿入防止
 */
export default function AdobeFontsLoader() {
  useEffect(() => {
    const KIT_ID = "dxp1cls";
    const SCRIPT_ID = "adobe-fonts-kit";

    if (document.getElementById(SCRIPT_ID)) return;

    // preconnect（任意だが安定性向上）
    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://use.typekit.net";
    pre1.crossOrigin = "";
    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://p.typekit.net";
    pre2.crossOrigin = "";
    document.head.appendChild(pre1);
    document.head.appendChild(pre2);

    // kit.js を挿入
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = `https://use.typekit.net/${KIT_ID}.js`;
    s.async = true;
    s.onload = () => {
      try {
        // 型が無くても any で呼べるように
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Typekit?.load({ async: true });
      } catch {}
    };
    document.head.appendChild(s);

    return () => {};
  }, []);

  return null;
}
