import styles from "./ChatInputBar.module.scss";

import sendImage from "../../../images/send.svg";
import translateActive from "../../../images/translate--active.svg";
import translateInactive from "../../../images/translate--inactive.svg";
import lightbulbActive from "../../../images/lightbulb--active.svg";
import lightbulbInactive from "../../../images/lightbulb--inactive.svg";

export const ChatInputBar = ({translation, showAllTranslations, showAllTranslationsHandler,showHints, showHintsHandler}) => {

    const onInputChangeHandler = (e) => {
        console.log(e.target.value);
    };

    let showAllTranslationsClassNames = styles.showAllTranslations;
    showAllTranslationsClassNames += showAllTranslations? "" : " " + styles.inactive;

    let showHintsClassNames = styles.showHints;
    showHintsClassNames += showHints? "" : " " + styles.inactive;

    return (
        <div className={styles.chatInputBar}>
            <div className={showAllTranslationsClassNames} onClick={showAllTranslationsHandler}>
                <img src={showAllTranslations? translateActive : translateInactive} alt={showAllTranslations? "stop showing all translations" : "show all translations"} />
            </div>
            <div className={styles.inputPlus}>+</div>
            <label className={styles.translation}>{translation}Gut dick kennen zu lernen.</label>
            <input className={styles.chatInputField} type="text" onChange={onInputChangeHandler} />
            
            {/* If input is VALID & Correct = show SEND button ELSE show HINTS button */}
            <img className={styles.sendButton} src={sendImage} alt="send" />
            <div className={showHintsClassNames} onClick={showHintsHandler}>
                <img src={showHints? lightbulbActive : lightbulbInactive} alt="show hints" />
            </div>
        </div>
    );
};
