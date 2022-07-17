import { useEffect, useState } from "react";

import * as chatService from "../../../Services/chatService";

import { ChatInputBar } from "./ChatInputBar/ChatInputBar";
import styles from "./ChatMain.module.scss";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatHeader } from "./ChatHeader";
import { Spinner } from "../../Common/Spinner";

export const ChatMain = ({ currentChatId }) => {
  const [chatData, setChatData] = useState(null);
  const [inputIsEnabled, setInputIsEnabled] = useState(false);
  const [userMessage, setUserMessage] = useState(null);

  // Load chat data from server
  useEffect(() => {
    setChatData(null);
    setTimeout(() => {
      chatService.getChat(currentChatId).then((chatDataResponse) => {
        setChatData(chatDataResponse);
      });
    }, 800);
  }, [currentChatId]);

  if(chatData) {
    let message = chatData.messages.find(x => Number(x.id) === Number(chatData.lastMessageId)+1); 
    
    if(message.authorIsUser) {
      if(!inputIsEnabled) {
        setInputIsEnabled(true);
        setUserMessage({...message})
      }
    } else {
      setInputIsEnabled(false);
      message = null;
    }
  }

  const onSendHandler = () => {
    // ! TODO - update chatData on server
    
    // lastMessageId++
    setChatData(state => ({
      ...state,
      lastMessageId: state.lastMessageId + 1
    }));

    // load next message
    
  }


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
              messageData={userMessage}
              inputIsEnabled={inputIsEnabled}
              onSend={onSendHandler}
            />
          </footer>
        </>
      )}
      {currentChatId && chatData === null &&<div className={styles.spinnerWrapper}><Spinner /></div>}
    </div>
  );
};