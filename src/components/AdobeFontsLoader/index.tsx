"use client";

import { useEffect } from "react";

/**
 * Adobe Fonts(Typekit) をクライアント側で確実に読み込むローダー。
 * - ハイドレーション後に <script src="...kit.js"> を挿入
 * - onload で Typekit.load({ async: true }) を呼ぶ
 * - 二重挿入防止
 *
 * kit は CSS 配信（*.css）に対応していない dynamic kit のため、
 * 複数 kit を使う場合は kit.js を「順番に」読み込む必要がある。
 * （window.Typekit は後勝ちになるが、注入済みの @font-face は残る）
 *
 * - dxp1cls: 既存（予約フォーム等で使用: ltc-nicholas-cochin-pro / shippori-mincho-b1）
 * - cpy4umb: トップページ（cochin-lt-pro / momochidori-wide / dnp-shuei-gothic-gin-std）
 */
const KIT_IDS = ["dxp1cls", "cpy4umb"];

const loadKit = (kitId: string) =>
  new Promise<void>((resolve) => {
    const scriptId = `adobe-fonts-kit-${kitId}`;
    if (document.getElementById(scriptId)) {
      resolve();
      return;
    }

    const s = document.createElement("script");
    s.id = scriptId;
    s.src = `https://use.typekit.net/${kitId}.js`;
    s.async = true;
    const done = () => {
      try {
        // 型が無くても any で呼べるように
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Typekit?.load({ async: true });
      } catch {}
      resolve();
    };
    s.onload = done;
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });

export default function AdobeFontsLoader() {
  useEffect(() => {
    // preconnect（任意だが安定性向上）
    (["https://use.typekit.net", "https://p.typekit.net"] as const).forEach(
      (href) => {
        if (document.querySelector(`link[rel="preconnect"][href="${href}"]`))
          return;
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = href;
        link.crossOrigin = "";
        document.head.appendChild(link);
      }
    );

    let cancelled = false;
    (async () => {
      for (const kitId of KIT_IDS) {
        if (cancelled) return;
        await loadKit(kitId);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
