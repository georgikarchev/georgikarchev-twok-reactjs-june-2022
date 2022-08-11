import styles from "./Summary.module.scss";

export const Summary = () => {
    return (
        <div className={styles.summary}>
            <p>260 words learned in two languages</p>
            <p>It only took you 6 days</p>
            <p>You are doing better than 35% of all twok users</p>
        </div>
    );
}