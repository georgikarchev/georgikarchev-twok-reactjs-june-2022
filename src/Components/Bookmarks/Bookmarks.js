import { useContext } from "react";

import * as chatService from "../../Services/chatService";

import { ChatContext } from "../../Contexts/ChatContext";

import { ChatMessage } from "../Chat/ChatMain/ChatContent/ChatMessage";

import styles from "./Bookmarks.module.scss";
// import { ChatMessageInfo } from "../Chat/ChatMessageInfo/ChatMessageInfo";

export const Bookmarks = () => {
  const { bookmarks, setBookmarks } = useContext(ChatContext);

  const totalBookmarksCount = bookmarks ? bookmarks.count : "";

  console.log("Bookmarks: ", bookmarks);

  let lists = [];
  if (bookmarks) {
    lists = [...bookmarks.list]
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
            clickable={false}
            language={bm.language}
          />
        );
      });
  }

  return (
    <div className={styles.bookmarks}>
      <h1>{totalBookmarksCount} Bookmarks</h1>

      <div className={styles.listsWrapper}>
        {bookmarks && <div className={styles.lists}>{lists}</div>}
        {!bookmarks && <span>You have no bookmarks.</span>}
      </div>

      {/* <div className={styles.sidebar}>
            <ChatMessageInfo />
        </div> */}
    </div>
  );
};
