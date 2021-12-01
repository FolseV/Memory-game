import { CardsState, CardsAction, CardsActionTypes } from "../../types/cards";
import angular from "../../img/cards/platforms/angular.svg";
import aurelia from "../../img/cards/platforms/aurelia.svg";
import backbone from "../../img/cards/platforms/backbone.svg";
import ember from "../../img/cards/platforms/ember.svg";
import jsbadge from "../../img/cards/platforms/js-badge.svg";
import vue from "../../img/cards/platforms/vue.svg";
import react from "../../img/1200px-React-icon.svg.png";
import { v4 as uuidv4, v4 } from "uuid";

const initialState: CardsState = {
  cards: [
    {
      id: v4(),
      type: "angular",
      image: angular,
      matched: false,
    },
    {
      id: v4(),
      type: "aurelia",
      image: aurelia,
      matched: false,
    },
    {
      id: v4(),
      type: "backbone",
      image: backbone,
      matched: false,
    },
    {
      id: v4(),
      type: "ember",
      image: ember,
      matched: false,
    },
    {
      id: v4(),
      type: "jsbadge",
      image: jsbadge,
      matched: false,
    },
    {
      id: v4(),
      type: "vue",
      image: vue,
      matched: false,
    },
    // {
    //   id: 6,
    //   type: "react",
    //   image: react,
    // },
  ],
  openCards: [],
  clearedCards: [],
  moves: 0,
  bestScore: 0,
  numberOfCards: 12,
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
      return { ...state, numberOfCards: 12 };
    case CardsActionTypes.SET_DIFFICULTY_MEDIUM:
      return {
        ...state,
        numberOfCards: 24,
      };
    case CardsActionTypes.SET_DIFFICULTY_HARD:
      return {
        ...state,
        numberOfCards: 36,
      };
    default:
      return state;
  }
};
