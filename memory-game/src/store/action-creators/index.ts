import * as CardsActionCreators from "./cards";
import * as UserActionCreators from "./user";
import * as TimerActionCreators from "./timer";

const ActionCreators = {
  ...CardsActionCreators,
  ...UserActionCreators,
  ...TimerActionCreators,
};

export default ActionCreators;
