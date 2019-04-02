import {UPDATE_GLOBAL_THEME} from "../actions/types";

const initialState = "light";

export default (state = initialState, {type, globaltheme}) => {
  switch (type) {
    case UPDATE_GLOBAL_THEME:
      return globaltheme;
    default:
      return state;
  }
};
