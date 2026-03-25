"use client";

import TasteTop from "@/features/taste/Top";
import CategoryLabel from "@/features/taste/CategoryLabel";
import TasteMenu from "@/features/taste/TasteMenu";
import TastePhilosophy from "@/features/taste/Philosophy";
import TasteInsertImages from "@/features/taste/InsertImages";
import TasteServices from "@/features/taste/Services";
import TasteGallery from "@/features/taste/Gallery";
import TasteAccess from "@/features/taste/Access";
import TasteAnotherPageLink from "@/features/taste/AnotherPageLink";
import CategoryLabelLatched from "@/features/taste/CategoryLabelLatched";
import styles from "./page.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Taste() {
  return (
    <div className={styles.Taste}>
      <div className={styles.Taste__noise}>
        <div className={styles.Taste__noiseGif} />
      </div>
      <CategoryLabel />
      <CategoryLabelLatched />
      <TasteMenu />
      <TasteTop />
      <TastePhilosophy />
      <TasteInsertImages />
      <TasteServices />
      <TasteGallery />
      <TasteAccess />
      <TasteAnotherPageLink />
    </div>
  );
}
