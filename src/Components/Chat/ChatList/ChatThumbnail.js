import { useContext } from "react";

import { ChatContext } from "../../../Contexts/ChatContext";

import { lastActive } from "../../../Utils/dateUtils";
import { languageToIso2 } from "../../../Utils/languageCodes";

import { SpinnerTyping } from "../../Common/SpinnerTyping";

import styles from "./ChatThumbnail.module.scss";

export const ChatThumbnail = ({ chat, isCurrent, onSelectChat }) => {
  const { botIsTyping } = useContext(ChatContext);

  let thumbnailClassNames = styles.chatThumbnail;
  thumbnailClassNames += +chat.unread === 1 ? " " + styles.unread : "";
  thumbnailClassNames += isCurrent ? " " + styles.current : "";

  let lastMessageClassNames = styles.lastMessage;
  // console.log("b", chat.lastMessage);
  lastMessageClassNames +=
    chat.lastMessage.bookmarked === 1 ? " " + styles.bookmarked : "";

  const lastMessage =
    chat.lastMessage.content.length > 30
      ? chat.lastMessage.content.substring(0, 30) + " ..."
      : chat.lastMessage.content;

  return (
    <div
      className={thumbnailClassNames}
      onClick={() => {
        onSelectChat(chat.chatId);
      }}
    >
      <h4 className={styles.contactName}>{chat.contactName}</h4>
      <img
        className={styles.contactAvatar}
        src={chat.contactAvatar}
        alt={chat.contactName}
      />
      <img
        className={styles.flag}
        src={`/images/flags/${languageToIso2(chat.language)}.svg`}
        alt={chat.language}
      />
      <p className={lastMessageClassNames}>{botIsTyping && isCurrent? <SpinnerTyping /> : lastMessage}</p>
      <span className={styles.lastActive}>
        {lastActive(chat.lastMessage.datetime)}
      </span>
    </div>
  );
};
