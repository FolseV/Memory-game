import React, { useCallback, useEffect, useState } from "react";
import styles from "./MemoryGame.module.css";
import Card from "../Card";
import Modal from "../Modal";
import useTypedSelector from "../../hooks";
import { useActions } from "../../hooks/useActions";
import classNames from "classnames/bind";
import { CardsType } from "../../types/cards";

let cx = classNames.bind(styles);

function shuffleCards(array: CardsType[]) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

const MemoryGame = () => {
  console.log("render game");
  const { cards, openCards, clearedCards, moves, shouldDisableAllCards } = useTypedSelector(
    (state) => state.cards
  );
  const { user } = useTypedSelector((state) => state.user);
  const { setOpenCards, setClearedCards, setMoves, resetMoves, setShouldDisableAllCards } =
    useActions();

  const [playingCards, setPlayingCards] = useState<CardsType[]>(() =>
    shuffleCards(cards.concat(cards))
  );
  const [showModal, setShowModal] = useState(false);

  // const timeout: { current: NodeJS.Timeout | undefined } = useRef(undefined);

  const [time, setTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>(0);

  const handleStartTime = () => {
    let interval: number = window.setInterval(() => {
      //window.setInterval
      setTime((prev) => prev + 10);
    }, 10);

    setIntervalId(interval);
  };

  // const handleStopTime = () => {
  //   clearInterval(intervalId);
  // };
  const handleStopTime = useCallback(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  const handleResetTime = () => {
    clearInterval(intervalId);
    setTime(0);
  };
  const checkCompletion = useCallback(() => {
    if (Object.keys(clearedCards).length === cards.length) {
      setShowModal(true);
      handleStopTime();

      let leaderBoardStr = localStorage.getItem("LeaderBoard");
      if (leaderBoardStr) {
        let leaderBoard = JSON.parse(leaderBoardStr);
        // if (time) {
        leaderBoard[leaderBoard.length - 1].time = time;
        leaderBoard[leaderBoard.length - 1].moves = moves;
        localStorage.setItem("LeaderBoard", JSON.stringify(leaderBoard));
        // } else {
        // leaderBoard.slice(0, leaderBoard.length - 1);

        // localStorage.setItem("LeaderBoard", JSON.stringify(leaderBoard));
        // }
      }
    }
  }, [cards.length, clearedCards, handleStopTime, moves, time]);

  // const checkCompletion = () => {
  //   if (Object.keys(clearedCards).length === cards.length) {
  //     setShowModal(true);
  //     handleStopTime();
  //     const highScore = Math.min(moves, bestScore);
  //     setBestScore(highScore);
  //     localStorage.setItem("bestScore", highScore + "");
  //   }
  // };

  let timer: ReturnType<typeof setTimeout>;
  // const evaluate = () => {
  //   const [first, second] = openCards;
  //   if (playingCards[first].type === playingCards[second].type) {
  //     setClearedCards(playingCards[first].type);
  //     setShouldDisableAllCards();

  //     setOpenCards(null);
  //     return;
  //   }
  //   timer = setTimeout(() => {
  //     setShouldDisableAllCards();
  //     setOpenCards(null);
  //   }, 500);
  // };

  const evaluate = useCallback(
    (timer) => {
      const [first, second] = openCards;
      if (playingCards[first].type === playingCards[second].type) {
        setClearedCards(playingCards[first].type);
        setShouldDisableAllCards();

        setOpenCards(null);
        return;
      }
      timer = setTimeout(() => {
        setShouldDisableAllCards();
        setOpenCards(null);
      }, 500);
    },
    [openCards, playingCards, setClearedCards, setOpenCards, setShouldDisableAllCards]
  );

  const handleCardClick = (index: number) => {
    //have max 2
    if (openCards.length === 1) {
      setOpenCards(index);
      setMoves();
      setShouldDisableAllCards();
    } else {
      clearTimeout(timer);
      setOpenCards(index);
    }
  };

  const handleRestart = () => {
    handleResetTime();
    handleStartTime();
    setClearedCards(null);
    setOpenCards(null);
    setShowModal(false);
    resetMoves();
    setPlayingCards(shuffleCards(cards.concat(cards)));
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards, evaluate]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards, checkCompletion]);

  useEffect(() => {
    handleStartTime();
  }, []);

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: CardsType) => {
    for (let k of clearedCards) {
      if (k === card.type) {
        return true;
      }
    }
    return false;
    // return Boolean(clearedCards[card.type]);
  };

  return (
    // <div className="memory-game">
    // <div className={styles.memoryGame}>
    <div
      className={cx(
        {
          memoryGame: true,
        },
        { [`dif-${user.difficulty}`]: true }
      )}
    >
      {/* <div className="memory-card"> */}
      <div
        className={cx(
          {
            memoryCard: true,
          },
          { [`dif-${user.difficulty ? user.difficulty : "easy"}`]: true }
        )}
      >
        {playingCards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              onClick={handleCardClick}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
            />
          );
        })}
      </div>
      {showModal ? (
        <Modal
          active={showModal}
          setActive={setShowModal}
          message="Congrats"
          moves={moves}
          restart={handleRestart}
          time={time}
        />
      ) : undefined}

      <div className={styles.score}>
        <span className={styles.moves}>Score: {moves}</span>
      </div>
      <div className={styles.timer} style={{ color: "white" }}>
        <span className={styles.digits}>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span className={styles.digits} style={{ color: "white" }}>
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
        </span>
        <span className={styles.digitsMiliSec} style={{ color: "white" }}>
          {("0" + ((time / 10) % 100)).slice(-2)}{" "}
        </span>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          setShowModal(true);
          handleStopTime();
        }}
      >
        TEST
      </button>
      <button className={styles.button} onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default MemoryGame;
