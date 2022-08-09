import styles from "./ChatHeader.module.scss";

export const ChatHeader = ({ name, avatar, desrciption }) => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.contactAvatar}>
        <img
          src={avatar}
          alt={name}
        />
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.contactName}>{name}</h3>
        <p className={styles.description}>{desrciption}</p>
      </div>
    </div>
  );
};
