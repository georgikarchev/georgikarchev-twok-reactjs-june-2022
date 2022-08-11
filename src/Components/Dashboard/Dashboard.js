import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../Contexts/AuthContext";

import { Timeline } from "../Common/Timeline/Timeline";

import styles from "./Dashboard.module.scss";

export const Dashboard = () => {

    const { profileData } = useContext(AuthContext);
    const [ milestones, setMilestones ] = useState([])


    useEffect(()=>{
        if(profileData && profileData.permalink != undefined) {
            console.log(profileData);
            const newMilestones = [];
            newMilestones.push({
                date: profileData.created,
                description: 'You Joined twok',
                reached: true
            });
    
            // ! TODO - fetch real achievements from server
            newMilestones.push({
                date: profileData.created,
                description: 'You learned you first 25 words in German.',
                reached: true
            });
            newMilestones.push({
                date: profileData.created,
                description: 'You completed the basics  basics with Eve.',
                reached: true
            });
            newMilestones.push({
                date: profileData.created,
                description: 'Learn 25 more words.',
                reached: false
            });

            setMilestones(newMilestones);
        }
    },[profileData]);

    return (
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            <Timeline milestones={milestones} />
        </div>
    );
}