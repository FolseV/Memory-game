import { ThemeActionTypes } from "../../types/theme";

export const changeTheme = () => {
  return { type: ThemeActionTypes.CHANGE_THEME };
};
