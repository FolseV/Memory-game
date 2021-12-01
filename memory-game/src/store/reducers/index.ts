import { combineReducers } from "redux";
import { cardsReducer } from "./cardsReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  cards: cardsReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
