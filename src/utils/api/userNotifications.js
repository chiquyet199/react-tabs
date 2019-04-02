import {get, post} from "./api";

export const getUserNotificationPreferences = userId =>
  get("/preferences", {userId});

export const updateUserNotificationPreferences = notificationPreferences =>
  post("/preferences", {notificationPreferences});
