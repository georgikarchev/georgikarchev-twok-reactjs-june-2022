// import { useEffect } from "react";
import { useContext } from "react";

import * as chatService from "../../../Services/chatService";

import { AppContext } from "../../../Contexts/AppContext";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ChatContext } from "../../../Contexts/ChatContext";

import {
  languageCodesIso2,
  languageToIso2,
} from "../../../Utils/languageCodes";
import { BookmarkToggleButton } from "../../Common/BookmarkToggleButton/BookmarkToggleButton";

import styles from "./ChatMessageInfo.module.scss";

export const ChatMessageInfo = () => {
  const {
    selectedMessageData,
    setSelectedMessageData,
    selectedChatLanguage,
    chatState,
    setChatState,
    bookmarks,
    setBookmarks,
  } = useContext(ChatContext);
  const { appSettings } = useContext(AppContext);
  const { profileData } = useContext(AuthContext);

  // useEffect(()=> {
  //   if(selectedMessageData) {
  //     console.log(selectedMessageData.isBookmarked)
  //   }
  // }, [selectedMessageData]);

  const bookmarkButtonClickedHandler = () => {
    if (selectedMessageData.isBookmarked) {
      chatService
        .deleteBookmark(
          profileData.permalink,
          chatState.chatData.id,
          selectedMessageData.id
        )
        .then((res) => {

          setBookmarks((state) => {
            const newList = [...state.list].filter(b=>{
              if(+b.chatId == +res.chatId && +b.messageId == res.messageId) {
                return false;
              } else {
                return true;
              }
            });

            return {
              ...state,
              count: newList.length,
              list: newList,
            };
          });

          setSelectedMessageData((state) => ({
            ...state,
            isBookmarked: false,
          }));
        });
      
    } else {
      chatService
        .createBookmark(
          profileData.permalink,
          chatState.chatData.id,
          selectedMessageData.id,
          selectedMessageData.body
        )
        .then((res) => {
          // console.log(res);
          setBookmarks((state) => {
            if(state === null){
              state = {
                count: 0,
                list: []
              }
            }
            const newList = [...state.list];
            newList.push({
              chatId: res.bookmark.chatId,
              messageId: res.bookmark.messageId,
              body: res.bookmark.body,
              language: res.bookmark.language,
              chatTemplate: res.bookmark.chatTemplate
            });

            return {
              ...state,
              count: newList.length,
              list: newList,
            };
          });

          setSelectedMessageData((state) => ({
            ...state,
            isBookmarked: true,
          }));

          // if (res) {
          //   setSelectedMessageData((state) => ({
          //     ...state,
          //     isBookmarked: true,
          //   }));

          //   setChatState((state) => {
          //     const messageIndex = state.chatData.messages.findIndex((el) => {
          //       // console.log('----',+el.id,+res.messageId,+el.id === +res.messageId)
          //       if (+el.id === +res.bookmark.messageId) {
          //         return true;
          //       }
          //     });

          //     const newMessagesAray = [...state.chatData.messages];
          //     newMessagesAray[messageIndex].isBookmarked = true;

          //     return {
          //       ...state,
          //       chatData: {
          //         ...state.chatData,
          //         messages: newMessagesAray,
          //       },
          //     };
          //   });
          // }
        });
    }
    // console.log(chatState.chatData.messages);
  };

  const words = !selectedMessageData
    ? ""
    : selectedMessageData.words.map((word) => {
        // console.log(word[languageCodesIso2.en].join(', '));
        const chatLanguageIso2 = languageToIso2(selectedChatLanguage);
        // ! TODO - Use appSettings.appLanguage
        return (
          <article key={`word_${word.id}`} className={styles.word}>
            <main>{word[languageCodesIso2[chatLanguageIso2]]}</main>
            <aside>{word[languageCodesIso2.en].join(", ")}</aside>
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
            {selectedMessageData && (
              <BookmarkToggleButton
                isBookmarked={selectedMessageData.isBookmarked}
                onClick={bookmarkButtonClickedHandler}
              />
            )}
            <h4 className={styles.body}>{selectedMessageData.body}</h4>
            <h5 className={styles.bodyTranslation}>
              {selectedMessageData.translation}
            </h5>
            <div className={styles.words}>{words}</div>
          </>
        )}
      </div>
    </>
  );
};
