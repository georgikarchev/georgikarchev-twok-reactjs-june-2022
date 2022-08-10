import spinner from "../../images/spinnerTyping.svg";
import styles from "./SpinnerTyping.module.scss";

export const SpinnerTyping = () => {
    return (
        <img className={`spinnerTyping ${styles.spinnerTyping}`} src={spinner} alt=". . ."/>
    );
}