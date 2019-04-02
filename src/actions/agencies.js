import API from "../utils/api";
import {errorNotification} from "./notifications";
import {GET_AGENCY_BRANCHES, SELECT_AGENCY_TYPE} from "./types";
import {push} from "connected-react-router";

export const getAgencyBranches = branches => ({
  type: GET_AGENCY_BRANCHES,
  value: branches,
});

export const fetchAgencyBranches = agencyId => async dispatch => {
  let branches;
  try {
    branches = await API.getAgencyBranches(agencyId);
  } catch (error) {
    dispatch(errorNotification(error));
  }

  if (branches) {
    dispatch(getAgencyBranches(branches));
  }

  return branches;
};

export const createNewBranch = (newBranch, user) => async dispatch => {
  const branch = newBranch;
  branch.agencyId = user.agencyId;

  try {
    await API.createBranch(branch);
    dispatch(push("/branch/created"));
  } catch ({error}) {
    dispatch(errorNotification(error));
  }
};

export const selectAgencyType = type => ({
  type: SELECT_AGENCY_TYPE,
  value: type,
});
