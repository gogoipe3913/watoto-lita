"use strict";

import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import MenuButtonWithModal from "@/components/MenuButtonWithModal";

export default function TasteMenu() {
  return (
    <div className={styles.TasteMenu}>
      <Image
        src="/logo/line-hw.svg"
        alt="線"
        width={340}
        height={655}
        className={styles.TasteMenu__line}
        priority
      />
      <MenuButtonWithModal />
      <ul>
        <li>
          <a href="#philosophy">Philosophy</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#gallery">Gallery</a>
        </li>
        <li>
          <a href="#access">Access</a>
        </li>
      </ul>
    </div>
  );
}
