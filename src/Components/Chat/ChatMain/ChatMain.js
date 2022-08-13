import { useEffect, useContext, useState, createRef } from "react";

import { ChatContext } from "../../../Contexts/ChatContext";
import { AuthContext } from "../../../Contexts/AuthContext";

import * as chatService from "../../../Services/chatService";
import * as languageService from "../../../Services/languageService";

import { languageToIso2 } from "../../../Utils/languageCodes";

import { ChatInputBar } from "./ChatInputBar/ChatInputBar";
import styles from "./ChatMain.module.scss";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatHeader } from "./ChatHeader";
import { Spinner } from "../../Common/Spinner";
import { SpinnerTyping } from "../../Common/SpinnerTyping";

import translateActive from "./images/translate--active.svg";
import translateInactive from "./images/translate--inactive.svg";

export const ChatMain = ({ currentChatId }) => {
  const MILISECONDS_TO_TYPE_ONE_SYMBOL = 100;
  const { profileData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const refContentEnd = createRef();
  const {
    showAllMessageTranslations,
    setShowAllMessageTranslations,
    selectedMessageData,
    setSelectedMessageData,
    setSelectedChatLanguage,
    botIsTyping,
    setBotIsTyping,
    chatState,
    setChatState,
    // bookmarks
  } = useContext(ChatContext);

  // Load chat data from server
  useEffect(() => {
    if (!currentChatId) {
      return;
    }

    if (!profileData.permalink) {
      return;
    }

    setIsLoading(true);

    // get chat data
    chatService
      .getChat(profileData.permalink, currentChatId)
      .then((chatDataResponse) => {
        setChatState((state) => ({
          ...state,
          inputIsEnabled: false,
          userMessage: null,
          chatData: chatDataResponse,
        }));
        setIsLoading(false);

        setSelectedChatLanguage(chatDataResponse.language);

        //  *** moved to Chat.js
        // mark selected chat read if unread
        // if (chatDataResponse && chatDataResponse.unread == true) {
        //   chatService
        //     .updateChatRead(profileData.permalink, currentChatId)
        //     .then((chatUnread) => {
        //       console.log(chatUnread);
              
        //     });
        // }
      });

    setSelectedMessageData(null);
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
          if (chatState.inputIsEnabled === true) {
            setChatState((state) => ({
              ...state,
              inputIsEnabled: false,
              userMessage: null,
            }));
          }

          if (message.type === "chatNotification") {
            showChatNotification();
          } else {
            message = null;
            showBotMessage();
          }
        }
      }
      // setSelectedMessageData(null);
    }
  }, [chatState.chatData]);

  useEffect(() => {
    if (
      refContentEnd.current &&
      selectedMessageData === null &&
      showAllMessageTranslations === false
    ) {
      refContentEnd.current.scrollIntoView();
    }
  }, [chatState.chatData]);

  const onSendHandler = () => {
    const lastMessageId = chatState.chatData.lastMessageId + 1;
    const lastMessageBody = chatState.chatData.messages.find(
      (m) => m.id === lastMessageId
    ).body;

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

    nextMessage();
  };

  const showBotMessage = () => {
    setBotIsTyping(true);

    const lastMessageId = chatState.chatData.lastMessageId + 1;
    const lastMessageObj = chatState.chatData.messages.find(
      (m) => m.id === lastMessageId
    );
    const lastMessageBody = lastMessageObj.body;
    const symbolsInMessage = lastMessageBody.length;

    if (lastMessageObj.type !== "chatNotification") {
      const updateResponse = chatService.updateChat(
        profileData.permalink,
        currentChatId,
        lastMessageId,
        lastMessageBody
      );

      if (!updateResponse) {
        return;
      }
    }

    setTimeout(nextMessage, symbolsInMessage * MILISECONDS_TO_TYPE_ONE_SYMBOL);
  };

  const showChatNotification = () => {
    console.log(chatState.chatData.language);

    const newLastMessageId = chatState.chatData.lastMessageId + 1;
    const thisMessageObj = chatState.chatData.messages.find(
      (m) => m.id === newLastMessageId
    );
    const prevMessageObj = chatState.chatData.messages.find(
      (m) => m.id === chatState.chatData.lastMessageId
    );

    chatService
      .updateChat(
        profileData.permalink,
        currentChatId,
        newLastMessageId,
        prevMessageObj.body
      )
      .then((res) => {
        console.log(res);
      });

    if (
      thisMessageObj.achievement &&
      thisMessageObj.achievement.length > 0 &&
      chatState.chatData.language
    ) {
      // save achievement to the DB
      languageService
        .createAchievement(
          profileData.permalink,
          languageToIso2(chatState.chatData.language),
          thisMessageObj.achievement
        )
        .then((res) => {
          console.log(
            "Achievement successfully saved to the DB:",
            chatState.chatData.language,
            thisMessageObj.achievement
          );
        });
    }

    if (
      thisMessageObj.newWordsLearned &&
      thisMessageObj.newWordsLearned > 0 &&
      chatState.chatData.language
    ) {
      // save achievement to the DB
      languageService
        .updateWordsLearnedCount(
          profileData.permalink,
          languageToIso2(chatState.chatData.language),
          +thisMessageObj.newWordsLearned
        )
        .then((res) => {
          console.log(
            "New words learned updated for " +
              chatState.chatData.language +
              " : ",
            thisMessageObj.newWordsLearned
          );
        });
    }

    if (thisMessageObj.newWords && +thisMessageObj.newWords > 0) {
      // save newWords learned count to the DB
    }

    nextMessage();
  };

  const nextMessage = () => {
    setBotIsTyping(false);

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
      {currentChatId && chatState.chatData !== null && !isLoading && (
        <>
          <header>
            <ChatHeader
              name={chatState.chatData.contactName}
              avatar={chatState.chatData.contactAvatar}
              desrciption={chatState.chatData.contactDescription}
              language={chatState.chatData.language}
            />
          </header>
          <main className={`${styles.chatContent} ${styles.verticalScroll}`}>
            <ChatContent chatData={chatState.chatData} />
            {botIsTyping && <SpinnerTyping />}
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
      {((currentChatId && chatState.chatData === null) || isLoading) && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
