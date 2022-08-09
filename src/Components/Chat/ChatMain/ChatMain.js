import { useEffect, useContext, useState, createRef } from "react";

import { ChatContext } from "../../../Contexts/ChatContext";
import { AuthContext } from "../../../Contexts/AuthContext";

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
  const { profileData } = useContext(AuthContext);

  const [chatState, setChatState] = useState({
    chatData: null,
    inputIsEnabled: false,
    userMessage: null,
  });

  const refContentEnd = createRef();

  const { showAllMessageTranslations, setShowAllMessageTranslations } =
    useContext(ChatContext);

  // Load chat data from server
  useEffect(() => {
    if (!currentChatId) {
      return;
    }

    if (!profileData.permalink) {
      return;
    }

    chatService
      .getChat(profileData.permalink, currentChatId)
      .then((chatDataResponse) => {
        setChatState((state) => ({
          ...state,
          inputIsEnabled: false,
          userMessage: null,
          chatData: chatDataResponse,
        }));
      });
  }, [currentChatId]);

  useEffect(() => {
    // console.log(">>>> ", chatState.chatData);

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
          if (chatState.inputIsEnabled === true) {
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

  // useEffect(() => {
  //   showBotMessage();
  // });

  const onSendHandler = () => {
    // ! TODO - update chatData on server
    nextMessage();
  };

  const showBotMessage = () => {
    // console.log(chatState.chatData.lastMessageId + 1);
    // ! TODO - timeout should be dependent on the length of the message
    const lastMessageId = chatState.chatData.lastMessageId + 1;
    const lastMessageBody = chatState.chatData.messages.find(
      (m) => m.id === lastMessageId
    ).body;
    const symbolsInMessage = lastMessageBody.length;
    const milisecondsToTypeOneSymbol = 100;
    // chatState.chatData.messages.find((x) => +x.id === chatState.chatData.lastMessageId + 1).body.length;

    // console.log("tuk:", lastMessageBody);
    // return;

    const updateResponse = chatService.updateChat(
      profileData.permalink,
      currentChatId,
      lastMessageId,
      lastMessageBody
    );
    // console.log(updateResponse);
    if (!updateResponse) {
      return;
    }

    setTimeout(nextMessage, symbolsInMessage * milisecondsToTypeOneSymbol);
  };

  const nextMessage = () => {
    // if(chatState.chatData === null) {
    //   return false;
    // }
    setChatState((state) => ({
      ...state,
      chatData: {
        ...state.chatData,
        lastMessageId: state.chatData.lastMessageId + 1,
      },
    }));
    if (refContentEnd.current) {
      refContentEnd.current.scrollIntoView();
    }
  };

  const translationsToggleHandler = () => {
    setShowAllMessageTranslations((state) => !state);
  };

  let showAllTranslationsClassNames = styles.showAllTranslations;
  showAllTranslationsClassNames += showAllMessageTranslations
    ? ""
    : " " + styles.inactive;

  return (
    <div className={`${styles.chatMain}`}>
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
          <main className={`${styles.chatContent} ${styles.verticalScroll}`}>
            <ChatContent chatData={chatState.chatData} />
            <div className={styles.contentEnd} ref={refContentEnd}></div>
          </main>
          <footer>
            <button
              className={showAllTranslationsClassNames}
              onClick={translationsToggleHandler}
            >
              <img
                src={
                  showAllMessageTranslations
                    ? translateActive
                    : translateInactive
                }
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
