import {UPDATE_PROGRESS, CLEAR_PROGRESS} from "../actions/types";

const initialState = 0;

export default (state = initialState, {type, progress}) => {
  switch (type) {
    case CLEAR_PROGRESS:
      return 0;
    case UPDATE_PROGRESS:
      return progress;
    default:
      return state;
  }
};
