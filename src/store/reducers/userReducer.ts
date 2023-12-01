import { difficulty, UserAction, UserActionTypes, UserState } from "../../types/user";
import react from "../../img/cards/platforms/react.svg";

const initialState: UserState = {
  user: {
    firstName: "string",
    lastName: "string",
    email: "string",
    suite: react,
    difficulty: difficulty.easy,
  },
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.GET_USER:
      return { ...state, user: action.payload };
    default:
      return { ...state };
  }
};
