"use client";

import Link from "next/link";
import styles from "./page.module.scss";

export default function Stay() {
  return (
    <div className={styles.Stay}>
      <div>
        <div className={styles.Stay__texts}>
          <br />
          <p>Watoto Stay Litaのウェブサイトは、現在準備中です。</p>
          <p>
            宿の情報については、
            <a
              href="https://www.instagram.com/watoto_stay_lita/"
              className={styles.Stay__igLink}
            >
              Instagram
            </a>
            をご覧ください。
          </p>
          <br />
          <p>ご予約は、下記フォームからお申し込みください。</p>
        </div>
        <Link href="/reservation" className={styles.Stay__reservationLink}>
          <span>予約フォーム</span>
          <span className={styles.Stay__linkArrow} />
        </Link>
        <Link
          href="/reservation/legal-notice"
          className={styles.Stay__legalNoticeLink}
        >
          <span>特定商取引法に基づく表記</span>
        </Link>
      </div>
    </div>
  );
}
