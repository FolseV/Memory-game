return (

<div className="memory-game">
<div className="memory-card">
<img src={angular} alt="angular" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={angular} alt="angular" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={aurelia} alt="aurelia" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={aurelia} alt="aurelia" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={backbone} alt="backbone" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={backbone} alt="backbone" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={ember} alt="ember" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={ember} alt="ember" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={jsbadge} alt="jsbadge" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={jsbadge} alt="jsbadge" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={vue} alt="vue" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
<div className="memory-card">
<img src={vue} alt="vue" className="front-face" />
<img src={react} alt="react" className="back-face" />
</div>
</div>
);

      <form
        onSubmit={handleSubmit((data) => {
          getUser(data);
          navigate(`/memorygame`, { replace: true });

          let items = localStorage.getItem("LeaderBoard");
          let oldItems = JSON.parse(items ? items : "null") || [];

          let newItem = data;

          oldItems.push(newItem);

          localStorage.setItem("LeaderBoard", JSON.stringify(oldItems));
        })}



        <div>
          <div className={styles.leaderHeader}>
            <div className={styles.leaderFirstName}>FirstName</div>
            <div className={styles.leaderLastName}>Last Name</div>
            <div className={styles.leaderEmail}>Email</div>
            <div className={styles.leaderDifficulty}>Difficulty</div>
            <div className={styles.leaderTime}>Time</div>
            <div className={styles.leaderScore}>Score</div>
          </div>
        </div>

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

        {/* <button className="modal_button" onClick={() => navigate(`/home`, { replace: true })}>
          Home
        </button>
        <button
          className="modal_button"
          onClick={() => navigate(`/leaderboard`, { replace: true })}
        >
          LeaderBoard
        </button> */}

// const CheckLocalStorageValues = (): CardsState => {
// const checkLocalStorageStr = localStorage.getItem("LeaderBoard");
// const [state, setState] = useState("");
// if (checkLocalStorageStr) {
// const checkLocalStorage = JSON.parse(checkLocalStorageStr);
// var difficulty: string = checkLocalStorage[checkLocalStorage.length - 1].difficulty;
// setState(difficulty);
// }
// const difficultys: any = {
// easy: easy,
// medium: medium,
// hard: hard,
// };

// return initialState;
// };

enum UserKeys {
difficulty,
email,
firstName,
lastName,
moves,
suite,
time,
}

const useSortableData = (items: sortedLeaderBoardType[]) => {
const [sortConfig, setSortConfig] = React.useState<{ key: UserKeys; direction: string }>({
key: UserKeys.firstName,
direction: "ascending",
});

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a: any, b: any) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
      let direction = "ascending";
      if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };

};

    const { items, requestSort, sortConfig } = useSortableData(leaderBoard);
    const getClassNamesFor = (name: string) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };


    //remove more than 10 values
    // if (sortedLeaderBoardByTime.length >= 10) {
    //   var newSortedArray = sortedLeaderBoardByTime.slice(0, 10);
    //   localStorage.setItem("LeaderBoard", JSON.stringify(newSortedArray));
    //   sortedLeaderBoardByTime = newSortedArray;
    // }
