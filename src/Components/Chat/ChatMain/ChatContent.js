import { useContext } from "react";

import { stringToDdMonthYyyy } from "../../../Utils/dateUtils";

import { ChatContext } from "../../../Contexts/ChatContext";

import { Spinner } from "../../Common/Spinner";
import { ChatMessage } from "./ChatMessage";
import { ChatNotification } from "./ChatNotification";

import styles from "./ChatContent.module.scss";

export const ChatContent = ({chatData, showAllTranslations}) => {


    const {showAllMessageTranslations} = useContext(ChatContext);

  let messages = <Spinner />;
  if (chatData && chatData.messages.length > 0) {
    messages = chatData.messages.map((message) => {
      console.log(Number(message.id) <= Number(chatData.lastMessageId));
      if (Number(message.id) <= Number(chatData.lastMessageId)) {
        if (message.type === "chatMessage") {
          return (
            <ChatMessage
              key={"message_" + chatData.id + "_" + message.id}
              {...message}
              showAllTranslations={showAllMessageTranslations}
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
