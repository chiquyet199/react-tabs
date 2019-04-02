import {UPLOAD_IMAGE, REMOVE_IMAGE} from "../actions/types";

const initialState = {
  accepted: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {...state, accepted: action.image};
    case REMOVE_IMAGE:
      return {...state, accepted: [...action.image]};
    default:
      return state;
  }
};
