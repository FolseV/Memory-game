import React, { useState } from "react";
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

const uniqueCardsArray = [
  {
    type: "angular",
    // image: require("../../img/cards/platforms/angular.svg"),
    image: angular,
  },
  {
    type: "aurelia",
    // image: require("../../img/cards/platforms/aurelia.svg"),
    image: aurelia,
  },
  {
    type: "backbone",
    // image: require("../../img/cards/platforms/backbone.svg"),
    image: backbone,
  },
  {
    type: "ember",
    // image: require("../../img/cards/platforms/ember.svg"),
    image: ember,
  },
  {
    type: "jsbadge",
    // image: require("../../img/cards/platforms/js-badge.svg"),
    image: jsbadge,
  },
  {
    type: "vue",
    // image: require("../../img/cards/platforms/vue.svg"),
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

  const handleCardClick = () => {
    //smth
  };

  return (
    <div className="memory-game">
      <header>
        <h1>Play memory game</h1>
        <p>Rules</p>
      </header>
      <div className="memory-card">
        {cards.map((card, index) => {
          return <Card key={index} card={card} index={index} onClick={handleCardClick} />;
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
