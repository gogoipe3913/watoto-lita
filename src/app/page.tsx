import Link from "next/link";
import type { CSSProperties } from "react";
import HeroMenu from "@/components/HeroMenu";
import GlobalMenu from "@/components/GlobalMenu";
import styles from "./page.module.scss";

/**
 * トップページ（記事掲載に合わせた暫定デザイン / Figma: node 2726-734）
 * デザインカンバス 1440 x 24706 の座標をそのまま CSS 変数で渡し、
 * `--u`（= min(100vw, 1920px) / 1440）でスケールさせている。
 * 1150px 以下では position: static の1カラムへ落とす。
 */

const PHOTO = "/home/photo";
const KYOTO_URL = "https://watoto-kula.com/";

/** デザイン座標（1440基準）を CSS 変数として渡す */
const box = (x: number, y: number, w?: number, h?: number): CSSProperties =>
  ({
    "--x": `${x}`,
    "--y": `${y}`,
    ...(w !== undefined ? { "--w": `${w}` } : {}),
    ...(h !== undefined ? { "--h": `${h}` } : {}),
  }) as CSSProperties;

type PhotoProps = {
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const Photo = ({ src, alt, x, y, w, h }: PhotoProps) => (
  <figure className={styles.photo} style={box(x, y, w, h)} data-reveal>
    <img
      src={`${PHOTO}/${src}`}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      decoding="async"
    />
  </figure>
);

const HERO_MENU = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Experience", href: "#experience" },
  { label: "Information", href: "#information" },
  { label: "Reservation", href: "/reservation" },
  { label: "Access", href: "#access" },
];

const FOOTER_MENU = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Experience", href: "#experience" },
  { label: "Information", href: "#information" },
  { label: "Reservation", href: "/reservation" },
  { label: "Access", href: "#access" },
];

/** ページ内アンカーは素の <a>（lenis のアンカー処理に任せる）、ページ遷移は Link */
const MenuLink = ({ href, label }: { href: string; label: string }) =>
  href.startsWith("#") ? (
    <a href={href}>{label}</a>
  ) : (
    <Link href={href}>{label}</Link>
  );

/** 施設情報の各行（左ラベル + 右本文） */
const InfoRow = ({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
}) => (
  <div className={styles.infoRow} id={id} data-reveal>
    <p className={styles.infoRow__label}>{label}</p>
    <div className={styles.infoRow__body}>{children}</div>
  </div>
);

/** 見出し（秀英角ゴシック銀 18px）+ 本文 のかたまり */
const InfoBlock = ({ title, body }: { title: string; body: string }) => (
  <div className={styles.infoBlock}>
    <p className={styles.infoBlock__title}>{title}</p>
    <p className={styles.infoBlock__text}>{body}</p>
  </div>
);

