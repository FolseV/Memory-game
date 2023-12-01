import { TimerAction, TimerActionTypes, TimerState } from "../../types/timer";

const initialState: TimerState = {
  toggleTimer: false,
  time: 0,
  resetTimerToggle: false,
};

export const timerReducer = (state = initialState, action: TimerAction): TimerState => {
  switch (action.type) {
    case TimerActionTypes.START_TIMER:
      return { ...state, toggleTimer: true };
    case TimerActionTypes.STOP_TIMER:
      return { ...state, toggleTimer: false };
    case TimerActionTypes.RESET_TIMER:
      return { ...state, resetTimerToggle: state.resetTimerToggle ? false : true };
    case TimerActionTypes.READ_TIMER:
      return { ...state, time: action.payload };
    default:
      return { ...state };
  }
};
