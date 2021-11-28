import React, { useEffect, useRef, useState } from "react";
import "./MemoryGame.css";
import angular from "../../img/cards/platforms/angular.svg";
import aurelia from "../../img/cards/platforms/aurelia.svg";
import backbone from "../../img/cards/platforms/backbone.svg";
import ember from "../../img/cards/platforms/ember.svg";
import jsbadge from "../../img/cards/platforms/js-badge.svg";
// import react from "../../img/cards/platforms/react.svg";
import vue from "../../img/cards/platforms/vue.svg";
import Card from "../Card";
import { CardType } from "../../types/Card";
import Modal from "../Modal";

const uniqueCardsArray = [
  {
    type: "angular",
    image: angular,
  },
  {
    type: "aurelia",
    image: aurelia,
  },
  {
    type: "backbone",
    image: backbone,
  },
  {
    type: "ember",
    image: ember,
  },
  {
    type: "jsbadge",
    image: jsbadge,
  },
  {
    type: "vue",
    image: vue,
  },
];

function shuffleCards(array: any) {
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
  const [cards, setCards] = useState<CardType[]>(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [openCards, setOpenCards] = useState<any[]>([]);
  const [clearedCards, setClearedCards] = useState<any[]>([]);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState<any>();
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const timeout: { current: NodeJS.Timeout | undefined } = useRef(undefined);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore + "");
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }

    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index: number) => {
    //have max 2
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      // clearTimeout(timeout.current);
      // let timeoutId: null | ReturnType<typeof clearTimeout> = timeout.current;
      // timeoutId = clearTimeout
      // window.clearTimeout(timeoutId);
      setOpenCards([index]);
    }
  };

  const handleRestart = () => {
    setClearedCards([]);
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };

  useEffect(() => {
    let timeout: any = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [openCards]);

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: CardType) => {
    for (let k in clearedCards) {
      if (k === card.type) {
        return true;
      }
    }
    return false;
    // return Boolean(clearedCards[card.type]);
  };

  return (
    <div className="memory-game">
      <header>
        <h1>Play memory game</h1>
        <p>Rules</p>
      </header>
      <div className="memory-card">
        {cards.map((card, index) => {
          return (
            <>
              <Card
                key={index}
                card={card}
                index={index}
                onClick={handleCardClick}
                isDisabled={shouldDisableAllCards}
                isInactive={checkIsInactive(card)}
                isFlipped={checkIsFlipped(index)}
              />
              {/* <button
                onClick={() => {
                  console.log(Object.values(clearedCards).indexOf(card.type) >= 0);
                }}
              >
                TEST2
              </button>
              <button
                onClick={() => {
                  console.log(clearedCards);
                }}
              >
                TEST3
              </button> */}
            </>
          );
        })}
      </div>
      <Modal
        active={showModal}
        setActive={setShowModal}
        message="Congrats"
        moves={moves}
        restart={handleRestart}
      />
      <div className="score">
        <span className="moves">{moves}</span>
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
