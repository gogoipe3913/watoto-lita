"use client";

import React from "react";
import styles from "./style.module.scss";

const title = "TASTE";
const line1 = "KYOTO";
const line2 = "SHIMOGAMO";

export default function CategoryLabelLatched() {
  return (
    <div className={styles.CategoryLabelLatched}>
      <p className={styles.CategoryLabelLatched__title}>{title}</p>
      <p className={styles.CategoryLabelLatched__text}>
        <span className={styles.CategoryLabelLatched__textFirst}>{line1}</span>
        {line2}
      </p>
    </div>
  );
}
