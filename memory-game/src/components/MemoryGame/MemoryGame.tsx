import React, { useEffect, useState } from "react";
import "./MemoryGame.css";
import Card from "../Card";
import { CardType } from "../../types/Card";
import Modal from "../Modal";
import useTypedSelector from "../../hooks";
import { useActions } from "../../hooks/useActions";

function shuffleCards(array: CardType[]) {
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
  const { cards, openCards, clearedCards, moves, shouldDisableAllCards } = useTypedSelector(
    (state) => state.cards
  );
  const { setOpenCards, setClearedCards, setMoves, resetMoves, setShouldDisableAllCards } =
    useActions();

  // let shuffledCards: CardType[] = cards;
  // if (numberOfCards === 12) {
  //   shuffledCards = shuffleCards(cards.concat(cards));
  // }
  // if (numberOfCards === 24) {
  //   shuffledCards = shuffleCards(cards.concat(cards).concat(cards).concat(cards));
  // }
  // if (numberOfCards === 36) {
  //   shuffledCards = shuffleCards(
  //     cards.concat(cards).concat(cards).concat(cards).concat(cards).concat(cards)
  //   );
  // }

  const [playingCards, setPlayingCards] = useState<CardType[]>(() =>
    shuffleCards(cards.concat(cards))
  );
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState<any>();

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

  const handleStopTime = () => {
    clearInterval(intervalId);
  };

  const handleResetTime = () => {
    clearInterval(intervalId);
    setTime(0);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === cards.length) {
      setShowModal(true);
      handleStopTime();
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore + "");
    }
  };

  let timer: ReturnType<typeof setTimeout>;
  const evaluate = () => {
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
  };

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
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  useEffect(() => {
    handleStartTime();
  }, []);

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: CardType) => {
    for (let k of clearedCards) {
      if (k === card.type) {
        return true;
      }
    }
    return false;
    // return Boolean(clearedCards[card.type]);
  };

  return (
    <div className="memory-game">
      <div className="memory-card">
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
      <Modal
        active={showModal}
        setActive={setShowModal}
        message="Congrats"
        moves={moves}
        restart={handleRestart}
        time={time}
      />
      <div className="score">
        <span className="moves">Score: {moves}</span>
      </div>
      <div className="timer" style={{ color: "white" }}>
        <span className="digits" style={{ color: "white" }}>
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec" style={{ color: "white" }}>
          {("0" + ((time / 10) % 100)).slice(-2)}{" "}
        </span>
      </div>
      <button className="button" onClick={() => setShowModal(true)}>
        TEST
      </button>
      <button className="button" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default MemoryGame;
