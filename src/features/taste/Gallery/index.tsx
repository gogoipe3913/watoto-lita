"use client";

import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import contents from "@/contents/TasteGallery.ja.json";
import HeadingTexts from "@/components/HeadingTexts";

const photos = [
  {
    src: "/taste/gallery/1.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 672,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/2.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 403,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/3.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 586,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/4.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 405,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/5.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 338,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/6.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 403,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/7.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 405,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/8.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 335,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/9.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 740,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/10.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 812,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/11.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 405,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
  {
    src: "/taste/gallery/12.webp",
    alt: "ギャラリーの画像1",
    width: 270,
    height: 405,
    href: "https://www.instagram.com/watoto_kyoto/",
  },
];

const TasteGallery: React.FC = ({}) => {
  const { heading, category } = contents;
  return (
    <section id="gallery" data-section className={styles.TasteGallery}>
      <div className={styles.TasteGallery__heading}>
        <div className={styles.TasteGallery__stickyHeading}>
          <HeadingTexts
            textFirst={heading.first}
            textSecond={heading.second}
            textThird={heading.third}
            category={category}
          />
        </div>
      </div>
      <ul className={styles.TasteGallery__images}>
        {photos.map((photo, index) => (
          <li key={index}>
            <a href={photo.href} target="_blank">
              <Image
                width={photo.width}
                height={photo.height}
                src={photo.src}
                alt={photo.alt}
                data-reveal
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TasteGallery;
