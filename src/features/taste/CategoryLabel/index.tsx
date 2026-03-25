"use client";

import React from "react";
import styles from "./style.module.scss";

const title = "TASTE";
const line1 = "KYOTO";
const line2 = "SHIMOGAMO";

export default function CategoryLabel() {
  return (
    <div className={styles.CategoryLabel}>
      <p className={styles.CategoryLabel__title}>{title}</p>
      <p className={styles.CategoryLabel__text}>
        <span className={styles.CategoryLabel__textFirst}>{line1}</span>
        {line2}
      </p>
    </div>
  );
}
