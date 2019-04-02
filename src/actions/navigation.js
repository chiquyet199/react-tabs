import {goBack, push} from "connected-react-router";
import {openURL} from "../utils/helpers/linking";

export const back = () => dispatch => dispatch(goBack(1));
export const go = loc => (dispatch, getState) => {
  const state = getState();
  if (state.router.location.pathname !== loc) {
    dispatch(push(loc));
  }
};
export const mailto = email => () => openURL(`mailto:${email}`);
