import { useEffect, useState, useRef } from "react";

import sendImage from "./images/send.svg";
// import translateActive from "./images/translate--active.svg";
// import translateInactive from "./images/translate--inactive.svg";
import lightbulbActive from "./images/lightbulb--active.svg";
import lightbulbInactive from "./images/lightbulb--inactive.svg";
import plus from "./images/plus.svg";

import styles from "./ChatInputBar.module.scss";

export const ChatInputBar = ({ inputIsEnabled, messageData, onSend }) => {
  const [userInput, setUserInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const inputField = useRef();

  // const { showAllMessageTranslations, setShowAllMessageTranslations } =
  //   useContext(ChatContext);

  useEffect(() => {
    if (!messageData) {
      setUserInput("");
      setIsTouched(false);
      setIsValid(false);
      setShowHints(false);
    }
  }, [messageData]);

  useEffect(() => {
    // autoFocus the input filed when the ChatInputbar is ebabled
    if (inputIsEnabled) {
      // console.log("tuk", inputField.current);
      inputField.current.focus();
      // console.log(document.getElementById("if1"));
      // document.getElementById("if1").autofocus = true;
    }
  }, [inputIsEnabled]);

  // const translationsToggleHandler = () => {
  //   setShowAllMessageTranslations((state) => !state);
  // };

  const hintsClickHandler = () => {
    setShowHints((state) => !state);
  };

  const sendButtonClickHandler = (e) => {
    onSend(e.target.value);
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
  chatInputBarClassNames += inputIsEnabled ? " " + styles.enabled : "";
  chatInputBarClassNames += isTouched ? " " + styles.touched : "";
  chatInputBarClassNames += isValid ? " " + styles.valid : "";

  // let showAllTranslationsClassNames = styles.showAllTranslations;
  // showAllTranslationsClassNames += showAllMessageTranslations
  //   ? ""
  //   : " " + styles.inactive;

  let showHintsClassNames = styles.showHints;
  showHintsClassNames += showHints ? "" : " " + styles.inactive;
  showHintsClassNames +=
    isTouched && !isValid && userInput !== ""
      ? " " + styles.showHintsVisible
      : " " + styles.showHintsHidden;
  // console.log(isTouched, !isValid, userInput !== "", userInput)

  let hintClasses = styles.hint;
  hintClasses += showHints ? " " + styles.visible : "";

  let sendButtonClassNames = styles.sendButton;
  sendButtonClassNames +=
    !isTouched || (isTouched && !isValid)
      ? " " + styles.sendButtonDisabled
      : " " + styles.sendButtonEnabled;

  return (
    <div className={chatInputBarClassNames}>
      {/* <div
        className={showAllTranslationsClassNames}
        onClick={translationsToggleHandler}
      >
        <img
          src={showAllMessageTranslations ? translateActive : translateInactive}
          alt={
            showAllMessageTranslations
              ? "stop showing all translations"
              : "show all translations"
          }
        />
      </div> */}
      <button className={styles.inputPlus} disabled={!inputIsEnabled}>
        <img src={plus} alt="special characters, emojies and media library" />
      </button>
      {messageData && (
        <label className={styles.translation}>{messageData.translation}</label>
      )}
      <input
        id="if1"
        ref={inputField}
        autoFocus={true}
        className={styles.userInputField}
        type="text"
        onChange={userInputFieldChangeHandler}
        value={userInput}
        disabled={!inputIsEnabled}
      />

      {/* If input is VALID & Correct = show SEND button ELSE show HINTS button */}
      {/* If untouched - send button disabled */}
      <button
        className={sendButtonClassNames}
        disabled={!isTouched || (isTouched && !isValid)}
        onClick={sendButtonClickHandler}
      >
        <img src={sendImage} alt="send" />
      </button>
      <div className={showHintsClassNames} onClick={hintsClickHandler}>
        <img
          src={showHints ? lightbulbActive : lightbulbInactive}
          alt="show hints"
        />
      </div>
      {messageData && <div className={hintClasses}>{messageData.body}</div>}
    </div>
  );
};
