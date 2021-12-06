import { combineReducers } from "redux";
import { cardsReducer } from "./cardsReducer";
import { timerReducer } from "./timerReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  cards: cardsReducer,
  user: userReducer,
  timer: timerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
