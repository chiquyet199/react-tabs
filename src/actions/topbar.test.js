import {
  hideTopbar,
  showTopbar,
  hideTopbarButton,
  showTopbarButton,
  updateTopbarButton,
  showTopbarBackButton,
  hideTopbarBackButton,
} from "../actions/topbar";
import {
  HIDE_TOPBAR,
  SHOW_TOPBAR,
  HIDE_TOPBAR_BTN,
  SHOW_TOPBAR_BTN,
  UPDATE_TOPBAR_BTN,
  HIDE_BACK_BUTTON,
  SHOW_BACK_BUTTON,
} from "./types";

describe("update tobpar tests", () => {
  it("has type of HIDE_TOPBAR", () => {
    expect(hideTopbar()).toEqual(expect.objectContaining({type: HIDE_TOPBAR}));
  });
  it("has type of SHOW_TOPBAR", () => {
    expect(showTopbar()).toEqual(expect.objectContaining({type: SHOW_TOPBAR}));
  });

  it("has type of SHOW_TOPBAR_BTN", () => {
    expect(showTopbarButton()).toEqual(
      expect.objectContaining({type: SHOW_TOPBAR_BTN}),
    );
  });

  it("has type of HIDE_TOPBAR_BTN", () => {
    expect(hideTopbarButton()).toEqual(
      expect.objectContaining({type: HIDE_TOPBAR_BTN}),
    );
  });

  it("has type of UPDATE_TOPBAR_BTN", () => {
    expect(updateTopbarButton()).toEqual(
      expect.objectContaining({type: UPDATE_TOPBAR_BTN}),
    );
  });

  it("can update Topbar Button ", () => {
    const onClick = () => {};
    expect(updateTopbarButton(true, "Skip", onClick, "transparent")).toEqual(
      expect.objectContaining({
        type: UPDATE_TOPBAR_BTN,
        showBtnBool: true,
        btnText: "Skip",
        onClick,
        btnType: "transparent",
      }),
    );
  });

  it("has type of HIDE_BACK_BUTTON", () => {
    expect(hideTopbarBackButton()).toEqual(
      expect.objectContaining({type: HIDE_BACK_BUTTON}),
    );
  });

  it("has type of SHOW_BACK_BUTTON", () => {
    expect(showTopbarBackButton()).toEqual(
      expect.objectContaining({type: SHOW_BACK_BUTTON}),
    );
  });
});
