import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const preferredRegion = "hnd1";
export const maxDuration = 15;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      name,
      nameKana,
      email,
      tel,
      postalCode,
      address,
      headCountAdult,
      headCountChild,
      headCountBaby,
      checkInDate,
      checkOutDate,
      checkInTime,
      message,
      agreeReservationConfirmation,
      agreePrivacyPolicy,
    } = data;

    const mailTextBody = `
watoto stay Lita ホームページからの予約リクエストがありました。
-----------------
  お名前: ${name}
  お名前(かな): ${nameKana}
  メールアドレス: ${email}
  電話番号: ${tel}
  郵便番号: ${postalCode}
  住所: ${address}
  大人の人数: ${headCountAdult}
  子供の人数: ${headCountChild}
  赤ちゃんの人数: ${headCountBaby}
  チェックイン日: ${checkInDate}
  チェックアウト日: ${checkOutDate}
  チェックイン時間: ${checkInTime}
  備考欄: ${message}

  予約確認の同意: ${
    agreeReservationConfirmation ? "確認しました" : "確認していません"
  }
  宿泊約款の同意: ${agreePrivacyPolicy ? "同意しました" : "同意していません"}
-----------------

  合計金額: 自動計算を行ってないので、都度計算をお願いします。
`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    await transporter.sendMail({
      from: `"watoto stay Lita" <${process.env.EMAIL_USER!}>`,
      to: "cafe.watoto@gmail.com",
      // to: "taiki.kishiyama@gmail.com",
      subject: `新しいお問い合わせ from ${name} 様`,
      text: mailTextBody,
      replyTo: email?.replace(/[\r\n]/g, "") || undefined,
    });

    return NextResponse.json({ ok: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Mailer Error:", {
      message: err?.message,
      code: err?.code,
      command: err?.command,
      response: err?.response,
      responseCode: err?.responseCode,
      stack: err?.stack,
    });
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
