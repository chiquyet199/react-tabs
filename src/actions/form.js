import {AsyncStorage} from "react-native";
import {
  CLEAR_FIELDS,
  UPDATE_FIELDS,
  POSTCODE_LOOKUP_RESULT,
  POSTCODE_CLEAR_RESULT,
} from "./types";
import {loginSuccess, preActivationLogin} from "./auth";
import {updateProgress, clearProgress} from "./progress";
import {push} from "connected-react-router";
import API from "../utils/api";
import {errorNotification} from "./notifications";
import {getRentPassport} from "./rent-passport";

export const updateFields = values => ({
  type: UPDATE_FIELDS,
  values,
});

export const clearFields = () => ({
  type: CLEAR_FIELDS,
});

export const postcodeLookupResult = values => ({
  type: POSTCODE_LOOKUP_RESULT,
  values,
});

export const postcodeClearResult = () => ({
  type: POSTCODE_CLEAR_RESULT,
});

export const next = ({values, nextLoc}) => dispatch => {
  dispatch(updateFields(values));
  dispatch(push(nextLoc));
};

export const cancel = () => dispatch => {
  dispatch(clearFields());
  dispatch(push("/welcome"));
};

export const registerUser = ({values, nextLoc}) => async dispatch => {
  const user = await API.registerUser(values).catch(({error}) =>
    dispatch(errorNotification(error)),
  );

  if (user) {
    await AsyncStorage.setItem("preActivationData", JSON.stringify(user));
    dispatch(preActivationLogin(user));
    dispatch(push(nextLoc));
    dispatch(updateProgress(0));
  }
};

export const registerUserProfile = ({values, nextLoc}) => async dispatch => {
  const user = await API.registerUserProfile(values).catch(({error}) =>
    dispatch(errorNotification(error)),
  );

  if (user) {
    dispatch(loginSuccess(user));
    dispatch(push(nextLoc));
    dispatch(updateProgress(0));
  }
};

export const generateRentPassport = ({values, nextLoc}) => async dispatch => {
  const rentPassport = await API.generateRentPassport(values).catch(({error}) =>
    dispatch(errorNotification(error)),
  );

  if (rentPassport) {
    dispatch(getRentPassport(rentPassport));
    dispatch(push(nextLoc));
  }
};

export const lookupAddress = (postcode, countryCode) => async dispatch => {
  const addresses = await API.postcodeLookup(postcode, countryCode).catch(
    error => {
      dispatch(errorNotification(error));
    },
  );
  dispatch(postcodeLookupResult(addresses));
};

export const createReferenceRequest = ({values, nextLoc}) => async dispatch => {
  const referenceRequest = await API.createReferenceReq(values).catch(
    ({error}) => dispatch(errorNotification(error)),
  );
  if (referenceRequest) {
    dispatch(push(nextLoc));
    dispatch(updateProgress(0));
  }
};

export const inviteUser = values => async dispatch => {
  const _values = {...values};
  const branches = [];

  Object.keys(values).forEach(k => {
    if (k.indexOf("branch_") === 0) {
      if (values[k]) {
        branches.push(k.substr(7));
      }
      delete _values[k];
    }
  });

  _values.branches = branches;

  const invitation = await API.inviteUser(_values).catch(({error}) =>
    dispatch(errorNotification(error)),
  );
  if (invitation) {
    dispatch(push("/invite-user/success"));
    dispatch(updateProgress(0));
  }
};

export const createRentPassport = (values, nextLoc) => async dispatch => {
  const result = await API.storeRentPassportData(values).catch(error => {
    dispatch(errorNotification(error));
  });

  if (result) {
    dispatch(clearProgress());
    if (nextLoc) {
      dispatch(push(nextLoc));
    }
  }
};
