import API from "../utils/api";
import {GET_USER, GET_USER_PREFERENCES} from "./types";
import {errorNotification} from "./notifications";
import {storeUser} from "./auth";

export const getUser = user => ({
  type: GET_USER,
  user,
});

export const getUserPreferences = userPreferences => ({
  type: GET_USER_PREFERENCES,
  userPreferences,
});

export const fetchUserById = userId => async dispatch => {
  try {
    const user = await API.getUserById(userId);
    dispatch(getUser(user));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};

export const updateCurrentUser = user => async dispatch => {
  try {
    const updatedUser = await API.updateUser(user);
    dispatch(storeUser(updatedUser));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};

export const getUserNotificationPreferences = userId => async dispatch => {
  try {
    const unp = await API.getUserNotificationPreferences(userId);
    dispatch(getUserPreferences(unp.notificationPreferences));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};

export const updateUserNotificationPreferences = preferences => async dispatch => {
  try {
    const unp = await API.updateUserNotificationPreferences(preferences);
    dispatch(getUserPreferences(unp));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};
