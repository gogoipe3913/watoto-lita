"use client";

import React from "react";
import MenuModal from "../MenuModal";
import HamburgerIcon from "../HamburgerIcon";
import styles from "./style.module.scss";
import classNames from "classnames";

const MenuButtonWithModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={classNames(
          styles.MenuButtonWithModal,
          "menu-open-button",
          open ? styles["MenuButtonWithModal--opened"] : ""
        )}
      >
        <HamburgerIcon className={styles.MenuButtonWithModal__icon} />
      </button>

      <MenuModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default MenuButtonWithModal;
