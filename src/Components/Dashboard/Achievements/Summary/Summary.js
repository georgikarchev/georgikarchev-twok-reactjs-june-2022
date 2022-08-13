import styles from "./Summary.module.scss";

export const Summary = ({ languages, wordsLearned, days }) => {
  return (
    <div className={styles.summary}>
      <p>{wordsLearned} words learned in {languages} languages</p>
      <p>It only took you {days} days</p>
      <p>You are doing better than 35% of all twok users</p>
    </div>
  );
};
