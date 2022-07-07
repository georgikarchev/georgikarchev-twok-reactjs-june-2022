import { useState } from "react";
import styles from "./SendCredentials.module.scss";

export const SendCredentials = () => {

    const [userEmail, setUserEmail] = useState(null);

  const inputEmailonChangeHandler = (e) => {
    // console.log(e.target.value);
    setUserEmail(e.target.value);
    // TODO! : check if valid email and show error if not
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userEmail);
  }

  return (
    <div className={styles.sendCredentials}>
      <div className={styles.formWrapper}>
        <form>
          <input
            className="inputEmail"
            type="email"
            placeholder="email address"
            onChange={inputEmailonChangeHandler}
          />
          <button className="submit" onClick={onSubmitHandler}>Send user &amp; pass to my email</button>
        </form>
      </div>
      <p className={styles.info}>
        Your email address will not be saved in our database. You will stay
        completely anonymous. You will however have your login credentials in
        your inbox.
      </p>
    </div>
  );
};
