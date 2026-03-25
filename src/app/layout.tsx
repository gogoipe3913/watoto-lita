// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MouseStalker from "@/components/MouseStalker";
import AdobeFontsLoader from "@/components/AdobeFontsLoader";
import RevealBoot from "@/components/RevealBoot";

import "lenis/dist/lenis.css";
import "../styles/reveal.scss";
import "./globals.css";
import "@/styles/globals.scss";
import LenisProvider from "./lenis-provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://watoto-kula.com"),

  title: "わとと | 京都・下鴨の飲食店 & 福井・小浜の宿",
  description:
    "京都・下鴨の飲食店、福井・小浜の宿を運営するわととについて紹介する公式サイト。人と人とのつながりを大切にし、食・音楽・文化・滞在を通して多様な時間を提供します。",
  keywords: [
    "わとと",
    "watoto",
    "京都",
    "下鴨",
    "カフェ",
    "バー",
    "宿",
    "小浜",
    "福井",
    "薬膳",
    "発酵食品",
    "イベント",
  ],

  // 著者・制作者・発行主体
  authors: [{ name: "taiki kishiyama" }],
  creator: "taiki kishiyama",
  publisher: "watoto",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    title: "わとと | 京都・下鴨の飲食店 & 福井・小浜の宿",
    description:
      "京都・下鴨の飲食店、福井・小浜の宿を運営するわととについて紹介する公式サイト。人と人とのつながりを大切にし、食・音楽・文化・滞在を通して多様な時間を提供します。",
    siteName: "わとと",
    locale: "ja_JP",
    images: [
      {
        url: "/og/watoto-og.jpg",
        width: 1200,
        height: 630,
        alt: "わとと（watoto）イメージ",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" data-custom-cursor="on">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LenisProvider>
          <AdobeFontsLoader />
          <RevealBoot />
          {children}
          <MouseStalker />
        </LenisProvider>
      </body>
    </html>
  );
}
