import React, { useState } from "react";
import { sortedLeaderBoardType } from "../../types/types";
import styles from "./LeaderBoard.module.css";

const LeaderBoard = () => {
  const leaderBoardStr = localStorage.getItem("LeaderBoard");
  const leaderBoard = JSON.parse(leaderBoardStr ? leaderBoardStr : "");

  //filter if time not asigned
  let filteredLeaderBoard: sortedLeaderBoardType[] = leaderBoard.filter(
    (user: sortedLeaderBoardType) => {
      return user.time !== undefined;
    }
  );

  // filter by difficulty

  let filteredByEasy = filteredLeaderBoard.filter((user: sortedLeaderBoardType) => {
    return user.difficulty === "easy";
  });
  let filteredByMedium = filteredLeaderBoard.filter((user: sortedLeaderBoardType) => {
    return user.difficulty === "medium";
  });
  let filteredByHard = filteredLeaderBoard.filter((user: sortedLeaderBoardType) => {
    return user.difficulty === "hard";
  });

  //works only here
  const [filteredItems, setFilteredItems] = useState<sortedLeaderBoardType[]>(filteredByEasy);

  let sortedLeaderBoardByTime: sortedLeaderBoardType[] = filteredItems.sort(
    (a: sortedLeaderBoardType, b: sortedLeaderBoardType) => (a.time > b.time ? 1 : -1)
  );

  const top10 = sortedLeaderBoardByTime.slice(0, 10);
  return (
    <div className={styles.leaderBoard}>
      <h1>Leaderboard TOP10</h1>
      <button className={styles.leaderBoardButton} onClick={() => setFilteredItems(filteredByEasy)}>
        Easy
      </button>
      <button
        className={styles.leaderBoardButton}
        onClick={() => setFilteredItems(filteredByMedium)}
      >
        Medium
      </button>
      <button className={styles.leaderBoardButton} onClick={() => setFilteredItems(filteredByHard)}>
        Hard
      </button>
      <table className={styles.leaderTable}>
        <tbody>
          <tr>
            <th>FirstName</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Difficulty</th>
            <th>Time</th>
            <th>Score</th>
          </tr>
          {top10.map((user, index) => {
            return (
              <tr className={styles.leaderUser} key={index}>
                <td className={styles.leaderFirstName}>{user.firstName}</td>
                <td className={styles.leaderLastName}>{user.lastName}</td>
                <td className={styles.leaderEmail}>{user.email}</td>
                <td className={styles.leaderDifficulty}>{user.difficulty}</td>
                <td className={styles.leaderTime}>
                  <span className={styles.minutes}>
                    {("0" + Math.floor((user.time / 60000) % 60)).slice(-2)}:
                  </span>
                  <span className={styles.seconds}>
                    {("0" + Math.floor((user.time / 1000) % 60)).slice(-2)}.
                  </span>
                  <span className={styles.milisec}>
                    {("0" + ((user.time / 10) % 100)).slice(-2)}
                  </span>
                </td>
                <td className={styles.leaderScore}>{user.moves}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
