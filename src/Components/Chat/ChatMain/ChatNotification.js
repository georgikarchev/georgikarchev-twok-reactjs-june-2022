import styles from "./ChatNotification.module.scss";

export const ChatNotification = ({
  id,
  type,
  body
}) => {

  return (
    <div className={styles.notification}>
      <div className={styles.body}>{body}</div>
    </div>
  );
};
