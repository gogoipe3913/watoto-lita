"use client";

import React from "react";
import classNames from "classnames";
import style from "./style.module.scss";
import Logo from "../logo";

type HeaderProps = {
  isColored?: boolean;
  className?: string;
  onClick?(): void;
};

const Header: React.FC<HeaderProps> = ({
  isColored = false,
  className = "",
  onClick = () => {},
}) => (
  <div className={classNames(style.Header, className)}>
    <Logo
      isColored={isColored}
      className={classNames(
        style.Header__logo,
        isColored ? style["Header__logo--resized"] : ""
      )}
    />
    <ul
      className={classNames(
        style.Header__menu,
        isColored ? style["Header__menu--colored"] : ""
      )}
    >
      <li>
        <a href="#TasteAbout">About</a>
      </li>
      <li>
        <a href="#concept">Concept</a>
      </li>
      <li>
        <a href="#gallery">Gallery</a>
      </li>
      <li>
        <a href="#access">Access</a>
      </li>
      <li>
        <button className={style.Header__hamburger} onClick={onClick}>
          <span className={style.Header__hamburgerLine}></span>
          <span className={style.Header__hamburgerLine}></span>
        </button>
      </li>
    </ul>
  </div>
);

export default Header;
