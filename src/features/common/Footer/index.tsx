"use client";

import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import Logo from "@/components/logo";

const Footer: React.FC = ({}) => {
  return (
    <div className={styles.Footer}>
      <div>
        <ul className={styles.Footer__menu}>
          <li>
            <a href="#TasteAbout">About</a>
          </li>
          <li>
            <a href="#concept">Concept</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#access">Access</a>
          </li>
        </ul>
        <p className={styles.Footer__infoDetail}>
          <a href="mailto:watoto.kyoto@gmail.com">
            Mail: watoto.kyoto@gmail.com
          </a>
          <span>Address: 9, Shimogamo-morimotocho, Sakyo-ku, Kyoto</span>
        </p>
        <p className={styles.Footer__externalLinks}>
          <a href="https://www.instagram.com/watoto_kyoto/">
            <Image
              width={15}
              height={15}
              src="/icons/instagram.svg"
              alt="インスタグラムアイコン"
              className={styles.Footer__instagramIcon}
            />
          </a>
        </p>
        <p className={styles.Footer__copyright}>
          © 2025 watoto. All rights reserved.
        </p>
      </div>
      <Logo isColored={true} className={styles.Footer__logo} />
    </div>
  );
};

export default Footer;
