"use client";

import React from "react";
import style from "./style.module.scss";
import classNames from "classnames";

type LinkButtonProps = {
  href: string;
  text: string;
  isBlack?: boolean;
  className?: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  text,
  isBlack = false,
  className = "",
}) => {
  return isBlack ? (
    <div className={classNames(style.LinkButton, className)}>
      <a className={style.LinkButton__button} href={href}>
        <span
          className={classNames(
            style.LinkButton__buttonText,
            style["LinkButton__buttonText--blacked"]
          )}
        >
          {text}
        </span>
        <span
          className={classNames(
            style.LinkButton__buttonCircle,
            style["LinkButton__buttonCircle--blacked"]
          )}
        >
          <span
            className={classNames(
              style.LinkButton__buttonArrow,
              style["LinkButton__buttonArrow--blacked"]
            )}
          />
        </span>
      </a>
    </div>
  ) : (
    <div className={classNames(style.LinkButton, className)}>
      <a className={style.LinkButton__button} href={href}>
        <span className={style.LinkButton__buttonText}>{text}</span>
        <span className={style.LinkButton__buttonCircle}>
          <span className={style.LinkButton__buttonArrow} />
        </span>
      </a>
    </div>
  );
};

export default LinkButton;
