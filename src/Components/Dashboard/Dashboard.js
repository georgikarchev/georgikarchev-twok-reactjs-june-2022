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
  const [languagesCount, setLanguagesCount] = useState(1);
  const [wordsCount, setWordsCount] = useState(25);

  useEffect(() => {
    // console.log("1> ",profileData.permalink);

    if (profileData && profileData.permalink != undefined) {
      const newMilestones = [];
      newMilestones.push({
        date: profileData.created,
        description: "You Joined twok",
        reached: true,
      });
      // setMilestones(state=>newMilestones);
      // console.log("2> ");
      languageService.getAchievementsList(profileData.permalink).then((res) => {
        // console.log("3> ",res);
        if (res && res.count > 0 && res.list.length > 0) {
          // console.log("4> ",res.list.length);
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
          // console.log("5>", newMilestones);
        }
        setMilestones(state=>newMilestones);
      })
      .catch(err=>console.error(err));

      
      if(profileData.enrolledIn.length > 0) {
        console.log(profileData.enrolledIn);
        setLanguagesCount(profileData.enrolledIn.length);
      }
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
  }, [profileData.permalink]);

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
          <Summary
            languages={languagesCount}
            wordsLearned={wordsCount}
            days={1}
          />
          <Achievements achievements={achievements} />
        </div>
      </main>
    </article>
  );
};
