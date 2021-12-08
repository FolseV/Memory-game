import { useEffect } from "react";
import { useNavigate } from "react-router";
import { sortedLeaderBoardType } from "../../types/types";

const removeNaNLeaderBoard = () => {
  const leaderBoardStr = localStorage.getItem("LeaderBoard");
  if (leaderBoardStr) {
    const leaderBoard = JSON.parse(leaderBoardStr);
    let filteredLeaderBoard: sortedLeaderBoardType[] = leaderBoard.filter(
      (user: sortedLeaderBoardType) => {
        return user.time !== undefined && user.time !== 0;
      }
    );
    console.log(filteredLeaderBoard);
    // if (filteredLeaderBoard.length !== 0) {
    localStorage.setItem("LeaderBoard", JSON.stringify(filteredLeaderBoard));
    // }
  }
};

const LeaderBoard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeNaNLeaderBoard();
  }, []);

  const leaderBoardStr = localStorage.getItem("LeaderBoard");
  if (leaderBoardStr) {
    console.log("render leaderboard");
    const leaderBoard = JSON.parse(leaderBoardStr);
    //filter if time not asigned
    // let filteredLeaderBoard: sortedLeaderBoardType[] = leaderBoard.filter(
    //   (user: sortedLeaderBoardType) => {
    //     return user.time !== undefined;
    //   }
    // );

    let sortedLeaderBoardByTime: sortedLeaderBoardType[] = leaderBoard.sort(
      (a: sortedLeaderBoardType, b: sortedLeaderBoardType) => (a.time > b.time ? 1 : -1)
    );

    //remove more than 10 values
    if (sortedLeaderBoardByTime.length >= 10) {
      var newSortedArray = sortedLeaderBoardByTime.slice(0, 10);
      localStorage.setItem("LeaderBoard", JSON.stringify(newSortedArray));
      sortedLeaderBoardByTime = newSortedArray;
    }

    return (
      <div>
        <h1>Leaderboard TOP10</h1>
        <button onClick={() => navigate(`/greetings`, { replace: true })}>Rules</button>
        <ul>
          {sortedLeaderBoardByTime.map((user: any) => {
            return (
              <li key={user.time}>
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
                <div>
                  <span className="digits">
                    Time: {("0" + Math.floor((user.time / 1000) % 60)).slice(-2)}.
                  </span>
                  <span className="digits mili-sec">
                    {("0" + ((user.time / 10) % 100)).slice(-2)} !
                  </span>
                </div>
                <div>score: {user.moves}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return (
    <div className="div">
      <h1>Leaderboard TOP10 - empty!</h1>
    </div>
  );
};

export default LeaderBoard;
