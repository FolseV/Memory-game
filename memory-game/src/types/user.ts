export enum difficulty {
  "easy",
  "medium",
  "hard",
}

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  suite: string;
  difficulty: difficulty;
}

export enum UserActionTypes {
  GET_USER = "GET_USER",
}

interface GetUserAction {
  type: UserActionTypes.GET_USER;
  payload: UserType;
}

export interface UserState {
  user: UserType;
}
export type UserAction = GetUserAction;
