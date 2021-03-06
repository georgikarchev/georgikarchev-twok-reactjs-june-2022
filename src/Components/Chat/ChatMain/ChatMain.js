import { useEffect, useContext, useState } from "react";

import { ChatContext } from "../../../Contexts/ChatContext";

import * as chatService from "../../../Services/chatService";

import { ChatInputBar } from "./ChatInputBar/ChatInputBar";
import styles from "./ChatMain.module.scss";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatHeader } from "./ChatHeader";
import { Spinner } from "../../Common/Spinner";

import translateActive from "./images/translate--active.svg";
import translateInactive from "./images/translate--inactive.svg";

export const ChatMain = ({ currentChatId }) => {
  // const [chatData, setChatData] = useState(null);
  // const [inputIsEnabled, setInputIsEnabled] = useState(false);
  // const [userMessage, setUserMessage] = useState(null);

  const [chatState, setChatState] = useState({
    chatData: null,
    inputIsEnabled: false,
    userMessage: null,
  });

  const { showAllMessageTranslations, setShowAllMessageTranslations } =
    useContext(ChatContext);

  // if (chatState.chatData) {
  //   console.log(
  //     "ChatMain component | lastMessageId: ",
  //     chatState.chatData.lastMessageId ? chatState.chatData.lastMessageId : null
  //   );
  // } else {
  //   console.log("ChatMain component ChatData is: ", chatState.chatData);
  // }

  // Load chat data from server
  useEffect(() => {
    if (!currentChatId) {
      return;
    }
    // console.log("Load Chat Data from server. currentChatiD: ", currentChatId);
    setChatState((state) => ({
      ...state,
      chatData: null,
    }));
    setTimeout(() => {
      chatService.getChat(currentChatId).then((chatDataResponse) => {
        setChatState((state) => ({
          ...state,
          chatData: chatDataResponse,
        }));
      });
    }, 800);
  }, [currentChatId]);

  useEffect(() => {
    if (chatState.chatData) {
      let message = chatState.chatData.messages.find(
        (x) => Number(x.id) === Number(chatState.chatData.lastMessageId) + 1
        );
        if (message !== undefined) {
        if (message.authorIsUser) {
          setChatState((state) => ({
            ...state,
            inputIsEnabled: true,
            userMessage: { ...message },
          }));
        } else {
          message = null;
          if(chatState.inputIsEnabled === true) {
            setChatState((state) => ({
              ...state,
              inputIsEnabled: false,
              userMessage: null,
            }));
          }
          showBotMessage();
        }
      }
    }
  }, [chatState.chatData]);

  const onSendHandler = () => {
    // ! TODO - update chatData on server
    nextMessage();
  };

  const showBotMessage = () => {
    // ! TODO - timeout should be dependent on the length of the message
    const milisecondsToTypeOneSymbol = 30;
    const symbolsInMessage = chatState.chatData.messages.find((x) => Number(x.id) === Number(chatState.chatData.lastMessageId) + 1).body.length;
    setTimeout(nextMessage, symbolsInMessage * milisecondsToTypeOneSymbol);
  };

  const nextMessage = () => {
    setChatState((state) => ({
      ...state,
      chatData: {
        ...state.chatData,
        lastMessageId: state.chatData.lastMessageId + 1,
      },
    }));
  };

  const translationsToggleHandler = () => {
    setShowAllMessageTranslations((state) => !state);
  };

  let showAllTranslationsClassNames = styles.showAllTranslations;
  showAllTranslationsClassNames += showAllMessageTranslations
    ? ""
    : " " + styles.inactive;

  return (
    <div className={`${styles.chatMain} ${styles.verticalScroll}`}>
      {!currentChatId && (
        <div className={styles.noChatSelectedMessage}>
          <h2>No chat selected.</h2>
          <p>Choose a chat from the list on the left.</p>
        </div>
      )}
      {currentChatId && chatState.chatData !== null && (
        <>
          <header>
            <ChatHeader
              name={chatState.chatData.contactName}
              avatar={chatState.chatData.contactAvatar}
              desrciption={chatState.chatData.contactDescription}
            />
          </header>
          <main>
            <ChatContent chatData={chatState.chatData} />
          </main>
          <footer>
              <button
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
          </button>
            <ChatInputBar
              messageData={chatState.userMessage}
              inputIsEnabled={chatState.inputIsEnabled}
              onSend={onSendHandler}
            />
          </footer>
        </>
      )}
      {currentChatId && chatState.chatData === null && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
