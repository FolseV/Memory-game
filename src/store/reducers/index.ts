import { combineReducers } from "redux";
import { cardsReducer } from "./cardsReducer";
import { themeReducer } from "./themeReducer";
import { timerReducer } from "./timerReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  cards: cardsReducer,
  user: userReducer,
  timer: timerReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
