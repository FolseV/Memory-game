import * as CardsActionCreators from "./cards";
import * as UserActionCreators from "./user";
import * as TimerActionCreators from "./timer";
import * as ThemeActionCreators from "./theme";

const ActionCreators = {
  ...CardsActionCreators,
  ...UserActionCreators,
  ...TimerActionCreators,
  ...ThemeActionCreators,
};

export default ActionCreators;
