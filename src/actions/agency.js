import API from "../utils/api";
import {errorNotification, infoNotification} from "./notifications";
export const unshareRentPassport = values => async dispatch => {
  try {
    const response = await API.unshareRentPassport(values);
    dispatch(infoNotification(response));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};

export const fetchRentPassports = values => async dispatch => {
  const rentPassports = await API.getRentPassportsGroup(values).catch(error =>
    dispatch(errorNotification(error)),
  );

  return rentPassports;
};

export const removePendingRequest = values => async dispatch => {
  try {
    const response = await API.removePendingRequest(values);
    dispatch(infoNotification(response));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};

export const removeFromBranch = values => async dispatch => {
  try {
    const response = await API.removeRentPassportFromProperty(values);
    dispatch(infoNotification(response));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};

export const removeFromProperty = values => async dispatch => {
  try {
    const response = await API.deleteSharedPropertyByIds(values);
    dispatch(infoNotification(response));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};
