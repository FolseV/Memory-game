export interface CardsType {
  type: string;
  image: any;
  matched: boolean;
}

export enum CardsActionTypes {
  FLIP_CARD = "FLIP_CARD",
  SET_OPEN_CARDS = "SET_OPEN_CARDS",
  SET_CLEARED_CARDS = "SET_CLEARED_CARDS",
  SET_MOVES = "SET_MOVES",
  RESET_MOVES = "RESET_MOVES",
  SET_SHOULD_DISABLE_ALL_CARDS = "SET_SHOULD_DISABLE_ALL_CARDS",
  SET_DIFFICULTY_EASY = "SET_DIFFICULTY_EASY",
  SET_DIFFICULTY_MEDIUM = "SET_DIFFICULTY_MEDIUM",
  SET_DIFFICULTY_HARD = "SET_DIFFICULTY_HARD",
}

interface FlipCardAction {
  type: CardsActionTypes.FLIP_CARD;
  payload: any;
}

interface SetOpenCardsAction {
  type: CardsActionTypes.SET_OPEN_CARDS;
  payload: number;
}

interface SetClearedCardsAction {
  type: CardsActionTypes.SET_CLEARED_CARDS;
  payload: any;
}

interface SetMovesAction {
  type: CardsActionTypes.SET_MOVES;
}

interface ResetMovesAction {
  type: CardsActionTypes.RESET_MOVES;
}

interface SetShouldDisableAllCardsAction {
  type: CardsActionTypes.SET_SHOULD_DISABLE_ALL_CARDS;
}

interface SetDifficultyEasyAction {
  type: CardsActionTypes.SET_DIFFICULTY_EASY;
}

interface SetDifficultyMediumAction {
  type: CardsActionTypes.SET_DIFFICULTY_MEDIUM;
}

interface SetDifficultyHardAction {
  type: CardsActionTypes.SET_DIFFICULTY_HARD;
}
export interface CardsState {
  //   id: string;
  cards: CardsType[];
  openCards: number[];
  clearedCards: string[];
  moves: number;
  bestScore: number;
  numberOfCards: number;
  shouldDisableAllCards: boolean;
}

export type CardsAction =
  | FlipCardAction
  | SetOpenCardsAction
  | SetClearedCardsAction
  | SetMovesAction
  | ResetMovesAction
  | SetShouldDisableAllCardsAction
  | SetDifficultyEasyAction
  | SetDifficultyMediumAction
  | SetDifficultyHardAction;
