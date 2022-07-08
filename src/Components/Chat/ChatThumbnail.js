import styles from "./ChatThumbnail.module.scss";

export const ChatThumbnail = ({ chat, isCurrent, selectChatHandler }) => {
  let lastActive = "now";
  // console.log(chat.lastMessage.datetime);
  const utcLastActive = new Date(
    new Date(chat.lastMessage.datetime.toString()).toISOString()
  );
  // console.log('utcLastActive', utcLastActive);
  const utcNow = new Date(new Date().toISOString());
  // console.log('utcNow', utcNow);

  const timeSinceLastActive = Math.abs(utcNow - utcLastActive);
  const diffDays = Math.floor(timeSinceLastActive / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(timeSinceLastActive / (1000 * 60 * 60));
  const diffMinutes = Math.floor(timeSinceLastActive / (1000 * 60));
  // console.log(diffDays, diffHours, diffMinutes);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (diffDays > 6) {
    lastActive =
      utcLastActive.getUTCDate() +
      " " +
      month[utcLastActive.getUTCMonth()].substring(0, 3);
  } else if (diffDays > 1) {
    lastActive = weekday[utcLastActive.getUTCDay()].substring(0, 3);
  } else if (diffDays > 0) {
    lastActive = "Yesterday";
  } else if (diffHours > 1) {
    lastActive =
      utcLastActive.getUTCHours() + ":" + utcLastActive.getUTCMinutes();
  } else if (diffMinutes > 1) {
    lastActive = diffMinutes + "m";
  }

  // const d = new Date();
  // const diff =  d.getTimezoneOffset();

  let thumbnailClassNames = styles.chatThumbnail;
  thumbnailClassNames += chat.unread ? " " + styles.unread : "";
  thumbnailClassNames += isCurrent ? " " + styles.current : "";

  let lastMessageClassNames = styles.lastMessage;
  lastMessageClassNames += chat.lastMessage.bookmarked
    ? "" + styles.bookmarked
    : "";

  return (
    <div className={thumbnailClassNames} onClick={()=>{selectChatHandler(chat.id)}}>
      <h4 className={styles.contactName}>{chat.contactName}</h4>
      <img
        className={styles.contactAvatar}
        src={chat.contactAvatar}
        alt={chat.contactName}
      />
      <p className={lastMessageClassNames}>{chat.lastMessage.content}</p>
      <span className={styles.lastActive}>{lastActive}</span>
    </div>
  );
};
