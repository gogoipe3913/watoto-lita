"use client";

import React from "react";
import HeadingTexts from "@/components/HeadingTexts";
import contents from "@/contents/TasteAccess.ja.json";
import styles from "./style.module.scss";

const TasteAccess: React.FC = ({}) => {
  const { heading, category } = contents;
  return (
    <section id="access" data-section className={styles.TasteAccess}>
      <div className={styles.TasteAccess__heading}>
        <div className={styles.TasteAccess__stickyHeading}>
          <HeadingTexts
            textFirst={heading.first}
            textSecond={heading.second}
            textThird={heading.third}
            category={category}
          />
        </div>
      </div>

      <div className={styles.TasteAccess__contents}>
        <div data-reveal>
          <h3 className={styles.TasteAccess__subHeader}>Address</h3>
          <div className={styles.TasteAccess__description}>
            <p className={styles.TasteAccess__addressJa}>
              <span>〒606-0805</span>
              <span>京都府京都市左京区下鴨森本町9</span>
            </p>
            <p className={styles.TasteAccess__addressEn}>
              <span>9, Morimoto-cho, Shimogamo,</span>
              <span>Sakyo-ku, Kyoto</span>
              <span>606-0805, Japan</span>
            </p>
            <a href="https://maps.app.goo.gl/sde3RBHFvrs4LfdX8" target="_blank">
              <span>Google map</span>
              <span className={styles.TasteAccess__buttonArrow} />
            </a>
          </div>
        </div>

        <div data-reveal>
          <h3 className={styles.TasteAccess__subHeader}>Opening hour</h3>
          <div className={styles.TasteAccess__description}>
            <div className={styles.TasteAccess__descriptionFlex}>
              <p>11:00~15:00</p>
              <p>
                <span>お料理</span>
                <span className={styles.TasteAccess__descriptionRubi}>
                  Lunch time
                </span>
              </p>
            </div>
            <div className={styles.TasteAccess__descriptionFlex}>
              <p>15:00~23:00</p>
              <p>
                <span>珈琲とお酒</span>
                <span className={styles.TasteAccess__descriptionRubi}>
                  Coffee and Alcohol
                </span>
              </p>
            </div>
            <p className={styles.TasteAccess__descriptionTexts}>
              <span className={styles.TasteAccess__descriptionText}>
                ランチの提供は数に限りがございますので、ご予約のお客様を優先とさせていただいています。ご予約は、インスタグラムのDMまたは080-2957-4909まで。
              </span>
              <span>定休日 : 水曜, 木曜</span>
              <span className={styles.TasteAccess__descriptionRubi}>
                Closed: Wednesday & Thursday
              </span>
            </p>
            <a href="https://www.instagram.com/watoto_kyoto/" target="_blank">
              <span>Instagram</span>
              <span className={styles.TasteAccess__buttonArrow} />
            </a>
            <a href="tel:08029574909">
              <span>Tel</span>
              <span className={styles.TasteAccess__buttonArrow} />
            </a>
          </div>
        </div>
        <div data-reveal className={styles.TasteAccess__information}>
          <h3 className={styles.TasteAccess__subHeader}>Information</h3>
          <div className={styles.TasteAccess__description}>
            <div className={styles.TasteAccess__descriptionFlexInfo}>
              <p className={styles.TasteAccess__InformationBox}>
                <span>京都駅より市バス205/4系統</span>
                <span className={styles.TasteAccess__descriptionRubi}>
                  By bus from Kyoto Station
                </span>
              </p>
              <p>
                <span>約30分</span>
                <span className={styles.TasteAccess__descriptionRubi}>
                  About 30 min
                </span>
              </p>
            </div>
            <div className={styles.TasteAccess__descriptionFlexInfo}>
              <p className={styles.TasteAccess__InformationBox}>
                <span>京阪出町柳駅より徒歩</span>
                <span className={styles.TasteAccess__descriptionRubi}>
                  On foot from Demachi-yanagi Station
                </span>
              </p>
              <p>
                <span>約10分</span>
                <span className={styles.TasteAccess__descriptionRubi}>
                  About 10 min
                </span>
              </p>
            </div>
            <p className={styles.TasteAccess__descriptionTexts}>
              <span className={styles.TasteAccess__descriptionText}>
                専用駐車場はございませんので、車でお越しの際はお近くのコインパーキングをご利用ください。
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TasteAccess;
