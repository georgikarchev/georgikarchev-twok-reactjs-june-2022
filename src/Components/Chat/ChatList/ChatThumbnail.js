import { lastActive } from "../../../Utils/dateUtils";

import styles from "./ChatThumbnail.module.scss";

export const ChatThumbnail = ({ chat, isCurrent, onSelectChat }) => {

  let thumbnailClassNames = styles.chatThumbnail;
  thumbnailClassNames += chat.unread ? " " + styles.unread : "";
  thumbnailClassNames += isCurrent ? " " + styles.current : "";

  let lastMessageClassNames = styles.lastMessage;
  lastMessageClassNames += chat.lastMessage.bookmarked
    ? " " + styles.bookmarked
    : "";

  return (
    <div className={thumbnailClassNames} onClick={()=>{onSelectChat(chat.id)}}>
      <h4 className={styles.contactName}>{chat.contactName}</h4>
      <img
        className={styles.contactAvatar}
        src={chat.contactAvatar}
        alt={chat.contactName}
      />
      <p className={lastMessageClassNames}>{chat.lastMessage.content}</p>
      <span className={styles.lastActive}>{lastActive(chat.lastMessage.datetime)}</span>
    </div>
  );
};
