import { Link } from "react-router-dom";


// import { GlobalSettingsWidget } from "./GlobalSettingsWidget";
import { Navigation } from "./Navigation";

import styles from "./Header.module.scss";
import logo from "./images/twok-logo--icon-text.svg";

export const Header = (props) => {
  return (
    <header className={styles.appHeader}>
      <Link to="/dashboard" title="twok">
        <img src={logo} className="twok-logo" alt="twok logo" />
      </Link>
      <div className={styles.appHeader__navWrapper}>
        {/* <GlobalSettingsWidget isAutoplayOn={false} isDark={false}  /> */}
        <Navigation />
      </div>
    </header>
  );
};
