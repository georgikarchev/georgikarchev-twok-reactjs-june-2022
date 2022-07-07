import { ProfileCard } from "./ProfileCard";
import { SendCredentials } from "./SendCredentials";
import { DeleteAccount } from "./DeleteAccount";


import styles from "./Profile.module.scss";

export const Profile = () => {
    return (
        <div className={styles.profile}>
            <ProfileCard />
            <SendCredentials />
            <DeleteAccount />
        </div>
    );
}