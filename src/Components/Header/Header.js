import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../Contexts/AuthContext";

// import { GlobalSettingsWidget } from "./GlobalSettingsWidget";
import { Navigation } from "./Navigation";

import styles from "./Header.module.scss";
import logo from "./images/twok-logo--icon-text.svg";

export const Header = (props) => {
  const {profileData} = useContext(AuthContext);

  const logoLink = profileData && profileData.loggedIn ? '/dashboard' : '/home';

  return (
    <header className={styles.appHeader}>
      <Link to={logoLink} title="twok">
        <img src={logo} className="twok-logo" alt="twok logo" />
      </Link>
      <div className={styles.appHeader__navWrapper}>
        {/* <GlobalSettingsWidget isAutoplayOn={false} isDark={false}  /> */}
        {(profileData && profileData.loggedIn)  && <Navigation />}
      </div>
    </header>
  );
};
