import React from "react";
import classNames from "classnames";
import react from "../../img/cards/platforms/react.svg";
import "./Card.css";
import useTypedSelector from "../../hooks";

interface Props {
  onClick: any;
  card: any; // type Card
  index: number;
  isInactive: boolean;
  isFlipped: boolean;
  isDisabled: boolean;
}

const Card: React.FC<Props> = ({ onClick, card, index, isFlipped, isInactive, isDisabled }) => {
  const { user } = useTypedSelector((state) => state.user);

  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classNames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={user.suite} alt="react" />
      </div>
      <div className="card-face card-back-face">
        <img src={card?.image} alt="suite" />
      </div>
    </div>
  );
};

export default Card;
