import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../Contexts/AuthContext";

import { Timeline } from "../Common/Timeline/Timeline";
import { Achievements } from "./Achievements/Achievements";

import styles from "./Dashboard.module.scss";

export const Dashboard = () => {
  const { profileData } = useContext(AuthContext);
  const [milestones, setMilestones] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (profileData && profileData.permalink != undefined) {
      
      const newMilestones = [];
      newMilestones.push({
        date: profileData.created,
        description: "You Joined twok",
        reached: true,
      });

      // ! TODO - fetch real timeline data from server
      newMilestones.push({
        date: profileData.created,
        description: "You learned you first 25 words in German.",
        reached: true,
      });
      newMilestones.push({
        date: profileData.created,
        description: "You completed the basics  basics with Eve.",
        reached: true,
      });
      newMilestones.push({
        date: profileData.created,
        description: "Learn 25 more words.",
        reached: false,
      });
      setMilestones(newMilestones);
    }
    // ! TODO - fetch real achievements from server
    const newAchievements = [];
    newAchievements.push({
      number: 25,
      reached: true,
    });
    newAchievements.push({
      number: 50,
      reached: false,
    });
    newAchievements.push({
      number: 100,
      reached: false,
    });
    newAchievements.push({
      number: 500,
      reached: false,
    });
    newAchievements.push({
      number: 1000,
      reached: false,
    });
    newAchievements.push({
      number: 2000,
      reached: false,
    });
    setAchievements(newAchievements);
  }, [profileData]);

  return (
    <article className={styles.dashboard}>
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <Timeline milestones={milestones} />
        <Achievements achievements={achievements} />
      </main>
    </article>
  );
};
