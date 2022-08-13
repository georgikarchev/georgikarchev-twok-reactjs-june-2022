import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";

import { usernameValidator } from "../../../Utils/validators";

import styles from "./Login.module.scss";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(false);
  const {authError} = useContext(AuthContext);


  const nagivate = useNavigate();

  const inputUsernameOnChangeHandler = (e) => {
    // console.log(e.target.value);
    setUsername(e.target.value);
    setIsValid(usernameValidator(e.target.value));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(isValid) {
        // redirect to LoginByPermalink Page
        nagivate(`/${username}`);
    }
  };

  let submitClassNames = styles.submit;
  submitClassNames += isValid ? "" : " " + styles.disabled;

  return (
    <div className={styles.login}>
      <h1>Let's get you logged in</h1>
      {authError &&  authError !== '' && <p className={styles.error}>{authError}</p>}
      <div className={styles.formWrapper}>
        <form>
          <input
            className="inputUsername"
            type="text"
            placeholder="username hash"
            value={username}
            onChange={inputUsernameOnChangeHandler}
          />
          <button className={submitClassNames} onClick={onSubmitHandler} disabled={!isValid}>
            login
          </button>
          <p>
            or
            <br />
            <Link to="/new-user">Start as a new user</Link>
          </p>
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
