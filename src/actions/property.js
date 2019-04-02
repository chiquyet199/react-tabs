import API from "../utils/api";
import {errorNotification} from "./notifications";
import {
  BRANCH_SELECTED,
  BRANCH_PROPERTIES_RECEIVED,
  CLEAR_BRANCH_PROPERTIES,
} from "./types";
import {extractBranch} from "../utils/properties";

// {params} contains branchId along with sort params
export const getPropertyList = params => async (dispatch, getState) => {
  let properties = [];
  try {
    properties = await API.getProperties(params);
    dispatch({
      type: BRANCH_SELECTED,
      data: extractBranch(getState().agencyBranches.items, properties),
    });
    dispatch({type: BRANCH_PROPERTIES_RECEIVED, data: properties});
  } catch (err) {
    dispatch(errorNotification(err));
  }

  return properties;
};

export const clearProperties = () => async dispatch => {
  dispatch({type: CLEAR_BRANCH_PROPERTIES});
};
