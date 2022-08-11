import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../Contexts/AuthContext";

import menu from "./images/menu.svg";
import cross from "./images/cross.svg";
import user from "./images/user.svg";
import userAnonymous from "./images/user-anonymous.svg";

import styles from "./Navigation.module.scss";

export const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {profileData,logInTestHandler} = useContext(AuthContext);

  const burgerOnClick = () => {
    setIsOpen(true);
  };

  const crossOnClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.navigation}>
      {profileData.loggedIn && <img src={user} alt="profile" onClick={logInTestHandler} />}
      {!profileData.loggedIn && <img src={userAnonymous} alt="log in" onClick={logInTestHandler} />}
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
      {isOpen &&
        <nav className={styles.menu}>
          <Link to="/" title="dashboard" onClick={crossOnClick}>dashboard</Link>
          <Link to="/chat" title="chat" onClick={crossOnClick}>chat</Link>
          <Link to="/bookmarks" title="bookmarks" onClick={crossOnClick}>bookmarks</Link>
        </nav>
      }
    </div>
  );
};
