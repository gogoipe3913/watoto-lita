"use client";

import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import HeadingTexts from "@/components/HeadingTexts";

const TasteAnotherPageLink: React.FC = ({}) => {
  return (
    <div className={styles.TasteAnotherPageLink}>
      <HeadingTexts
        textFirst="わととに"
        textSecond="泊まる"
        category="link to stay"
        className={styles.TasteAnotherPageLink__title}
      />
      <Link
        href="https://www.instagram.com/watoto_stay_lita/"
        className={styles.TasteAnotherPageLink__body}
      >
        <Image
          width={1010}
          height={673}
          src="/taste/anotherPageLink/1.webp"
          alt="stayページの画像"
          data-reveal
        />
        <p data-reveal className={styles.TasteAnotherPageLink__text}>
          わととに泊まる。
        </p>
        <p data-reveal className={styles.TasteAnotherPageLink__imitationButton}>
          <span className={styles.TasteAnotherPageLink__buttonText}>
            watoto stay lita
          </span>
          <span className={styles.TasteAnotherPageLink__buttonArrow} />
        </p>
      </Link>
      <p className={styles.TasteAnotherPageLink__copyright}>
        ©︎ 2025 watoto all rights reserved.
      </p>
    </div>
  );
};

export default TasteAnotherPageLink;
