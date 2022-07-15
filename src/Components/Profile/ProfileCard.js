import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

import styles from "./ProfileCard.module.scss";

export const ProfileCard = () => {
  const { profileData } = useContext(AuthContext);

  const avatarSrc = profileData.profileImage
    ? profileData.profileImage
    : "images/avatar.png";
  const avatarAlt = profileData.profileDisplayName
    ? profileData.profileDisplayName
    : "avatar";

    let learningLanguages = false;
    if (profileData.languages !== undefined && profileData.languages.length > 0) {
      learningLanguages = <div className={styles.profileCard__learningLanguages}>learning <a href="/languages">{profileData.languages.length} Languages</a></div>;
    }

  let registeredOn = "01 July 2022";

  return (
    <div className={styles.profileCard}>
      <header>
        <img
          className={styles.profileCard__avatar}
          src={avatarSrc}
          alt={avatarAlt}
        />
      </header>
      <main>
        <div className={styles.profileCard__publicKey}>
          Username <small>(Public Key)</small>
          <span className={styles.profileCard__publicKey__value}>
            {profileData.publicKey
              ? profileData.publicKey
              : "Please register or login"}
          </span>
        </div>
        <div className={styles.profileCard__privateKey}>
          Password <small>(Private Key)</small>
          <span className={styles.profileCard__privateKey__value}>
            *******
          </span>
        </div>
      </main>
      <footer>
        {profileData.loggedIn ? <span className={styles.profileCard__registeredOn}>registered on {registeredOn}</span> : <i>You are not logged in</i>}
        {learningLanguages}
      </footer>
    </div>
  );
};
