import { useEffect, useContext, useState, createRef } from "react";

import { ChatContext } from "../../../Contexts/ChatContext";
import { AuthContext } from "../../../Contexts/AuthContext";

import * as chatService from "../../../Services/chatService";

import { ChatInputBar } from "./ChatInputBar/ChatInputBar";
import styles from "./ChatMain.module.scss";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatHeader } from "./ChatHeader";
import { Spinner } from "../../Common/Spinner";
import { SpinnerTyping } from "../../Common/SpinnerTyping";

import translateActive from "./images/translate--active.svg";
import translateInactive from "./images/translate--inactive.svg";

export const ChatMain = ({ currentChatId }) => {
  const MILISECONDS_TO_TYPE_ONE_SYMBOL = 200;
  // const [chatData, setChatData] = useState(null);
  // const [inputIsEnabled, setInputIsEnabled] = useState(false);
  // const [userMessage, setUserMessage] = useState(null);
  const { profileData } = useContext(AuthContext);

  // const [chatState, setChatState] = useState({
  //   chatData: null,
  //   inputIsEnabled: false,
  //   userMessage: null,
  // });

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
    bookmarks
  } = useContext(ChatContext);

  // console.log(bookmarks);

  // Load chat data from server
  useEffect(() => {
    if (!currentChatId) {
      return;
    }

    if (!profileData.permalink) {
      return;
    }

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

        //  ! TODO - Move this to context api and load server data at login
        // chatService.getBookmarks(profileData.permalink).then((bookmarks) => {
        //   console.log('getBookmarks ->', bookmarks);
        
        
        
        // if (bookmarks && bookmarks.count > 0) {
        //   const bookmarksForCurrentChat = bookmarks.list.filter((b) => {
        //     return +b.chatId === +currentChatId;
        //   }).map(b=> +b.messageId);

        //   if (bookmarksForCurrentChat.length > 0) {
        //     const updatedMessagesList = [...chatDataResponse.messages].map(
        //       (m) => {
        //         if(bookmarksForCurrentChat.includes(m.id)) {
        //           m.isBookmarked = true;
        //         }
        //         return m;
        //       }
        //     );

        //     setChatState(state => ({
        //       ...state,
        //       chatData: ({
        //         ...chatDataResponse,
        //         messages: updatedMessagesList
        //       })
        //     }));
        //   }
        // }



        // });

        // console.log(bookmarks);

        setSelectedChatLanguage(chatDataResponse.language);

        // mark selected chat read if unread
        if (chatDataResponse && chatDataResponse.unread == true) {
          chatService
            .updateChatRead(profileData.permalink, currentChatId)
            .then((chatUnread) => {
              console.log(chatUnread);
            });
        }
      });

      setSelectedMessageData(null);
  }, [currentChatId]);

  useEffect(() => {
    // console.log("chatState.chatData > useEffect");
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
      // setSelectedMessageData(null);

    }
  }, [chatState.chatData]);

  // useState(()=>{
  //   console.log('useState -> bookmarks', bookmarks)
  //   // set/update chat bookmarks
  //   if (bookmarks && bookmarks.count > 0) {
  //     const bookmarksForCurrentChat = bookmarks.list.filter((b) => {
  //       return +b.chatId === +currentChatId;
  //     }).map(b=> +b.messageId);

  //     if (bookmarksForCurrentChat.length > 0) {
  //       const updatedMessagesList = [...chatState.chatData.messages].map(
  //         (m) => {
  //           if(bookmarksForCurrentChat.includes(m.id)) {
  //             m.isBookmarked = true;
  //           }
  //           return m;
  //         }
  //       );

  //       setChatState(state => ({
  //         ...state,
  //         chatData: ({
  //           ...state.chatData,
  //           messages: updatedMessagesList
  //         })
  //       }));
  //     }
  //   }
  // },[bookmarks]);

  // On every rerender scroll to bottom of chat unless a message has been clicked to show its translation.
  // In that case the rerender should not lead to a scrolling down to the bottom of the chat.
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
    const symbolsInMessage = lastMessageBody.length;
    const MILISECONDS_TO_TYPE_ONE_SYMBOL = 100;

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

  const nextMessage = () => {
    setBotIsTyping(false);
    // if(chatState.chatData === null) {
    //   return false;
    // }

    // setTimeout(() => {
    setChatState((state) => ({
      ...state,
      chatData: {
        ...state.chatData,
        lastMessageId: state.chatData.lastMessageId + 1,
      },
    }));
    // }, 500);

    if (refContentEnd.current) {
      refContentEnd.current.scrollIntoView();
    }
    // if (refContentEnd.current) {
    //   refContentEnd.current.scrollIntoView();
    // }
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
      {currentChatId && chatState.chatData === null && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
