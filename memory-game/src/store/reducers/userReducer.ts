import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
  user: {
    firstName: "string",
    lastName: "string",
    email: "string",
    suite: "string",
    difficulty: "string",
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
