import { CardsState, CardsAction, CardsActionTypes } from "../../types/cards";
import { easy, hard, medium } from "../../data/data";

const initialState: CardsState = {
  cards: easy,
  openCards: [],
  clearedCards: [],
  moves: 0,
  shouldDisableAllCards: false,
};

export const cardsReducer = (state = initialState, action: CardsAction): CardsState => {
  switch (action.type) {
    case CardsActionTypes.FLIP_CARD:
      return { ...state };
    case CardsActionTypes.SET_OPEN_CARDS:
      if (action.payload === null) {
        return { ...state, openCards: [] };
      }
      return { ...state, openCards: state.openCards.concat(action.payload) };
    case CardsActionTypes.SET_CLEARED_CARDS:
      if (action.payload === null) {
        return { ...state, clearedCards: [] };
      }
      return { ...state, clearedCards: state.clearedCards.concat(action.payload) };

    case CardsActionTypes.SET_MOVES:
      return { ...state, moves: state.moves + 1 };
    case CardsActionTypes.RESET_MOVES:
      return { ...state, moves: 0 };
    case CardsActionTypes.SET_SHOULD_DISABLE_ALL_CARDS:
      return { ...state, shouldDisableAllCards: state.shouldDisableAllCards ? false : true };

    case CardsActionTypes.SET_DIFFICULTY_EASY:
      return { ...state, cards: easy };
    case CardsActionTypes.SET_DIFFICULTY_MEDIUM:
      return {
        ...state,
        cards: medium,
      };
    case CardsActionTypes.SET_DIFFICULTY_HARD:
      return {
        ...state,
        cards: hard,
      };
    default:
      return state;
  }
};
