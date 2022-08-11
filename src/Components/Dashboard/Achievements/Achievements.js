import styles from "./Achievements.module.scss";

export const Achievements = ({achievements}) => {

    const badges = achievements.map((x,i)=>{
        return (
            <li key={i} className={`${x.reached? styles.reached : ''} ${styles.badge}`}>
                <div className={styles.number}>{x.number}</div>
                <div>words</div>
            </li>
        );
    });

    return (
        <div className={styles.achievements}>
            <h3>Achievements</h3>
            <ul className={styles.list}>
                {badges}
            </ul>
        </div>
    );
}