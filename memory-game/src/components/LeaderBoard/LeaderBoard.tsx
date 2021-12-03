import React, { useState } from "react";

const LeaderBoard = () => {
  const [showType, setShowType] = useState(1);
  const leaderBoardStr = localStorage.getItem("LeaderBoard");
  if (leaderBoardStr) {
    const leaderBoard = JSON.parse(leaderBoardStr);
    const sortedLeaderBoardByTime = leaderBoard.sort((a: any, b: any) =>
      a.time > b.time ? 1 : -1
    );
    const leaderBoard2 = JSON.parse(leaderBoardStr);
    const sortedLeaderBoardByMoves = leaderBoard2.sort((a: any, b: any) =>
      a.moves > b.moves ? 1 : -1
    );
    return (
      <div>
        <h1>Leaderboard TOP10</h1>
        <button
          onClick={() => {
            setShowType(() => 1);
            console.log(sortedLeaderBoardByTime);
          }}
        >
          by Time
        </button>
        <button
          onClick={() => {
            setShowType(() => 0);
            console.log(sortedLeaderBoardByMoves);
          }}
        >
          by moves
        </button>
        <ul>
          {showType === 1
            ? sortedLeaderBoardByTime.map((user: any) => {
                return (
                  <li key={user.time}>
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                    <div>
                      <span className="digits">
                        Your time {("0" + Math.floor((user.time / 1000) % 60)).slice(-2)}.
                      </span>
                      <span className="digits mili-sec">
                        {("0" + ((user.time / 10) % 100)).slice(-2)} !
                      </span>
                    </div>
                    <div>score: {user.moves}</div>
                  </li>
                );
              })
            : undefined}
          {showType === 0
            ? sortedLeaderBoardByMoves.map((user: any) => {
                return (
                  <li key={user.time}>
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                    <div>
                      <span className="digits">
                        Your time {("0" + Math.floor((user.time / 1000) % 60)).slice(-2)}.
                      </span>
                      <span className="digits mili-sec">
                        {("0" + ((user.time / 10) % 100)).slice(-2)} !
                      </span>
                    </div>
                    <div>score: {user.moves}</div>
                  </li>
                );
              })
            : undefined}
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
