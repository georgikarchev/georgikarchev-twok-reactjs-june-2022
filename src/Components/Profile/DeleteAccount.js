import styles from "./DeleteAccount.module.scss";

export const DeleteAccount = ({ deleteAccountHandler }) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("#Delete account");
    // Send request to server and await response so that a confirmation (page) can be shown to the user
  }
  return (
    <div className={styles.deleteAccount}>
      <button className="submit" onClick={onSubmitHandler}>Delete account <small className={styles.small}>(permanently)</small></button>
      <p className={styles.info}>
        Your email address will not be saved in our database. You will stay
        completely anonymous. You will however have your login credentials in
        your inbox.
      </p>
    </div>
  );
};
