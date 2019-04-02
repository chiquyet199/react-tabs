import {SHOW_MODAL, HIDE_MODAL} from "../actions/types";

const initialState = {
  open: false,
  modalContent: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        open: true,
        modalContent: action.modalContent,
      };
    case HIDE_MODAL:
      return {
        ...state,
        open: false,
        modalContent: {},
      };
    default:
      return state;
  }
};
