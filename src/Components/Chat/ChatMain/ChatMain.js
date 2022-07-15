import { useEffect, useState } from "react";

import * as chatService from "../../../Services/chatService";

import { ChatInputBar } from "./ChatInputBar/ChatInputBar";
import styles from "./ChatMain.module.scss";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatHeader } from "./ChatHeader";
import { Spinner } from "../../Common/Spinner";

export const ChatMain = ({ currentChatId }) => {
  const [chatData, setChatData] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [inputIsEnabled, setInputIsEnabled] = useState(false);

  // Load chat data from server
  useEffect(() => {
    setChatData(null);
    setTimeout(() => {
      chatService.getChat(currentChatId).then((chatDataResponse) => {
        setChatData(chatDataResponse);
      });
    }, 800);
  }, [currentChatId]);

  const showHintsHandler = () => {
    setShowHints((state) => !state);
  };

  return (
    <div className={`${styles.chatMain} ${styles.verticalScroll}`}>
      {!currentChatId && (
        <div className={styles.noChatSelectedMessage}>
          <h2>No chat selected.</h2>
          <p>Choose a chat from the list on the left.</p>
        </div>
      )}
      {currentChatId && chatData !== null && (
        <>
          <header>
            <ChatHeader name={chatData.contactName} avatar={chatData.contactAvatar} desrciption={chatData.contactDescription} />
          </header>
          <main>
            <ChatContent chatData={chatData} />
          </main>
          <footer>
            <ChatInputBar
              showHints={showHints}
              showHintsHandler={showHintsHandler}
              inputIsEnabled={inputIsEnabled}
            />
          </footer>
        </>
      )}
      {currentChatId && chatData === null &&<div className={styles.spinnerWrapper}><Spinner /></div>}
    </div>
  );
};
