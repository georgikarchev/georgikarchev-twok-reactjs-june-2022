import { languageToIso2 } from "../../../Utils/languageCodes";

import styles from "./ChatHeader.module.scss";

export const ChatHeader = ({ name, avatar, desrciption, language }) => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.contactAvatar}>
        <img
          className={styles.photo}
          src={avatar}
          alt={name}
        />
        {language && <img className={styles.flag} src={`/images/flags/${languageToIso2(language)}.svg`} alt={language} />}
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.contactName}>{name}</h3>
        <p className={styles.description}>{desrciption}</p>
      </div>
    </div>
  );
};
