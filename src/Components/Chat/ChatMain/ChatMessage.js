import { useContext, useState } from "react";

import { ChatContext } from "../../../Contexts/ChatContext";

// import { CSSTransition } from 'react-transition-group';
import bookmark from "../../../images/bookmark.svg";
import styles from "./ChatMessage.module.scss";

export const ChatMessage = ({
  id,
  authorIsUser,
  isBookmarked,
  datetime,
  type,
  body,
  translation,
  words,
  showAllTranslations
}) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const {selectedMessageData, setSelectedMessageData} = useContext(ChatContext);

  let messageClassNames = styles.message;
  messageClassNames += authorIsUser !== undefined && authorIsUser ? " " + styles.userMessage : " " + styles.botMessage;
  messageClassNames += isBookmarked ? " " + styles.bookmarked : "";
  messageClassNames += selectedMessageData && selectedMessageData.id === id ? " " + styles.selected : "";
  // messageClassNames += isCorrect !== undefined && isCorrect ? " " + styles.correct : " " + styles.false;
  
  let translationClassNames = styles.translation;
  if(showAllTranslations) {
    translationClassNames += " " + styles.fadeIn;
  } else {
    translationClassNames += showTranslation ? " " + styles.fadeIn : " " + styles.fadeOut;
  }
  
  
  const onClickHandler = () => {
    setShowTranslation(state => !state)
    setSelectedMessageData({id: id, body: body, translation: translation, words: words, isBookmarked: isBookmarked});
  };

  return (
    <article className={messageClassNames} onClick={onClickHandler}>
      <div className={styles.body}>{body}</div>
      {isBookmarked && <span className={styles.bookmark}><img src={bookmark} alt="bookmarked" /></span>}
      {/* {showTranslation && <span className={translationClassNames}>{translation}</span>} */}
      {/* <CSSTransition in={showTranslation} timeout={200} className="transition"> */}
        <span className={translationClassNames}>{translation}</span>
      {/* </CSSTransition> */}
    </article>
  );
};
