import { useState } from "react";

import styles from "./Navigation.module.scss";

import menu from "../images/menu.svg";
import cross from "../images/cross.svg";

export const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const burgerOnClick = () => {
    setIsOpen(true);
  };

  const crossOnClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.navigation__toggle}>
        {!isOpen && (
          <img
            src={menu}
            className=""
            alt="open menu"
            onClick={burgerOnClick}
          />
        )}
        {isOpen && (
          <img
            src={cross}
            className=""
            alt="close menu"
            onClick={crossOnClick}
          />
        )}
      </div>
      {isOpen && <nav></nav>}
    </div>
  );
};
