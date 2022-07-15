import { GlobalSettingsWidget } from "./GlobalSettingsWidget";
import { Navigation } from "./Navigation";

import styles from "./Header.module.scss";

import logo from "./images/twok-logo--icon-text.svg";

export const Header = (props) => {
  return (
    <header className={styles.appHeader}>
      <a href="http://twok.app" title="twok">
        <img src={logo} className="twok-logo" alt="twok logo" />
      </a>
      <div className={styles.appHeader__navWrapper}>
        <GlobalSettingsWidget isAutoplayOn={false} isDark={false}  />
        <Navigation />
      </div>
    </header>
  );
};
