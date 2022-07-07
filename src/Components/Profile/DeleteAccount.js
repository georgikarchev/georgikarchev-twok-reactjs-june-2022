import styles from "./DeleteAccount.module.scss";

export const DeleteAccount = ({ deleteAccountHandler }) => {
  return (
    <div className={styles.deleteAccount}>
      <button>Delete account (permanently)</button>
      <p>
        We believe that it is your right to have full control over your account.
        Deleting your account is just a click away. But keep in mind that it is
        going to be permanent. There will be no going back.
      </p>
    </div>
  );
};
