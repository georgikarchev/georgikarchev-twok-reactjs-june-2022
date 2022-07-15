import { useContext } from "react";

import { ChatContext } from "../../../Contexts/ChatContext";

import sendImage from "../../../images/send.svg";
import translateActive from "../../../images/translate--active.svg";
import translateInactive from "../../../images/translate--inactive.svg";
import lightbulbActive from "../../../images/lightbulb--active.svg";
import lightbulbInactive from "../../../images/lightbulb--inactive.svg";

import styles from "./ChatInputBar.module.scss";

export const ChatInputBar = ({translation, showHints, showHintsHandler, inputIsEnabled}) => {

    const {showAllMessageTranslations, setShowAllMessageTranslations} = useContext(ChatContext);

    const onInputChangeHandler = (e) => {
        console.log(e.target.value);
    };

    const translationsToggleHandler = () => {
        setShowAllMessageTranslations(state => !state);
    }

    let chatInputBarClassNames = styles.chatInputBar;
    chatInputBarClassNames += inputIsEnabled? " " + styles.enabled : "";
    
    let showAllTranslationsClassNames = styles.showAllTranslations;
    showAllTranslationsClassNames += showAllMessageTranslations? "" : " " + styles.inactive;

    let showHintsClassNames = styles.showHints;
    showHintsClassNames += showHints? "" : " " + styles.inactive;

    return (
        <div className={chatInputBarClassNames}>
            <div className={showAllTranslationsClassNames} onClick={translationsToggleHandler}>
                <img src={showAllMessageTranslations? translateActive : translateInactive} alt={showAllMessageTranslations? "stop showing all translations" : "show all translations"} />
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
