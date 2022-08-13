import { useContext, useEffect, useState } from "react";

import * as languageService from "../../Services/languageService";

import { AuthContext } from "../../Contexts/AuthContext";

import { Timeline } from "../Common/Timeline/Timeline";
import { Achievements } from "./Achievements/Achievements";
import { Summary } from "./Achievements/Summary/Summary";

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
      setMilestones(newMilestones);

      languageService.getAchievementsList(profileData.permalink).then((res) => {
        if (res && res.count > 0 && res.list.length > 0) {
          res.list.map((x) => {
            newMilestones.push({
              date: x.dateCreated,
              description: x.description,
              language: x.language,
              reached: true,
            });
          });
          newMilestones.push({
            date: profileData.created,
            description: "Learn 2000 words.",
            reached: false,
          });
          setMilestones(newMilestones);
        }
      });

      // ! TODO - fetch real timeline data from server
      // newMilestones.push({
      //   date: profileData.created,
      //   description: "You learned you first 25 words in German.",
      //   reached: true,
      // });
      // newMilestones.push({
      //   date: profileData.created,
      //   description: "You completed the basics  basics with Eve.",
      //   reached: true,
      // });
      // newMilestones.push({
      //   date: profileData.created,
      //   description: "Learn 25 more words.",
      //   reached: false,
      // });
      // setMilestones(newMilestones);
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

  console.log(profileData);

  return (
    <article className={styles.dashboard}>
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <div className={styles.leftSide}>
          <Timeline milestones={milestones} />
        </div>
        <div className={styles.rightSide}>
          <Summary languages={2} wordsLearned={10} days={1} />
          <Achievements achievements={achievements} />
        </div>
      </main>
    </article>
  );
};
