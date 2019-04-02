import {
  INFO_NOTIFICATION,
  ERROR_NOTIFICATION,
  WARNING_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from "../actions/types";

const initialState = {
  type: null,
  message: "",
};

export default (state = initialState, {type, message}) => {
  switch (type) {
    case ERROR_NOTIFICATION:
      return {
        type: "error",
        icon: "error",
        message: message || "",
      };
    case INFO_NOTIFICATION:
      return {
        type: "info",
        icon: "tick",
        message,
      };
    case WARNING_NOTIFICATION:
      return {
        type: "warning",
        icon: "error",
        message,
      };
    case CLEAR_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};
