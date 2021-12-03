export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  suite: string;
  difficulty: string;
}

export enum UserActionTypes {
  GET_USER = "GET_USER",
}

interface GetUserAction {
  type: UserActionTypes.GET_USER;
  payload: any;
}

export interface UserState {
  user: UserType;
}
export type UserAction = GetUserAction;
