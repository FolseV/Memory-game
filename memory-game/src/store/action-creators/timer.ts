import { TimerActionTypes } from "../../types/timer";

export const startTimer = () => {
  return { type: TimerActionTypes.START_TIMER };
};

export const stopTimer = () => {
  return { type: TimerActionTypes.STOP_TIMER };
};

export const resetTimer = () => {
  return { type: TimerActionTypes.RESET_TIMER };
};

export const readTime = (time: number) => {
  return { type: TimerActionTypes.READ_TIMER, payload: time };
};
