import {GET_RENT_PASSPORT, DELETE_RENT_PASSPORT} from "../actions/types";

const initialState = null;

export default (state = initialState, {type, rentPassport}) => {
  switch (type) {
    case GET_RENT_PASSPORT:
      return rentPassport.status;
    case DELETE_RENT_PASSPORT:
      return initialState;
    default:
      return state;
  }
};
