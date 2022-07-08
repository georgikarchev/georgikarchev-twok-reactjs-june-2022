import styles from "./ChatInputBar.module.scss";

import sendImage from "../../images/send.svg";
import translateActive from "../../images/translate--active.svg";
import translateInactive from "../../images/translate--inactive.svg";

export const ChatInputBar = ({translation, showAllTranslations, showAllTranslationsHandler,showHelp, showHelpHandler}) => {

    const onInputChangeHandler = (e) => {
        console.log(e.target.value);
    };

    let showAllTranslationsClassNames = styles.showAllTranslations;
    showAllTranslationsClassNames += showAllTranslations? "" : " " + styles.inactive;

    let showHelpClassNames = styles.showHelp;

    return (
        <div className={styles.chatInputBar}>
            <div className={showAllTranslationsClassNames} onClick={showAllTranslationsHandler}>
                <img src={showAllTranslations? translateActive : translateInactive} alt={showAllTranslations? "stop showing all translations" : "show all translations"} />
            </div>
            <div className={styles.inputPlus}>+</div>
            <div className={showHelpClassNames} onClick={showHelpHandler}>?</div>
            <label className={styles.translation}>{translation}Gut dick kennen zu lernen.</label>
            <input className={styles.chatInputField} type="text" onChange={onInputChangeHandler} />
            <img className={styles.sendButton} src={sendImage} alt="send" />
        </div>
    );
};
