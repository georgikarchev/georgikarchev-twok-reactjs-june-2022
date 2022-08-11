import styles from "./Timeline.module.scss";

import { stringToDdMonthYyyy } from "../../../Utils/dateUtils";

export const Timeline = ({milestones}) => {

    // if(milestones && milestones.length > 0) {
    //     console.log(milestones);
    // }

    const line = milestones.map((m,i)=>{
        // console.log(m)
        return (
            <li key={i} className={`${m.reached? styles.reached : ''} ${styles.milestone}`}>
                <div className={styles.date}>{m.reached? stringToDdMonthYyyy(m.date) : 'today'}</div>
                <div>{m.description}</div>
            </li>
        );
    });
    // const line = milestones.map

    return (
        <div className={styles.timelineWrapper}>
            <h3>Timeline</h3>
            <ul className={styles.timeline}>
                {line}
            </ul>
        </div>
    );
}