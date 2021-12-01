import * as CardsActionCreators from "./cards";
import * as UserActionCreators from "./user";

const ActionCreators = {
  ...CardsActionCreators,
  ...UserActionCreators,
};

export default ActionCreators;
