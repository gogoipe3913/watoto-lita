import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import style from "./style.module.scss";
import classNames from "classnames";

type FadeInContainerProps = {
  children: ReactNode;
};

const FadeInContainer: React.FC<FadeInContainerProps> = ({ children }) => {
  /**
   * スクロールイベントのオプション
   * 「ref」検知する要素
   * 「inView」要素が見えたかどうか(見えたらtrue)
   * 「rootMargin」要素の検知の「余白」を設定
   * 「triggerOnce」検知を一度だけ行うかどうか
   */
  const { ref, inView } = useInView({
    rootMargin: "-24%",
    triggerOnce: true,
  });

  return (
    /**
     * ★スクロールさせたい要素を囲む
     * refで指定すると対象の要素になる
     * inViewのtrueかfalseを受け取り、styled-componentに渡す
     */
    <div
      ref={ref}
      className={classNames(
        style.FadeInContainer,
        inView ? style["FadeInContainer--displayed"] : ""
      )}
    >
      {children}
    </div>
  );
};

export default FadeInContainer;
