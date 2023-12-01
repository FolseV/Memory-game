import { UserActionTypes, UserType } from "../../types/user";

export const getUser = (user: UserType) => {
  return { type: UserActionTypes.GET_USER, payload: user };
};
