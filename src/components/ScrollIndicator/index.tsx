"use client";

import React from "react";
import style from "./style.module.scss";
import classNames from "classnames";

type ScrollIndicatorProps = {
  className?: string;
};

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  className = "",
}) => (
  <div className={classNames(style.ScrollIndicator, className)}>explore</div>
);

export default ScrollIndicator;
