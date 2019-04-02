import {UPDATE_SELECTED_BRANCH} from "./types";
import {errorNotification} from "./notifications";

export const updateSelectedBranch = newSelectedBranch => ({
  type: UPDATE_SELECTED_BRANCH,
  newSelectedBranch,
});

export const changeSelectedBranch = newSelectedBranch => (
  dispatch,
  getState,
) => {
  const {branches} = getState();
  if (branches.ids.includes(newSelectedBranch)) {
    dispatch(updateSelectedBranch(newSelectedBranch));
  } else {
    dispatch(errorNotification("Requested branch not available"));
  }
};
