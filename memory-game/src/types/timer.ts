export enum TimerActionTypes {
  START_TIMER = "START_TIMER",
  STOP_TIMER = "STOP_TIMER",
  RESET_TIMER = "RESET_TIMER",
  READ_TIMER = "READ_TIMER",
}

interface StartTimerAction {
  type: TimerActionTypes.START_TIMER;
}

interface StopTimerAction {
  type: TimerActionTypes.STOP_TIMER;
}

interface ResetTimerAction {
  type: TimerActionTypes.RESET_TIMER;
}

interface ReadTimeAction {
  type: TimerActionTypes.READ_TIMER;
  payload: number;
}

export interface TimerState {
  toggleTimer: boolean;
  time: number;
  resetTimerToggle: boolean;
}

export type TimerAction = StartTimerAction | StopTimerAction | ResetTimerAction | ReadTimeAction;
