"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

// 固定ヘッダーの高さをここで一元管理
const HEADER_HEIGHT = 80; // px: プロジェクトに合わせて調整

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      // lerp と duration は併用しない想定。お好みでどちらか調整
      duration: 1.1,
      smoothWheel: true,
      gestureOrientation: "vertical",
      autoRaf: true, // raf ループを自動化
      anchors: { offset: HEADER_HEIGHT }, // #hash クリック時の被り防止
      // touch は smoothing ではなく sync（必要なら有効化）
      // syncTouch: true,
    });
    lenisRef.current = lenis;

    // OS 設定「動きを減らす」に追従
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPref = () => {
      if (!lenisRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      media.matches ? lenisRef.current.stop() : lenisRef.current.start();
    };
    media.addEventListener?.("change", applyMotionPref);
    applyMotionPref();

    // ルート遷移時の初期位置/ハッシュ処理
    const scrollAfterRouteChange = () => {
      if (!lenisRef.current) return;
      if (location.hash) {
        lenisRef.current.scrollTo(location.hash, { offset: HEADER_HEIGHT });
      } else {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    };
    scrollAfterRouteChange();

    return () => {
      media.removeEventListener?.("change", applyMotionPref);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  // URL のハッシュ変化でも反映（直打ちや履歴戻るなど）
  useEffect(() => {
    const onHashChange = () => {
      if (!lenisRef.current) return;
      if (location.hash) {
        lenisRef.current.scrollTo(location.hash, { offset: HEADER_HEIGHT });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return <>{children}</>;
}
