import {STORE_PHOTO, STORE_BACK_PHOTO} from "../actions/types";

const initialState = 0;

export default (state = initialState, {type, photo}) => {
  switch (type) {
    case STORE_PHOTO:
      return {...state, rightToRentPhoto: photo};
    case STORE_BACK_PHOTO:
      return {...state, rightToRentPhotoBack: photo};
    default:
      return state;
  }
};
