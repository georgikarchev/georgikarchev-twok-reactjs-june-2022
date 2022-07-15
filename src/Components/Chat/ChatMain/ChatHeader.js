import styles from "./ChatHeader.module.scss";

export const ChatHeader = ({ name, avatar, desrciption }) => {
    console.log(desrciption)
  return (
    <div className={styles.chatHeader}>
      <img
        className={styles.contactAvatar}
        src={avatar}
        alt={name}
      />
      <div className={styles.infoWrapper}>
        <h3 className={styles.contactName}>{name}</h3>
        <p className={styles.description}>{desrciption}</p>
      </div>
    </div>
  );
};
