import { CardsActionTypes } from "../../types/cards";

export const SetDifEasy = () => {
  return { type: CardsActionTypes.SET_DIFFICULTY_EASY };
};

export const SetDifMedium = () => {
  return { type: CardsActionTypes.SET_DIFFICULTY_MEDIUM };
};

export const SetDifHard = () => {
  return { type: CardsActionTypes.SET_DIFFICULTY_HARD };
};

export const setOpenCards = (index: number | null) => {
  return { type: CardsActionTypes.SET_OPEN_CARDS, payload: index };
};

export const setClearedCards = (card: string | null) => {
  return {
    type: CardsActionTypes.SET_CLEARED_CARDS,
    payload: card,
  };
};

export const setMoves = () => {
  return { type: CardsActionTypes.SET_MOVES };
};

export const resetMoves = () => {
  return { type: CardsActionTypes.RESET_MOVES };
};

export const setShouldDisableAllCards = () => {
  return { type: CardsActionTypes.SET_SHOULD_DISABLE_ALL_CARDS };
};
