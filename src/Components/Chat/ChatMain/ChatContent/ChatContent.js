import { useContext } from "react";

import { stringToDdMonthYyyy } from "../../../../Utils/dateUtils";

import { ChatContext } from "../../../../Contexts/ChatContext";

// import { Spinner } from "../../../Common/Spinner";
import { ChatMessage } from "./ChatMessage";
import { ChatNotification } from "./ChatNotification";

import styles from "./ChatContent.module.scss";

export const ChatContent = ({ chatData }) => {
  const { showAllMessageTranslations, bookmarks, chatState } = useContext(ChatContext);

  
  // if (bookmarks && bookmarks.count > 0) {
    let bookmarksForCurrentChat = [];
    if(bookmarks && bookmarks.count > 0){
      bookmarksForCurrentChat = bookmarks.list.filter((b) => {
        return +b.chatId === +chatState.chatData.id;
      }).map(b=> +b.messageId);
    }
  // }


  let messages = "";
  if (chatData && chatData.messages.length > 0) {
    messages = chatData.messages.map((message) => {
      if (Number(message.id) <= Number(chatData.lastMessageId)) {
        if (message.type === "chatMessage") {
          const m = {...message};
          m.isBookmarked = bookmarksForCurrentChat.includes(m.id);

          return (
            <ChatMessage
              key={"message_" + chatData.id + "_" + message.id}
              {...m}
              showAllTranslations={showAllMessageTranslations}
              clickable={true}
            />
          );
        } else if (message.type === "chatNotification") {
          return (
            <ChatNotification
              key={"message_" + chatData.id + "_" + message.id}
              {...message}
            />
          );
        }
      }
    });
  }

  return (
    <div className={styles.chatContent}>
      <main className={styles.chatContent__body}>
        <div className={styles.chatMeta}>
          {chatData && chatData.dateCreated !== "" && (
            <span className={styles.dateCreated}>
              {stringToDdMonthYyyy(chatData.dateCreated)}
            </span>
          )}
          {chatData && chatData.contactDescription !== "" && (
            <h3 className={styles.description}>
              {chatData.contactDescription}
            </h3>
          )}
        </div>
        {messages}
      </main>
    </div>
  );
};
