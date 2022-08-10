import { useEffect } from "react";
import { useContext } from "react";

import { AppContext } from "../../../Contexts/AppContext";
import { ChatContext } from "../../../Contexts/ChatContext";
import { languageCodesIso2, languageToIso2 } from "../../../Utils/languageCodes";


import styles from "./ChatMessageInfo.module.scss";

export const ChatMessageInfo = () => {
  const { selectedMessageData, selectedChatLanguage } = useContext(ChatContext);
  const { appSettings } = useContext(AppContext);

  const words = !selectedMessageData? '' : selectedMessageData.words.map((word) => {
    // console.log(word[languageCodesIso2.en].join(', '));
    const chatLanguageIso2 = languageToIso2(selectedChatLanguage);
    // ! TODO - Use appSettings.appLanguage
    return (
        <article key={`word_${word.id}`} className={styles.word}>
            <main>{word[languageCodesIso2[chatLanguageIso2]]}</main>
            <aside>{word[languageCodesIso2.en].join(', ')}</aside>
        </article>
    );
  });

  return (
    <>
      <div className={styles.chatMessageInfo}>
        {!selectedMessageData && (
          <div className={styles.noMessageSelected}>
            <h2>No message is selected.</h2>
            <p>Choose a message from the chat on the left.</p>
          </div>
        )}
        {selectedMessageData && (
          <>
            <h4 className={styles.body}>{selectedMessageData.body}</h4>
            <h5 className={styles.bodyTranslation}>{selectedMessageData.translation}</h5>
            <div className={styles.words}>{words}</div>
          </>
        )}
      </div>
    </>
  );
};
