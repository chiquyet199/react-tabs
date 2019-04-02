import {
  LOGIN,
  LOGOUT,
  LOGIN_FACEBOOK,
  PRE_ACTIVATION_LOGIN,
  SET_LANDING_PATH,
  STORE_USER,
} from "./types";
import {push} from "connected-react-router";
import store from "../utils/store/store";

import API from "../utils/api";
import {errorNotification, infoNotification} from "./notifications";
import {updateProgress} from "./progress";
import {AsyncStorage} from "react-native";
import {setToken, unsetToken} from "../utils/api/api";
import {deleteRentPassport} from "./rent-passport";
import {go} from "./navigation";

const next = () => dispatch => {
  dispatch(push("/sign-in"));
  dispatch(updateProgress(0));
};

export const storeUser = user => ({
  type: STORE_USER,
  user,
});

export const setLandingPath = path => ({
  type: SET_LANDING_PATH,
  path,
});

export const login = values => async dispatch => {
  const loginAttempt = await API.login(values).catch(error => {
    dispatch(
      errorNotification((error && error.error) || "A problem has occurred"),
    );
  });

  return loginAttempt;
};

export const agentLogin = values => async dispatch => {
  const loginAttempt = await API.agentLogin(values).catch(error => {
    dispatch(
      errorNotification((error && error.error) || "A problem has occurred"),
    );
  });

  return loginAttempt;
};

export const loginSuccess = responseData => ({
  type: LOGIN,
  ...responseData,
});

export const preActivationLogin = responseData => ({
  type: PRE_ACTIVATION_LOGIN,
  payload: {...responseData},
});

export const logout = () => ({
  type: LOGOUT,
});

const storeAccessToken = user => ({
  type: LOGIN_FACEBOOK,
  user,
});

const loggedIn = (response, reLoginFromStorage) => {
  return async dispatch => {
    if (response.token) {
      setToken(response.token);
      dispatch(loginSuccess(response));
      if (!reLoginFromStorage) {
        await storeLoginData(response);
      }
    } else {
      dispatch(errorNotification(new Error("token not available")));
    }
  };
};

const loggedOut = () => dispatch => {
  unsetToken();
  clearLoginData();
  dispatch(deleteRentPassport());
  dispatch(logout());
  dispatch(go("/"));
};

// Required for tests to be able to mock
// the correct reference to these functions
exports.loggedIn = loggedIn;
exports.loggedOut = loggedOut;

export const checkPreVerificationLogin = () => async dispatch => {
  const data = await AsyncStorage.getItem("preActivationData");
  if (data) {
    dispatch(preActivationLogin(JSON.parse(data)));
  } else {
    dispatch(go("/welcome"));
  }
};

export const checkLoggedIn = (redirect = true, landingPath) => async (
  dispatch,
  getState,
) => {
  const {
    auth: {landingPath: landingPathState},
    locale: {translations: login_problem_recovering_last_session},
  } = getState();
  try {
    if (!landingPathState && landingPath) {
      dispatch(setLandingPath(landingPath));
    }

    const loginDataRaw = await AsyncStorage.getItem("loginData");
    if (loginDataRaw) {
      const loginData = JSON.parse(loginDataRaw);
      if (loginData.expires > new Date().getTime() / 1000) {
        // Required to use exported function reference for tests
        dispatch(exports.loggedIn(loginData, true));
      } else {
        // Required to use exported function reference for tests
        dispatch(exports.loggedOut());
      }
    } else if (redirect) {
      dispatch(go("/welcome"));
    }
  } catch (error) {
    dispatch(
      errorNotification(new Error(login_problem_recovering_last_session)),
    );
    dispatch(loggedOut());
  }
};

export const loginWithFacebook = value => async dispatch => {
  const facebookAccessToken = {
    provider: "FACEBOOK",
    token: value,
  };
  const loginAttempt = await API.facebookLoginAttempt(
    facebookAccessToken,
  ).catch(error => {
    dispatch(errorNotification(error.error));
  });

  switch (loginAttempt && loginAttempt.code) {
    case "unverified-user":
      dispatch(push("/verify-email"));
      break;
    case "invalid-credentials":
      dispatch(push("/welcome"));
      dispatch(errorNotification(loginAttempt.message));
      break;
    case "unknown-user":
      dispatch(storeAccessToken(facebookAccessToken));
      dispatch(push("/TermsAndConditions"));
      break;
    default:
      break;
  }

  if (loginAttempt && loginAttempt.success) {
    dispatch(push("/Dashboard"));
  }
};

export const registerUserFacebook = ({value, nextLoc}) => async dispatch => {
  const user = await API.registerUserFacebook(value).catch(({error}) =>
    dispatch(errorNotification(error)),
  );

  if (user) {
    dispatch(push(nextLoc));
  }
};

export const requestVerifyEmail = ({userId, email}) => async dispatch => {
  const {
    locale: {translations},
  } = store.getState();
  const result = await API.requestVerifyEmail(userId).catch(err =>
    dispatch(errorNotification(err.error)),
  );

  if (result) {
    dispatch(
      infoNotification(
        `${translations.emailSentTo} ${email}. ${
          translations.verifyEmail_tap_link
        }`,
      ),
    );
    next(dispatch);
  }
};

const storeLoginData = async response => {
  try {
    await AsyncStorage.setItem("loginData", JSON.stringify(response));
  } catch (error) {
    // Error saving data, should not happen
  }
};

const clearLoginData = async () => {
  try {
    await AsyncStorage.removeItem("loginData");
  } catch (error) {
    // Error saving data, should not happen
  }
};
