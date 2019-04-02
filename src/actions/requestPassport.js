import {errorNotification} from "../actions/notifications";
import {
  GET_RENT_PASSPORTS,
  STORE_PASSPORT,
  SET_BRANCH_RENT_PASSPORTS,
  RENT_PASSPORT_IS_ALREADY_SHARED,
  STORE_PASSPORT_CHECKLIST,
  RESET_CHECKED_PASSPORTS,
} from "./types";
import {
  removePendingPassportRequest,
  removeSharedPassport,
} from "../utils/api/rentPassport";
import {push} from "connected-react-router";
import API from "../utils/api";

export const checkForPassports = searchValue => async dispatch => {
  const passports = await API.searchRentPassports(searchValue).catch(
    ({error}) => dispatch(errorNotification(error)),
  );

  if (passports && passports.success) {
    dispatch(getPassports(passports.data));
  }
};

export const getPassports = passports => ({
  type: GET_RENT_PASSPORTS,
  passports,
});

export const sendRentPassportRequest = values => async dispatch => {
  storePassport(values);
  const invite = await API.inviteToSharePassport({
    emails: [values.email],
    branchId: values.branchId,
  }).catch(({error}) => dispatch(errorNotification(error)));
  if (invite && invite.status === "PENDING") {
    dispatch(push("/rent-passport-requested"));
  } else if (invite && invite.data.status === "SHARED") {
    push("/rent-passport-shared");
  }
};

export const storePassport = passport => ({
  type: STORE_PASSPORT,
  passport,
});

/**
 * cannot integrate it to the backend at the moment, so to test it:
 * - swap "email" passed from BranchRequestRentPassports's "values" to "search", same applies to function below
 * - put https://5b927fd14c818e001456e967.mockapi.io/ in your .env as BASE_URL
 * - in api/agency.js edit getRentPassportGroups to use "/rent-passports" path
 *
 */

export const requestRentPassportByEmail = ({
  branchId,
  email,
}) => async dispatch => {
  // send a request which fetches all rent passports
  const allPassports = await API.getRentPassportsGroup({
    branchId,
    email,
  }).catch(({error}) => dispatch(errorNotification(error)));

  if (allPassports) {
    dispatch(setAllPassports(allPassports));
  }
};

export const setAllPassports = allPassports => ({
  type: SET_BRANCH_RENT_PASSPORTS,
  allPassports,
});

export const checkIfPassportIsAlreadyShared = ({
  branchId,
  emails,
  status,
}) => async dispatch => {
  const alreadySharedRentPassports = await API.getRentPassportsGroup({
    branchId,
    emails,
    status,
  }).catch(({error}) => dispatch(errorNotification(error)));
  if (alreadySharedRentPassports && alreadySharedRentPassports.length) {
    dispatch({type: RENT_PASSPORT_IS_ALREADY_SHARED});
  }
};

export const addPassportsToShare = passport => ({
  type: STORE_PASSPORT_CHECKLIST,
  passport,
});

export const resetCheckedPassport = () => ({
  type: RESET_CHECKED_PASSPORTS,
});

export const deletePassportsFromProperty = (
  passportsSelected,
  id,
) => async dispatch => {
  const remove = await removeSharedPassport(passportsSelected).catch(
    ({error}) => dispatch(errorNotification(error)),
  );

  if (remove) {
    dispatch(checkForPassports(id));
  }
};

export const deletePendingPassportRequest = (
  passportsSelected,
  id,
) => async dispatch => {
  const remove = await removePendingPassportRequest(passportsSelected).catch(
    ({error}) => dispatch(errorNotification(error)),
  );

  if (remove) {
    dispatch(checkForPassports(id));
  }
};
