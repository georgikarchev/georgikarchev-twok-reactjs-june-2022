import { useContext, useState } from "react";

import { ChatContext } from "../../../../Contexts/ChatContext";

import sendImage from "./images/send.svg";
import translateActive from "./images/translate--active.svg";
import translateInactive from "./images/translate--inactive.svg";
import lightbulbActive from "./images/lightbulb--active.svg";
import lightbulbInactive from "./images/lightbulb--inactive.svg";

import styles from "./ChatInputBar.module.scss";

export const ChatInputBar = ({inputIsEnabled, messageData}) => {

    const [userInput, setUserInput] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const {showAllMessageTranslations, setShowAllMessageTranslations} = useContext(ChatContext);

    // useEffect(,[]);

    const translationsToggleHandler = () => {
        setShowAllMessageTranslations(state => !state);
    }

    const hintsClickHandler = () => {
        setShowHints(state => !state);
    };

    const sendButtonClickHandler = () => {
        console.log("send button was clicked");
    };

    const userInputFieldChangeHandler = (e) => {
        setIsTouched(true);
        setUserInput(e.target.value);
        setIsValid(e.target.value === messageData.body);
        // console.log("isvalid: ", e.target.value === messageData.body, e.target.value, messageData.body);
    };
    
    // useEffect(() => {
    //     setIsValid(userInput === messageData.body);
    //     console.log("isvalid: ", userInput === messageData.body, userInput, messageData.body);
    // },[userInput]);

    let chatInputBarClassNames = styles.chatInputBar;
    chatInputBarClassNames += inputIsEnabled? " " + styles.enabled : "";
    chatInputBarClassNames += isTouched? " " + styles.touched : "";
    chatInputBarClassNames += isValid? " " + styles.valid : "";
    
    let showAllTranslationsClassNames = styles.showAllTranslations;
    showAllTranslationsClassNames += showAllMessageTranslations? "" : " " + styles.inactive;

    let showHintsClassNames = styles.showHints;
    showHintsClassNames += showHints? "" : " " + styles.inactive;
    showHintsClassNames += isTouched && !isValid && userInput !== "" ? " " + styles.showHintsVisible : " " + styles.showHintsHidden;
    // console.log(isTouched, !isValid, userInput !== "", userInput)
    
    let hintClasses = styles.hint;
    hintClasses += showHints? " " + styles.visible : "";

    let sendButtonClassNames = styles.sendButton;
    sendButtonClassNames += !isTouched || (isTouched && !isValid)? " " + styles.sendButtonDisabled : " " + styles.sendButtonEnabled;


    return (
        <div className={chatInputBarClassNames}>
            <div className={showAllTranslationsClassNames} onClick={translationsToggleHandler}>
                <img src={showAllMessageTranslations? translateActive : translateInactive} alt={showAllMessageTranslations? "stop showing all translations" : "show all translations"} />
            </div>
            <div className={styles.inputPlus}>+</div>
            <label className={styles.translation}>{messageData.translation}</label>
            <input className={styles.userInputField} type="text" onChange={userInputFieldChangeHandler} value={userInput} />
            
            {/* If input is VALID & Correct = show SEND button ELSE show HINTS button */}
            {/* If untouched - send button disabled */}
            <button className={sendButtonClassNames} disabled={!isTouched || (isTouched && !isValid)} onClick={sendButtonClickHandler}>
                <img src={sendImage} alt="send" />
            </button>
            <div className={showHintsClassNames} onClick={hintsClickHandler}>
                <img src={showHints? lightbulbActive : lightbulbInactive} alt="show hints" />
            </div>
            <div className={hintClasses}>{messageData.body}</div>
        </div>
    );
};
