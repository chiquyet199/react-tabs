import {SHOW_PASSWORD, LOAD} from "./types";

export const showPassword = () => ({
  type: SHOW_PASSWORD,
});

export const load = data => ({type: LOAD, data});
