import {CLEAR_FIELDS, UPDATE_FIELDS} from "../actions/types";

const initialState = {
  values: {},
};

export default (state = initialState, {type, values}) => {
  switch (type) {
    case CLEAR_FIELDS:
      return {
        ...state,
        values: {},
      };
    case UPDATE_FIELDS:
      return {
        ...state,
        values: {
          ...state.values,
          ...values,
        },
      };
    default:
      return state;
  }
};
