import React from "react";
import react from "../../img/cards/platforms/react.svg";

interface Props {
  onClick: any;
  card: any; // type Card
  index: number;
}

// const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
const Card: React.FC<Props> = ({ onClick, card, index }) => {
  const handleClick = () => {
    // !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div>
      <div className="card-face">
        <img src={react} alt="react" />
      </div>
      <div className="card-face">
        <img src={card?.image} alt="suite" />
      </div>
    </div>
  );
};

export default Card;
