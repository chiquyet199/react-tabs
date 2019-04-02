import {SHOW_MENU, HIDE_MENU} from "./types";

export const showMenu = () => ({
  type: SHOW_MENU,
});

export const hideMenu = () => ({
  type: HIDE_MENU,
});
