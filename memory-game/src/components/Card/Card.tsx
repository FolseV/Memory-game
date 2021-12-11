import React from "react";
// import classNames from "classnames";
import classNames from "classnames/bind";
import styles from "./Card.module.css";
import useTypedSelector from "../../hooks";
import { CardsType } from "../../types/cards";

let cx = classNames.bind(styles);

interface Props {
  onClick: (arg: number) => void;
  card: CardsType;
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
      className={cx({
        card: true,
        isFlipped: isFlipped,
        isInactive: isInactive,
      })}
      onClick={handleClick}
    >
      <div
        className={cx({
          cardFace: true,
        })}
      >
        <img src={user.suite} alt="frontFace" />
      </div>
      <div
        className={cx({
          cardFace: true,
          cardBackFace: true,
        })}
      >
        <img src={card?.image} alt="backFace" />
      </div>
    </div>
  );
};

export default React.memo(Card);
