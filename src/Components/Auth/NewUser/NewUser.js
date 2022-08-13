import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as authService from "../../../Services/authService";
import { Spinner } from "../../Common/Spinner";

import user from "../../Header/images/user.svg";
import styles from "./NewUser.module.scss";

export const NewUser = () => {
  const linesCount = 7;
  const [lineToShow, setLineToShow] = useState(0);
  const [error, setError] = useState(false);
  const [permalink, setPermalink] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("line " + lineToShow);

    if (lineToShow > linesCount) {
      // console.log(+lineToShow, +linesCount, +lineToShow === +linesCount, permalink)
      if (permalink) {
        console.log("redirect now!");
        navigate(`/${permalink}`);
        return;
      }
      setError(true);
      return;
    }
    setTimeout(() => {
      setLineToShow((state) => Number(state) + 1);
    }, 3000);
  }, [lineToShow]);

  useEffect(() => {
    // create new user
    authService.createUser().then((userData) => {
        console.log("userData: ",userData);
      if (
        !userData ||
        !userData.permalink ||
        (userData && userData.permalink.length !== 8)
      ) {
        setError(true);
        return;
      }
      setPermalink(userData.permalink);
    })
    .catch(err=>console.error(err));;
  }, []);

  return (
    <div className={styles.newUser}>
        <Spinner />
      {error && (
        <span>
          Oops. There was a problem. Please try to go back to the{" "}
          <Link to="/home">Homepage</Link> and try again.
        </span>
      )}
      <h1
        className={`${styles.line} ${styles.line1}${
          lineToShow === 1 ? " " + styles.fadeIn : ""
        }${lineToShow === 2 ? " " + styles.fadeOut : ""}`}
      >
        We are creating a new user profile for you.
      </h1>
      <span
        className={`${styles.line} ${styles.line2}${
          lineToShow === 2 ? " " + styles.fadeIn : ""
        }${lineToShow === 3 ? " " + styles.fadeOut : ""}`}
      >
        This should only take a couple of seconds.
      </span>
      <span
        className={`${styles.line} ${styles.line3}${
          lineToShow === 3 ? " " + styles.fadeIn : ""
        }${lineToShow === 4 ? " " + styles.fadeOut : ""}`}
      >
        We don't need any information from you whatsoever.
      </span>
      <span
        className={`${styles.line} ${styles.line4}${
          lineToShow === 4 ? " " + styles.fadeIn : ""
        }${lineToShow === 5 ? " " + styles.fadeOut : ""}`}
      >
        You can stay completely anonymous at all times.
      </span>
      <span
        className={`${styles.line} ${styles.line5}${
          lineToShow === 5 ? " " + styles.fadeIn : ""
        }${lineToShow === 6 ? " " + styles.fadeOut : ""}`}
      >
        Almost there...
      </span>
      <span
        className={`${styles.line} ${styles.line6}${
          lineToShow === 6 ? " " + styles.fadeIn : ""
        }${lineToShow === 7 ? " " + styles.fadeOut : ""}`}
      >
        If you choose to save you progress you can do that
        from&nbsp;the&nbsp;profile&nbsp;page&nbsp;
        <img src={user} alt="profile" />
      </span>
      <span
        className={`${styles.line} ${styles.line7}${
          lineToShow >= 7 ? " " + styles.fadeIn : ""
        }`}
      >
        All set.
        <br />
        Let's get you started
      </span>
    </div>
  );
};
