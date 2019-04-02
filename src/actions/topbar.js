import {
  HIDE_TOPBAR,
  SHOW_TOPBAR,
  HIDE_TOPBAR_BTN,
  SHOW_TOPBAR_BTN,
  UPDATE_TOPBAR_BTN,
  SHOW_TOPBAR_CENTER_TEXT,
  HIDE_TOPBAR_CENTER_TEXT,
  SHOW_TOPBAR_LEFT_TEXT,
  HIDE_TOPBAR_LEFT_TEXT,
  HIDE_BACK_BUTTON,
  SHOW_BACK_BUTTON,
} from "./types";

export const hideTopbar = () => ({
  type: HIDE_TOPBAR,
});

export const showTopbar = () => ({
  type: SHOW_TOPBAR,
});

export const hideTopbarButton = () => ({
  type: HIDE_TOPBAR_BTN,
});

export const showTopbarButton = () => ({
  type: SHOW_TOPBAR_BTN,
});

export const updateTopbarButton = (
  showBtnBool,
  btnText,
  onClick,
  btnType = "transparent_green",
  btnIcon,
) => ({
  type: UPDATE_TOPBAR_BTN,
  showBtnBool,
  btnText,
  onClick,
  btnType,
  btnIcon,
});

export const showTopbarCenterText = centerText => ({
  type: SHOW_TOPBAR_CENTER_TEXT,
  centerText,
});

export const hideTopbarCenterText = () => ({
  type: HIDE_TOPBAR_CENTER_TEXT,
});

export const showTopbarLeftText = leftText => ({
  type: SHOW_TOPBAR_LEFT_TEXT,
  leftText,
});

export const hideTopbarLeftText = () => ({
  type: HIDE_TOPBAR_LEFT_TEXT,
});

export const hideTopbarBackButton = () => ({
  type: HIDE_BACK_BUTTON,
});

export const showTopbarBackButton = () => ({
  type: SHOW_BACK_BUTTON,
});
