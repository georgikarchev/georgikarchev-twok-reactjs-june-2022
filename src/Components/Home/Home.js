import { Link } from "react-router-dom";

import styles from "./Home.module.scss";

import logo from "../../images/twok-logo--gradient.svg";

export const Home = () => {
    return (
        <div className={styles.home}>
            <h1>
                <img src={logo} alt="twok" />
                Learn to speak<br/>
                like a five year old
            </h1>

            <section className={styles.section1}>
                <Link to="/login">Login</Link>
                <Link to="/new-user">New user</Link>
            </section>
        </div>
    );
}