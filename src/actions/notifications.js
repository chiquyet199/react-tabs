import {
  INFO_NOTIFICATION,
  ERROR_NOTIFICATION,
  WARNING_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from "./types";
import {sleep} from "../utils/common";
import {loggedOut} from "./auth";

export const clearNotification = {
  type: CLEAR_NOTIFICATION,
};

export const expireNotification = async dispatch => {
  await sleep(3000);

  dispatch(clearNotification);
};

export const infoNotification = message => dispatch => {
  dispatch({
    type: INFO_NOTIFICATION,
    message,
  });

  expireNotification(dispatch);
};

export const errorNotification = error => dispatch => {
  if (error && error.status === 401) {
    dispatch(loggedOut());
  } else {
    dispatch({
      type: ERROR_NOTIFICATION,
      message: error.message,
    });
    expireNotification(dispatch);
  }
};

export const warningNotification = message => dispatch => {
  dispatch({
    type: WARNING_NOTIFICATION,
    message,
  });

  expireNotification(dispatch);
};
