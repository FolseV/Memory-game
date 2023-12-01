import React, { useCallback, useEffect, useState } from "react";
import styles from "./MemoryGame.module.css";
import Card from "../Card";
import Modal from "../Modal";
import useTypedSelector from "../../hooks";
import { useActions } from "../../hooks/useActions";
import { CardsType } from "../../types/cards";
import Timer from "../Timer";
import classNames from "classnames/bind";

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
  const { theme } = useTypedSelector((state) => state.theme);

  const { cards, openCards, clearedCards, moves, shouldDisableAllCards } = useTypedSelector(
    (state) => state.cards
  );
  const { user } = useTypedSelector((state) => state.user);
  const { time } = useTypedSelector((state) => state.timer);
  const {
    setOpenCards,
    setClearedCards,
    setMoves,
    resetMoves,
    setShouldDisableAllCards,
    startTimer,
    resetTimer,
    stopTimer,
  } = useActions();

  const [playingCards, setPlayingCards] = useState<CardsType[]>(() =>
    shuffleCards(cards.concat(cards))
  );
  const [showModal, setShowModal] = useState(false);

  // const timeout: { current: NodeJS.Timeout | undefined } = useRef(undefined);

  const checkCompletion = useCallback(() => {
    if (Object.keys(clearedCards).length === cards.length) {
      setShowModal(true);
      stopTimer();

      let leaderBoardStr = localStorage.getItem("LeaderBoard");
      if (leaderBoardStr) {
        let leaderBoard = JSON.parse(leaderBoardStr);
        leaderBoard[leaderBoard.length - 1].time = time;
        leaderBoard[leaderBoard.length - 1].moves = moves;
        localStorage.setItem("LeaderBoard", JSON.stringify(leaderBoard));
      }
    }
  }, [cards.length, clearedCards, stopTimer, moves, time]);

  let timer: ReturnType<typeof setTimeout>;

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

  const handleRestart = useCallback(() => {
    resetTimer();
    startTimer();
    setClearedCards(null);
    setOpenCards(null);
    setShowModal(false);
    resetMoves();
    setPlayingCards(shuffleCards(cards.concat(cards)));
  }, [cards, resetMoves, resetTimer, setClearedCards, setOpenCards, startTimer]);

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
    startTimer();
  }, [startTimer]);

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
  };

  return (
    <div
      className={cx(
        {
          memoryGame: true,
        },
        { [`dif-${user.difficulty}`]: true }
      )}
    >
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

      <div
        className={cx({
          score: theme,
        })}
      >
        <span className={styles.moves}>Score: {moves}</span>
      </div>
      <Timer />
      <button className={styles.button} onClick={handleRestart}>
        Give up (Restart)
      </button>
    </div>
  );
};

export default React.memo(MemoryGame);
