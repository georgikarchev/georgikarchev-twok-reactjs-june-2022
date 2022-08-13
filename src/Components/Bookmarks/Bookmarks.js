import { useContext, useEffect, useState } from "react";

import * as chatService from "../../Services/chatService";

import { ChatContext } from "../../Contexts/ChatContext";
import { AuthContext } from "../../Contexts/AuthContext";

import { ChatMessage } from "../Chat/ChatMain/ChatContent/ChatMessage";

import styles from "./Bookmarks.module.scss";
// import { ChatMessageInfo } from "../Chat/ChatMessageInfo/ChatMessageInfo";

export const Bookmarks = () => {
  const { profileData } = useContext(AuthContext);
  const { bookmarks, setBookmarks } = useContext(ChatContext);
  const [isPromptOn, setIsPromptOn] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [list, setList] = useState([]);

  const totalBookmarksCount = bookmarks ? bookmarks.count : "";

  // console.log("Bookmarks: ", bookmarks);

  const bookmarkOnClickhandler = (data) => {
    setSelectedBookmark(data);
    setIsPromptOn(true);
  }

  const onClickDeleteBookmark = () => {


    if (profileData && profileData.permalink && selectedBookmark && selectedBookmark.chatId && selectedBookmark.messageId) {
      // console.log("Delete Bookmark", profileData.permalink, selectedBookmark);
      chatService.deleteBookmark(profileData.permalink, selectedBookmark.chatId, selectedBookmark.messageId)
        .then(res=>{
          // check if success response
          if (res) {
            setBookmarks(state => {
              let newBookmarks = state && state.list ? [...state.list] : [];
              // if(state && state.list) {
              //   newBookmarks = [...state.list] 
              // }
              newBookmarks = newBookmarks.filter(b => !(+b.chatId === +selectedBookmark.chatId && +b.messageId === +selectedBookmark.messageId));
              return ({
                list: newBookmarks,
                count: state.count - 1
              });
            });
            setIsPromptOn(false);
          }
        })
        .catch(err=>console.error(err));
    }
    else {
      console.error("No bookmark is selected for deletion.");
    }
  }

  const onClickCloseModal = () => {
    setIsPromptOn(false);
  };

  useEffect(()=>{
    if (bookmarks && bookmarks.list) {
      let newList = [...bookmarks.list]
        .sort((a, b) => {
          if (a.language === b.language) {
            return a.body.localeCompare(b.body);
          } else {
            return a.language.localeCompare(b.language);
          }
        })
        .map((bm) => {
          // console.log(bm);
          const messageFromTemplate = chatService.getMessageFromChatTemplate(
            bm.messageId,
            bm.chatTemplate
          );

          // console.log(messageFromTemplate);
          return (
            <ChatMessage
              key={"message_" + +bm.chatId + "_" + +bm.messageId}
              {...messageFromTemplate}
              authorIsUser={false}
              isBookmarked={true}
              showAllTranslations={true}
              clickable={true}
              onClick={() => bookmarkOnClickhandler({ chatId: bm.chatId, messageId: bm.messageId })}
              language={bm.language}
            />
          );
        });

        setList(newList);
    }
  }, [bookmarks]);
  

  const prompt = (
    <div className={styles.modal} onClick={onClickCloseModal}>
      <div className={styles.prompt}>
        <h4>Do you want to delete this bookmark?</h4>
        <div className={styles.buttonsWrapper}>
          <button className={styles.danger} onClick={onClickDeleteBookmark} >Yes</button>
          <button onClick={onClickCloseModal}>No</button>
        </div>
      </div>

    </div>
  );

  return (
    <div className={styles.bookmarks}>
      <h1>{totalBookmarksCount} Bookmarks</h1>

      <div className={styles.listsWrapper}>
        {bookmarks && <div className={styles.lists}>{list}</div>}
        {!bookmarks && <span>You have no bookmarks.</span>}
      </div>

      {isPromptOn && prompt}

      {/* <div className={styles.sidebar}>
            <ChatMessageInfo />
        </div> */}
    </div>
  );
};
