import { useContext } from "react";

import { ThemeContext } from "../contexts/ThemeContext";
import { ChatContext } from "../contexts/ChatContext";

import styles from "./GlobalSettingsWidget.module.scss";
import moon from "../images/moon.svg";
import sun from "../images/sun.svg";
import autoplayOn from "../images/autoplayOn.svg";
import autoplayOff from "../images/autoplayOff.svg";


export const GlobalSettingsWidget = () => {

  // const isDark = useContext(ThemeContext);
  const {isDark,toggleThemeHandler} = useContext(ThemeContext);
  const {isAutoplayOn, toggleAutoPlayHandler} = useContext(ChatContext);

  return (
    <div className={styles.globalSettingsWidget}>
      {!isDark && <img src={moon} alt="turn dark mode on" onClick={()=>toggleThemeHandler(true)} />}
      {isDark && <img src={sun} alt="turn light mode on" onClick={()=>toggleThemeHandler(false)} />}
      
      {/* Only show the autoplay widget if inside a chat. */}
      {!isAutoplayOn && <img src={autoplayOn} alt="turn autoplay on" onClick={() => toggleAutoPlayHandler(true)} />}
      {isAutoplayOn && <img src={autoplayOff} alt="turn autoplay off" onClick={() => toggleAutoPlayHandler(false)} />}
    </div>
  );
};
