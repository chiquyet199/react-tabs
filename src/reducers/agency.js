import {STORE_INITIAL_VALUES} from "../actions/types";

const initialState = {
  initialSettingsValues: {},
};

export default (state = initialState, {type, values}) => {
  switch (type) {
    case STORE_INITIAL_VALUES:
      return {
        ...state,
        initialSettingsValues: values,
      };
    default:
      return state;
  }
};