export default function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.canvas}>
        {/* ============================= HERO ============================= */}
        <section className={styles.hero}>
          <h1 className={styles.logo} data-reveal>
            <span className={styles.logo__main}>Lita</span>
            <span className={styles.logo__sub}>watoto stay lita</span>
          </h1>

          <div className={styles.heroImage} data-reveal>
            <img
              src={`${PHOTO}/hero.webp`}
              alt="朝もやに包まれた小浜・忠野の山と田んぼ"
              width={1441}
              height={961}
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <GlobalMenu items={HERO_MENU} />

          <p
            className={`${styles.heroCopy} ${styles["heroCopy--1"]}`}
            data-reveal
          >
            <span>わたしだけの</span>
          </p>
          <p
            className={`${styles.heroCopy} ${styles["heroCopy--2"]}`}
            data-reveal
            data-reveal-delay="1"
          >
            <span>風景を</span>
          </p>
          <p
            className={`${styles.heroCopy} ${styles["heroCopy--3"]}`}
            data-reveal
            data-reveal-delay="2"
          >
            <span>見つける</span>
          </p>

          <div className={styles.heroPlace}>
            <span className={styles.heroPlace__stay}>STAY</span>
            <span className={styles.heroPlace__rule1} />
            <span className={styles.heroPlace__fukui}>FUKUI</span>
            <span className={styles.heroPlace__rule2} />
            <span className={styles.heroPlace__obama}>OBAMA, CHUNO</span>
          </div>

          <HeroMenu
            items={HERO_MENU}
            className={styles.heroMenu}
            linkClassName={styles.heroMenu__link}
            activeClassName={styles["heroMenu__link--active"]}
            markClassName={styles.heroMenu__mark}
          />
        </section>

        {/* ============================= ABOUT ============================= */}
        <section className={styles.about} id="philosophy">
          <h2 className={styles.aboutHeading} style={box(248, 0)} data-reveal>
            {"わたしだけの\n風景を\n見つける"}
          </h2>

          <p className={styles.text} style={box(844, 39)} data-reveal>
            {`福井県小浜市。

山と水に恵まれ、
古くから人の営みと祈りが続いてきたこの土地。
自然の要素に囲まれながら過ごす時間は、
都市では得られない感覚をひらいてくれます。

お水送りが行われる清らかな水と、
京都へとつながる鯖街道の記憶。
自然と文化が重なるこの場所で、
少しだけ、日常から離れてみてください。

何かを得るためではなく、
ただ、自分に戻るために。

watoto stay Lita は、
自然とともに過ごす一棟貸しの宿です。`}
          </p>

          <p
            className={`${styles.text} ${styles["text--en"]}`}
            style={box(844, 629)}
            data-reveal
          >
            {`Obama, Fukui.

A land shaped by mountains and water,
where life and quiet traditions
have continued for centuries.
Time spent surrounded by nature
opens a sense you rarely find in the city.

Pure waters, known for
the Omizutori (Water Sending Ceremony in Obama),
and the memory of
the mackerel road connecting to Kyoto.
In this place where nature and culture meet,
step gently away from the rhythm of everyday life.

Not to gain something,
but to return to yourself.

watoto stay Lita
is a private stay to experience nature, as it is.`}
          </p>
        </section>

        {/* ============================ CONCEPT ============================ */}
        <section className={styles.concept} id="experience">
          <h2 className={styles.heading} style={box(196, 0)} data-reveal>
            {"季節によって\n姿を変える景色の中で\n耳をすます"}
          </h2>

          <p className={styles.text} style={box(466, 279, 436)} data-reveal>
            清らかな水が流れ、山に囲まれた静かな環境です。自然の中で過ごす時間が、感覚をゆっくりとひらいていきます。
          </p>

          <p className={styles.text} style={box(713, 485, 436)} data-reveal>
            春には山桜が、ぽつん、ぽつんと咲いていきます。静かな自然の中で、水の流れる音に耳を澄ましながら、ゆったりと過ごす時間は、忙しく生きている現代の私たちにとって、とても豊かな時間です。
          </p>

          <Photo
            src="dsf4055.webp"
            alt="新緑の山に一本だけ咲く山桜"
            x={74}
            y={972}
            w={838}
            h={559}
          />
          <Photo
            src="dsf4013.webp"
            alt="草むらに置かれた古い木の台"
            x={720}
            y={1817}
            w={612}
            h={408}
          />

          <p className={styles.text} style={box(137, 2092, 412)} data-reveal>
            {`浅い川に足を入れる昼、ほたるが飛び交う夜。
こおろぎやすず虫の声が聞こえはじめると、田んぼが黄金色に変わっていきます。
谷風が通り、すこし早い日没は、山々を感じさせます。
八月一日の夜には、遠くから花火の音が届きます。`}
          </p>

          <Photo
            src="s31612954.webp"
            alt="山あいを流れる夏の川"
            x={150}
            y={2600}
            w={1141}
            h={761}
          />
          <Photo
            src="dsf3997.webp"
            alt="満天の星がひろがる夜の空"
            x={824}
            y={3715}
            w={529}
            h={353}
          />
          <Photo
            src="album250930-55.webp"
            alt="夕暮れに染まる空と木立のシルエット"
            x={72}
            y={3822}
            w={429}
            h={644}
          />

          <p className={styles.text} style={box(666, 4320, 412)} data-reveal>
            {`紅葉が落ちると、森がしんとします。
鳥すら鳴かなくなる、音のない世界。
眠るあいだに降る雪で、景色は白く静まりかえり、
私たちが自然の中にいることを思い出させてくれます。
そして夜には、満天の星空が驚くほどに美しく輝きます。`}
          </p>

          <Photo
            src="album241125-15.webp"
            alt="雪が舞う夜、灯りのともった古民家"
            x={586}
            y={4620}
            w={797}
            h={559}
          />
          <Photo
            src="s31612934.webp"
            alt="雪景色の窓辺に置かれたグランドピアノ"
            x={174}
            y={5119}
            w={322}
            h={483}
          />

          <p className={styles.text} style={box(883, 5715, 412)} data-reveal>
            {`雪が溶けると、山がまた動き出します。水の音が戻り、土のにおいが漂います。
春はひそやかに、でも確実にやってくるのです。`}
          </p>

          <Photo
            src="album241125-62.webp"
            alt="軒先に枝を広げるしだれ桜"
            x={152}
            y={6078}
            w={1137}
            h={758}
          />
        </section>

        <section className={styles.gallery}>
          <h2 className={styles.heading} style={box(756, 0)} data-reveal>
            {"古民家ならではの空間で\nゆっくりと過ごす"}
          </h2>

          <p className={styles.text} style={box(930, 237, 436)} data-reveal>
            {`伝統的な日本家屋を活かした一棟貸しの空間。
木のぬくもりややわらかな光、畳の香りに包まれながら、ゆっくりとくつろぐことができます。`}
          </p>

          <Photo
            src="dsf4051.webp"
            alt="緑に囲まれた古民家の外観"
            x={80}
            y={435}
            w={706}
            h={470}
          />
          <Photo
            src="dsf4230.webp"
            alt="本棚と大きなテーブルが並ぶ図書室"
            x={433}
            y={1098}
            w={932}
            h={622}
          />

          <p className={styles.text} style={box(85, 1988, 469)} data-reveal>
            {`天窓から差し込む光は、月の運行に合わせて設計されたものです。
ほとんど釘を使わず組まれた梁が、頭上に広がっています。自然素材だけで建てられた家は広々としていて、外の気配がそのまま中まで届きます。`}
          </p>

          <Photo
            src="dsf4207.webp"
            alt="天窓から光が差し込む吹き抜けの梁"
            x={720}
            y={2045}
            w={552}
            h={368}
          />
          <Photo
            src="dsf4277.webp"
            alt="庭を望む信楽焼の風呂釜"
            x={37}
            y={2453}
            w={518}
            h={346}
          />

          <p className={styles.text} style={box(966, 2936, 412)} data-reveal>
            広い縁側からは季節の景色が続き、薪風呂では信楽焼の釜がゆっくりと湯を温めます。学校の図書室から寄贈された本棚には、誰かが読んだ本が並んでいます。
          </p>

          <Photo
            src="dsf4239.webp"
            alt="図書室に並ぶ絵本"
            x={487}
            y={3229}
            w={953}
            h={635}
          />
          <Photo
            src="dsf4297.webp"
            alt="庭に向かって開かれた和室"
            x={122}
            y={4088}
            w={817}
            h={545}
          />
        </section>

        {/* ========================== EXPERIENCE ========================== */}
        <section className={styles.experience}>
          <h2 className={styles.heading} style={box(90, 0)} data-reveal>
            {"火を囲み、音を楽しみ、\n自然の中で誰かと過ごす。"}
          </h2>

          <p className={styles.text} style={box(360, 212, 436)} data-reveal>
            サウナやピザ窯、バーベキュー、楽器など、自然の中で自由に楽しめる設備をご用意しています。火を囲み、音を楽しみ、自然の中で誰かと過ごす。ここには、そんな時間があります。
          </p>

          <Photo
            src="dsf4362.webp"
            alt="夜の庭に灯りをともしたテントサウナ"
            x={694}
            y={501}
            w={632}
            h={421}
          />
          <Photo
            src="dsf4555.webp"
            alt="ピザ窯で焼き上がるマルゲリータ"
            x={74}
            y={1093}
            w={1066}
            h={711}
          />

          <p className={styles.text} style={box(943, 1985, 412)} data-reveal>
            {`ピザ窯では、焼きたてのピザを楽しめます。生地とチーズはイタリアンのシェフに仕込んでもらったものです。
窯の前で火加減を見ながら焼き上げる時間も含めて、ここならではの体験です。`}
          </p>
        </section>

        {/* ========================= INFORMATION ========================= */}
        <section className={styles.information} id="information">
          <div className={styles.info}>
            <h2 className={styles.infoTitle} data-reveal>
              施設情報
            </h2>

            <div className={styles.infoRows}>
              <InfoRow label="Overview">
                <p className={styles.infoRow__plain}>
                  {`チェックイン　16:00
チェックアウト　12:00
定員　8名（最大13名までご相談可能）
一棟貸し（1日1組限定）`}
                </p>
              </InfoRow>

              <InfoRow label="Pricing">
                <InfoBlock
                  title="基本料金 (シーズンにより変動あり)"
                  body={`平日（月〜木）・日　27,000円〜（2名まで）
金・土・祝前日　32,000円〜（2名まで）`}
                />
                <InfoBlock
                  title="追加料金 (3人目以降)"
                  body={`大人　+5,500円 / 名
子ども(3歳~小学生)　+3,500円 / 名
3歳以下 無料 (寝具なし)`}
                />
                <InfoBlock
                  title="割引"
                  body={`2泊目以降　-5,000円 / 泊
※シーズンにより変動する場合があります`}
                />
              </InfoRow>

              <InfoRow label="Rooms">
                <p className={styles.infoRow__plain}>
                  1階のキッチン、リビング、図書室、和室、バストイレを使っていただけます。2階は使用不可です。
                </p>
              </InfoRow>

              <figure className={styles.floorplan} data-reveal>
                <img
                  src={`${PHOTO}/floorplan.webp`}
                  alt="watoto stay Lita 1階の間取り図"
                  width={1786}
                  height={880}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <InfoRow label="Meals">
                <InfoBlock
                  title="朝食"
                  body="簡単な朝食をご用意しています（パン・コーヒーなど）"
                />
                <InfoBlock
                  title="夕食"
                  body={`夕食のご用意はありません
近隣の飲食店、またはケータリングをご紹介可能です`}
                />
                <InfoBlock
                  title="BBQ、ピザ窯"
                  body={`オプションとして、敷地内でのBBQとピザ窯の使用が可能です
食材の持ち込み、調理も自由に行えます`}
                />
              </InfoRow>

              <InfoRow label="Facilities">
                <InfoBlock
                  title="バス・アメニティ"
                  body={`信楽焼の風呂釜
シャンプー / コンディショナー / ボディソープ / タオル / ドライヤー`}
                />
                <InfoBlock
                  title="キッチン"
                  body="冷蔵庫 / コンロ / オーブン / 電気ケトル / 炊飯器 / 調理器具一式 / 食器類 / 基本的な調味料"
                />
                <InfoBlock
                  title="生活設備"
                  body="洗濯機 / エアコン / 暖房設備 / Wi-Fi完備"
                />
              </InfoRow>

              <InfoRow label="Experience">
                <InfoBlock
                  title="音楽室"
                  body="グランドピアノ・ドラム他 (アコースティック楽器をご持参いただけます)"
                />
                <InfoBlock
                  title="図書室"
                  body="絵本、音楽の本、仏教書、哲学、心理学、料理、酒、漫画など"
                />
                <div className={styles.infoBlock}>
                  <p className={styles.infoBlock__title}>
                    アクティビティと追加サービス
                  </p>
                  <p className={styles.infoBlock__text}>
                    {`電動自転車5台 無料
テントサウナ 5,000円 (設営、片付け、薪付き)
ピザ窯 5,000円 (道具一式、片付け、薪付き)
ピザ生地と手作りモッツァレラ 1,200円/ピザ1枚`}
                  </p>
                  <p className={styles.infoBlock__note}>
                    (生地・チーズはチーズ工房ラヴェリタのものです)
                  </p>
                  <p className={styles.infoBlock__text}>
                    BBQセット 4,000円 (片付け込み)
                  </p>
                  <p className={styles.infoBlock__note}>
                    (コンロ、新品の網、椅子、テーブル、炭5kg)
                  </p>
                </div>
              </InfoRow>

              <InfoRow label="Access / Info" id="access">
                <div className={styles.infoBlock}>
                  <p className={styles.infoBlock__title}>住所</p>
                  <p className={styles.infoBlock__text}>
                    〒917-0245
                    <br />
                    福井県小浜市忠野9-14 (
                    <a
                      className={styles.inlineLink}
                      href="https://www.google.com/maps/search/?api=1&query=%E7%A6%8F%E4%BA%95%E7%9C%8C%E5%B0%8F%E6%B5%9C%E5%B8%82%E5%BF%A0%E9%87%8E9-14"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      google map
                    </a>
                    )
                  </p>
                </div>
                <div className={styles.infoBlock}>
                  <p className={styles.infoBlock__title}>電話番号</p>
                  <p className={styles.infoBlock__text}>
                    <a className={styles.inlineLink} href="tel:09067334064">
                      090-6733-4064
                    </a>
                  </p>
                </div>
                <InfoBlock title="Wi-Fi" body="ご滞在中ご利用いただけます" />
                <InfoBlock
                  title="駐車場"
                  body="敷地内に駐車スペースあり（複数台可）"
                />
              </InfoRow>

              <InfoRow label="Reservation">
                <InfoBlock
                  title="予約方法"
                  body="当サイト予約フォームよりご予約ください。"
                />
                <InfoBlock title="支払い" body="事前決済（クレジットカード）" />
                <InfoBlock
                  title="キャンセルについて"
                  body={`以下のキャンセル料金が発生いたします。
3日前～のキャンセル 30%
前日のキャンセル 50%
当日のキャンセル 100%
当日連絡の無いキャンセルは100%`}
                />
              </InfoRow>

              <InfoRow label="Notes">
                <p className={styles.infoRow__plain}>
                  {`・施設内は禁煙です
・ペットの同伴はご遠慮ください
・花火のご利用はできません
・夜間（22:00以降）は近隣へのご配慮をお願いします
・ゴミの分別にご協力ください
・備品の破損があった場合はご申告ください
・自然に囲まれた環境のため、虫が出ることがあります`}
                </p>
              </InfoRow>
            </div>

            <Link
              href="/reservation"
              className={styles.reserveButton}
              data-reveal
            >
              予約する
            </Link>
          </div>
        </section>

        {/* =========================== WATOTO KYOTO =========================== */}
        <section className={styles.kyoto}>
          <a
            className={styles.kyoto__link}
            href={KYOTO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.kyoto__image} data-reveal>
              <img
                src={`${PHOTO}/kyoto.webp`}
                alt="京都のwatoto（わとと）の店内"
                width={1284}
                height={856}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className={styles.kyoto__heading}>わととで味わう</span>
            <span className={styles.kyoto__button}>
              <span className={styles.kyoto__buttonLabel}>Watoto Kyoto</span>
              <span className={styles.kyoto__arrow} aria-hidden />
            </span>
          </a>
        </section>

        {/* ============================= FOOTER ============================= */}
        <footer className={styles.footer}>
          <p className={styles.footerLogo}>
            <span className={styles.footerLogo__main}>Lita</span>
            <span className={styles.footerLogo__sub}>watoto stay lita</span>
          </p>

          <nav className={styles.footerMenu} aria-label="フッターメニュー">
            {FOOTER_MENU.map(({ label, href }) => (
              <MenuLink key={label} href={href} label={label} />
            ))}
          </nav>

          <a
            className={styles.footerKyoto}
            href={KYOTO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watoto Kyoto
          </a>

          <span className={styles.footerRule} aria-hidden />

          <div className={styles.footerLegal}>
            <span>Privacy policy</span>
            <Link href="/reservation/legal-notice">
              Legal Information &amp; Notice
            </Link>
          </div>

          <p className={styles.footerCopyright}>
            © 2026, watoto stay Lita all right reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
