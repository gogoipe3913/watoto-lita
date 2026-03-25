/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import contents from "@/contents/TasteServices.ja.json";
import HeadingTexts from "@/components/HeadingTexts";
import classNames from "classnames";
import { useParallax } from "@/hook/useParallax";

const renderWithBr = (text: string) =>
  text.split("\n").map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

const TasteServices: React.FC = () => {
  const {
    heading,
    category,
    lunchHeading,
    lunchBody,
    coffeeBody,
    coffeeHeading,
    cocktailBody,
    cocktailHeading,
  } = contents;

  const contentsRef = useRef<HTMLDivElement | null>(null);

  // .js-parallaxに対してdata-speedで速度指定できる
  useParallax({ root: contentsRef.current });

  return (
    <section id="services" data-section className={styles.TasteServices}>
      <div className={styles.TasteServices__heading}>
        <div className={styles.TasteServices__stickyHeading}>
          <HeadingTexts
            textFirst={heading.first}
            textSecond={heading.second}
            textThird={heading.third}
            category={category}
          />
        </div>
      </div>

      <div className={styles.TasteServices__contents} ref={contentsRef}>
        <div className={styles.TasteServices__descriptionBlock}>
          <Image
            src="/taste/services/1.webp"
            alt="わとと京都 お料理の写真1"
            width={459}
            height={689}
            // ゆっくり動く（奥）
            data-speed="0.18"
            data-reveal
            className={classNames(
              "js-parallax",
              styles.TasteServices__img,
              styles["TasteServices__img--1"]
            )}
          />
          <div
            className={classNames("js-parallax", styles.TasteServices__text)}
            // 逆方向にほんの少し（視差強調）
            data-speed="0.12"
            data-reveal
          >
            <h3 className={styles.TasteServices__subHeading}>
              {lunchHeading.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </h3>
            <div className={styles.TasteServices__description}>
              {lunchBody.map((paragraph, i) => (
                <p key={i}>{renderWithBr(paragraph)}</p>
              ))}
            </div>
          </div>
        </div>

        <Image
          src="/taste/services/2.webp"
          alt="わとと京都 お料理の写真2"
          width={377}
          height={251}
          data-speed="0.15"
          data-reveal
          className={classNames(
            "js-parallax",
            styles.TasteServices__img,
            styles["TasteServices__img--2"]
          )}
        />
        <Image
          src="/taste/services/3.webp"
          alt="わとと京都 お料理の写真3"
          width={407}
          height={610}
          data-speed="0.3"
          data-reveal
          className={classNames(
            "js-parallax",
            styles.TasteServices__img,
            styles["TasteServices__img--3"]
          )}
        />

        <div className={styles.TasteServices__descriptionBlock}>
          <div data-speed="0.2" data-reveal>
            <Image
              src="/taste/services/4.webp"
              alt="わとと京都 珈琲の写真1"
              width={492}
              height={328}
              className={classNames(
                "js-parallax",
                styles.TasteServices__img,
                styles["TasteServices__img--4"]
              )}
            />
            <Image
              src="/taste/services/5.webp"
              alt="わとと京都 珈琲の写真2"
              width={492}
              height={328}
              className={classNames(
                "js-parallax",
                styles.TasteServices__img,
                styles["TasteServices__img--5"]
              )}
            />
          </div>
          <div
            className={classNames("js-parallax", styles.TasteServices__text)}
            data-speed="0.12"
            data-reveal
          >
            <h3 className={styles.TasteServices__subHeading}>
              {coffeeHeading.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </h3>
            <div className={styles.TasteServices__description}>
              {coffeeBody.map((paragraph, i) => (
                <p key={i}>{renderWithBr(paragraph)}</p>
              ))}
            </div>
          </div>
        </div>

        <Image
          src="/taste/services/6.webp"
          alt="わとと京都 珈琲の写真3"
          width={364}
          height={243}
          data-speed="0.3"
          data-reveal
          className={classNames(
            "js-parallax",
            styles.TasteServices__img,
            styles["TasteServices__img--6"]
          )}
        />
        <Image
          src="/taste/services/7.webp"
          alt="わとと京都 珈琲の写真4"
          width={448}
          height={299}
          data-speed="0.15"
          data-reveal
          className={classNames(
            "js-parallax",
            styles.TasteServices__img,
            styles["TasteServices__img--7"]
          )}
        />

        <div className={styles.TasteServices__descriptionBlock}>
          <Image
            src="/taste/services/8.webp"
            alt="わとと京都 お酒の写真1"
            width={460}
            height={689}
            data-speed="0.2"
            data-reveal
            className={classNames(
              "js-parallax",
              styles.TasteServices__img,
              styles["TasteServices__img--8"]
            )}
          />
          <div
            className={classNames("js-parallax", styles.TasteServices__text)}
            data-speed="0.12"
            data-reveal
          >
            <h3 className={styles.TasteServices__subHeading}>
              {cocktailHeading.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </h3>
            <div className={styles.TasteServices__description}>
              {cocktailBody.map((paragraph, i) => (
                <p key={i}>{renderWithBr(paragraph)}</p>
              ))}
            </div>
          </div>
        </div>

        <Image
          src="/taste/services/9.webp"
          alt="わとと京都 お酒の写真2"
          width={358}
          height={239}
          data-speed="0.25"
          data-reveal
          className={classNames(
            "js-parallax",
            styles.TasteServices__img,
            styles["TasteServices__img--9"]
          )}
        />
        <Image
          src="/taste/services/10.webp"
          alt="わとと京都 お酒の写真3"
          width={332}
          height={498}
          data-speed="0.1"
          data-reveal
          className={classNames(
            "js-parallax",
            styles.TasteServices__img,
            styles["TasteServices__img--10"]
          )}
        />
      </div>
    </section>
  );
};

export default TasteServices;
