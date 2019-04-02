import {GET_AGENCY_BRANCHES, SELECT_AGENCY_TYPE} from "../actions/types";

const initialState = {
  branches: [],
};

export default (state = initialState, {type, value}) => {
  switch (type) {
    case GET_AGENCY_BRANCHES:
      return {
        ...state,
        branches: value,
      };
    case SELECT_AGENCY_TYPE:
      return {
        ...state,
        agencyType: value,
      };
    default:
      return state;
  }
};
