"use client";

import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import style from "./page.module.scss";
import ContactForm from "@/components/ContactForm";

export default function Reservation() {
  const [totalPrice, setTotalPrice] = useState(0);
  // const [isFormVisible, setIsFormVisible] = useState(true);
  const divRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (!divRef.current) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsFormVisible(entry.isIntersecting);
  //     },
  //     {
  //       threshold: 0.1,
  //     }
  //   );

  //   observer.observe(divRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <div className={style.Reservation}>
      <div>
        <h2 className={style.Reservation__title}>
          <p className={style.Reservation__titleJa}>空室を確認する</p>
          <p className={style.Reservation__titleEn}>Check room availability</p>
        </h2>
        <p className={style.Reservation__text}>
          はじめに、予約日程の空室をご確認ください。
        </p>
        <div className={style.Reservation__calendar}>
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            googleCalendarApiKey="AIzaSyAShrvs3a4xRMxfY8ND8AY4q-Sx5gXeSZY"
            events={{
              googleCalendarId:
                "87d7e10665681782805d414216253dc04c89c1073cc0a15ef6cf018442fe9ecc@group.calendar.google.com",
              className: `${style.Reservation__calendarEventLabel}`,
            }}
          />
        </div>
      </div>
      <div ref={divRef}>
        <h2 className={style.Reservation__title}>
          <p className={style.Reservation__titleJa}>予約フォーム</p>
          <p className={style.Reservation__titleEn}>Reservation form</p>
        </h2>
        <p className={style.Reservation__text}>
          フォームを入力し、宿泊予約を進めてください。
          <br />
          入力完了後メールにて支払いリンクを送信しますので、お支払いをお願いします。
          <br />
          料金や宿情報は、
          <a
            href="https://www.instagram.com/p/DOBYRt4jzfv/"
            className={style.Reservation__link}
          >
            こちら
          </a>
          からご確認ください。
        </p>
        <div className={style.Reservation__form}>
          <ContactForm totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
        </div>

        {/* {isFormVisible ? (
          <div className={style.Reservation__totalPrice}>
            <p className={style.Reservation__totalPriceBody}>
              合計金額：{totalPrice.toLocaleString()} 円
            </p>
          </div>
        ) : null} */}
      </div>
    </div>
  );
}
