import spinner from "../../images/spinner.svg";
import styles from "./Spinner.module.scss";

export const Spinner = () => {
    return (
        <img className={styles.spinner} src={spinner} alt="Loading"/>
    );
}