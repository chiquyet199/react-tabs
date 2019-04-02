import API from "../utils/api";
import {infoNotification, errorNotification} from "./notifications";
import {showSpinner, hideSpinner} from "./spinner";
import {RENT_PASSPORTS_SHARES_RECEIVED} from "./types";
import {convert} from "../utils/RentPassportSharesConvertor";

export const sharePropertyRentPassport = groupId => async dispatch => {
  try {
    await API.sharePropertyRentPassport(groupId);
    dispatch(infoNotification("Rent passport has been shared"));
    getSharedBranches()(dispatch);
  } catch (error) {
    dispatch(errorNotification(error));
  }
};

export const unsharePassport = params => async dispatch => {
  try {
    await API.deleteBranch(params);
    dispatch(infoNotification("Rent passport sharing has been stopped"));
    getSharedBranches()(dispatch);
  } catch (error) {
    dispatch(errorNotification(error));
  }
};

export const getSharedBranches = () => async dispatch => {
  dispatch(showSpinner());
  try {
    const rentPassportShares = await API.getRentPassportShares();
    dispatch({
      type: RENT_PASSPORTS_SHARES_RECEIVED,
      data: convert(rentPassportShares),
    });
  } catch (error) {
    dispatch(errorNotification(error));
  }
  dispatch(hideSpinner());
};
