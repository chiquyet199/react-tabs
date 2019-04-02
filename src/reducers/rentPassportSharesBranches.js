import {
  RENT_PASSPORTS_SHARES_RECEIVED,
  UNSHARE_PASSPORT,
} from "../actions/types";

const initialState = {
  shared_properties: [],
  shared_branches: [],
  pending_requests: [],
};

export default (state = initialState, {type, data}) => {
  switch (type) {
    case RENT_PASSPORTS_SHARES_RECEIVED:
      return {
        ...data,
      };
    case UNSHARE_PASSPORT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
