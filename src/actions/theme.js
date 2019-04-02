import {UPDATE_GLOBAL_THEME} from "./types";

export const updateTheme = globaltheme => ({
  type: UPDATE_GLOBAL_THEME,
  globaltheme,
});
