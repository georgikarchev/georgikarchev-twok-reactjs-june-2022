import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as storageService from "../../Services/storageService";

import { AuthContext } from "../../Contexts/AuthContext";

import { stringToDdMonthYyyy } from "../../Utils/dateUtils";

import styles from "./ProfileCard.module.scss";

export const ProfileCard = () => {
  const { profileData, setProfileData } = useContext(AuthContext);
  const navigate = useNavigate();

  const avatarSrc = profileData.profileImage
    ? profileData.profileImage
    : "images/avatar.png";
  const avatarAlt = profileData.profileDisplayName
    ? profileData.profileDisplayName
    : "avatar";

  let learningLanguages = false;

  if (profileData.enrolledIn !== undefined && profileData.enrolledIn.length > 0) {
    learningLanguages = (
      <div className={styles.profileCard__learningLanguages}>
        learning{" "}
        <Link to="/languages">{profileData.enrolledIn.length} Languages</Link>
      </div>
    );
  }

  //  ! TODO - switch hardcoded date with real data from the user profile
  let registeredOn = profileData && profileData.created ? stringToDdMonthYyyy(profileData.created) : "01 July 2022";

  const logoutClickHandler = () => {
    setProfileData({ loggedIn: false });
    storageService.deleteStorage();
    navigate('/');
  };

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
            {profileData.permalink
              ? profileData.permalink
              : "Please register or login"}
          </span>
        </div>
        {/* <div className={styles.profileCard__privateKey}>
          Password <small>(Private Key)</small>
          <span className={styles.profileCard__privateKey__value}>
            *******
          </span>
        </div> */}
        <button className={styles.logout} onClick={logoutClickHandler}>
          logout
        </button>
      </main>
      <footer>
        {profileData.loggedIn ? (
          <span className={styles.profileCard__registeredOn}>
            registered on {registeredOn}
          </span>
        ) : (
          <i>You are not logged in</i>
        )}
        {learningLanguages}
      </footer>
    </div>
  );
};
