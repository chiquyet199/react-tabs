import {HIDE_SPINNER, SHOW_SPINNER} from "../actions/types";

const initialState = false;

export default (state = initialState, {type}) => {
  switch (type) {
    case SHOW_SPINNER:
      return true;
    case HIDE_SPINNER:
      return false;
    default:
      return state;
  }
};
