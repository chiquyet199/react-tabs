import {SHOW_PASSWORD, LOAD} from "../actions/types";

const initialState = {
  showPassword: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PASSWORD:
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    case LOAD:
      return {
        data: action.data,
      };
    default:
      return state;
  }
};
