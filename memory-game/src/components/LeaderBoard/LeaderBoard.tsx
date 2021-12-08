import { sortedLeaderBoardType } from "../../types/types";
import styles from "./LeaderBoard.module.css";

const LeaderBoard = () => {
  const leaderBoardStr = localStorage.getItem("LeaderBoard");
  if (leaderBoardStr) {
    const leaderBoard = JSON.parse(leaderBoardStr);

    //filter if time not asigned
    let filteredLeaderBoard: sortedLeaderBoardType[] = leaderBoard.filter(
      (user: sortedLeaderBoardType) => {
        return user.time !== undefined;
      }
    );

    let sortedLeaderBoardByTime: sortedLeaderBoardType[] = filteredLeaderBoard.sort(
      (a: sortedLeaderBoardType, b: sortedLeaderBoardType) => (a.time > b.time ? 1 : -1)
    );

    //remove more than 10 values
    if (sortedLeaderBoardByTime.length >= 10) {
      var newSortedArray = sortedLeaderBoardByTime.slice(0, 10);
      localStorage.setItem("LeaderBoard", JSON.stringify(newSortedArray));
      sortedLeaderBoardByTime = newSortedArray;
    }

    return (
      <div className={styles.leaderBoard}>
        <h1>Leaderboard TOP10</h1>
        <table className={styles.leaderTable}>
          <tr>
            <th>FirstName</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Difficulty</th>
            <th>Time</th>
            <th>Score</th>
          </tr>
          {sortedLeaderBoardByTime.map((user) => {
            return (
              <tr className={styles.leaderUser} key={user.time}>
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
        </table>
      </div>
    );
  }
  return (
    <div className={styles.leaderBoardEmpty}>
      <h1>Leaderboard TOP10 - empty!</h1>
    </div>
  );
};

export default LeaderBoard;
