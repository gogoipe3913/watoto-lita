"use client";

import React from "react";
import styles from "./style.module.scss";
import HeadingTexts from "@/components/HeadingTexts";
import contents from "@/contents/TastePhilosophy.ja.json";

const renderWithBr = (text: string, isCategory?: boolean) =>
  text.split("\n").map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 ? (
        <>
          {isCategory ? (
            <span
              className={styles.TastePhilosophy__categoryBr}
              aria-hidden="true"
            />
          ) : (
            <br />
          )}
        </>
      ) : null}
    </React.Fragment>
  ));

const TastePhilosophy: React.FC = () => {
  const { heading, category, body, bodySp } = contents;

  return (
    <section id="philosophy" data-section className={styles.TastePhilosophy}>
      <div className={styles.TastePhilosophy__left}>
        <div className={styles.TastePhilosophy__sticky}>
          <HeadingTexts
            textFirst={heading.first}
            textSecond={heading.second}
            textThird={heading.third}
            category={category}
            className={styles.TastePhilosophy__heading}
          />
        </div>
      </div>

      <div className={styles.TastePhilosophy__right}>
        <div className={styles.TastePhilosophy__bodyWrapper}>
          {body.map((p, i) => (
            <p data-reveal key={i} className={styles.TastePhilosophy__body}>
              {renderWithBr(p)}
            </p>
          ))}
        </div>
        <div className={styles.TastePhilosophy__bodyWrapperSp}>
          {bodySp.map((p, i) => (
            <p data-reveal key={i} className={styles.TastePhilosophy__body}>
              {renderWithBr(p)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TastePhilosophy;
