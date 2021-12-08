import { ThemeAction, ThemeActionTypes, ThemeState } from "../../types/theme";

const initialState: ThemeState = {
  theme: true,
};

export const themeReducer = (state = initialState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case ThemeActionTypes.CHANGE_THEME:
      return { theme: state.theme ? false : true };

    default:
      return state;
  }
};
