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
} from "../../actions/types";
const fakeState = {test: "fakeState"};
const topbarReducer = require("../topbar").default;

describe("Menu reducer", () => {
  it("throw an error without an action", () => {
    expect(() => topbarReducer(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = topbarReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without a state", () => {
    const newState = topbarReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({
      haveTopbar: true,
      topbarBtn: {
        haveTopbarButton: false,
        topbarButtonText: "",
        actionTopbarButton: undefined,
        btnType: "transparent_green",
        topbarButtonIcon: undefined,
        hideBackButton: false,
      },
      topbarCenter: {
        topbarCenterText: "",
      },
      topbarLeft: {
        topbarLeftText: "",
      },
    });
  });
  // Topbar Show/Hide Test
  it("return the proper state for a HIDE_TOPBAR action type", () => {
    const newState = topbarReducer(undefined, {
      type: HIDE_TOPBAR,
    });
    expect(newState).toEqual({
      haveTopbar: false,
      topbarBtn: {
        haveTopbarButton: false,
        topbarButtonText: "",
        actionTopbarButton: undefined,
        btnType: "transparent_green",
        topbarButtonIcon: undefined,
        hideBackButton: false,
      },
      topbarCenter: {
        topbarCenterText: "",
      },
      topbarLeft: {
        topbarLeftText: "",
      },
    });
  });
  it("return the proper state for a SHOW_TOPBAR action type", () => {
    const newState = topbarReducer(undefined, {
      type: SHOW_TOPBAR,
    });
    expect(newState).toEqual({
      haveTopbar: true,
      topbarBtn: {
        haveTopbarButton: false,
        topbarButtonText: "",
        actionTopbarButton: undefined,
        btnType: "transparent_green",
        topbarButtonIcon: undefined,
        hideBackButton: false,
      },
      topbarCenter: {
        topbarCenterText: "",
      },
      topbarLeft: {
        topbarLeftText: "",
      },
    });
  });
  // Topbar Button Show/Hide Test
  it("return the proper state for a HIDE_TOPBAR_BTN action type", () => {
    const newState = topbarReducer(undefined, {
      type: HIDE_TOPBAR_BTN,
    });
    expect(newState).toEqual({
      haveTopbar: true,
      topbarBtn: {
        haveTopbarButton: false,
        topbarButtonText: "",
        actionTopbarButton: undefined,
        btnType: "transparent_green",
        topbarButtonIcon: undefined,
        hideBackButton: false,
      },
      topbarCenter: {
        topbarCenterText: "",
      },
      topbarLeft: {
        topbarLeftText: "",
      },
    });
  });
  it("return the proper state for a SHOW_TOPBAR_BTN action type", () => {
    const newState = topbarReducer(undefined, {
      type: SHOW_TOPBAR_BTN,
    });
    expect(newState).toEqual({
      haveTopbar: true,
      topbarBtn: {
        haveTopbarButton: true,
        topbarButtonText: "",
        actionTopbarButton: undefined,
        btnType: "transparent_green",
        topbarButtonIcon: undefined,
        hideBackButton: false,
      },
      topbarCenter: {
        topbarCenterText: "",
      },
      topbarLeft: {
        topbarLeftText: "",
      },
    });
  });
  // Add features to topbar button test
  it("return the proper state for a UPDATE_TOPBAR_BTN action type", () => {
    const mockFunc = () => {};
    const newState = topbarReducer(fakeState, {
      type: UPDATE_TOPBAR_BTN,
      showBtnBool: false,
      btnText: "Skip",
      onClick: mockFunc,
      btnType: "transparent",
      btnIcon: "delete",
    });
    expect(newState).toEqual({
      test: "fakeState",
      topbarBtn: {
        haveTopbarButton: false,
        topbarButtonText: "Skip",
        actionTopbarButton: mockFunc,
        btnType: "transparent",
        topbarButtonIcon: "delete",
      },
    });
  });
  // Topbar Center text display
  it("return the proper state for a SHOW_TOPBAR_CENTER_TEXT action type", () => {
    const newState = topbarReducer(fakeState, {
      type: SHOW_TOPBAR_CENTER_TEXT,
      centerText: "Create a Canopy HQ account",
    });
    expect(newState).toEqual({
      test: "fakeState",
      topbarCenter: {
        topbarCenterText: "Create a Canopy HQ account",
      },
    });
  });
  it("return the proper state for a HIDE_TOPBAR_CENTER_TEXT action type", () => {
    const newState = topbarReducer(undefined, {
      type: HIDE_TOPBAR_CENTER_TEXT,
    });
    expect(newState).toEqual({
      haveTopbar: true,
      topbarBtn: {
        haveTopbarButton: false,
        topbarButtonText: "",
        actionTopbarButton: undefined,
        btnType: "transparent_green",
        topbarButtonIcon: undefined,
        hideBackButton: false,
      },
      topbarCenter: {
        topbarCenterText: "",
      },
      topbarLeft: {
        topbarLeftText: "",
      },
    });
  });
  // Topbar Left ("back") text display
  it("return the proper state for a SHOW_TOPBAR_LEFT_TEXT action type", () => {
    const newState = topbarReducer(fakeState, {
      type: SHOW_TOPBAR_LEFT_TEXT,
      leftText: "Back",
    });
    expect(newState).toEqual({
      test: "fakeState",
      topbarLeft: {
        topbarLeftText: "Back",
      },
    });
  });
  it("return the proper state for a HIDE_TOPBAR_LEFT_TEXT action type", () => {
    const newState = topbarReducer(undefined, {
      type: HIDE_TOPBAR_LEFT_TEXT,
    });
    expect(newState).toEqual({
      haveTopbar: true,
      topbarBtn: {
        haveTopbarButton: false,
        topbarButtonText: "",
        actionTopbarButton: undefined,
        btnType: "transparent_green",
        topbarButtonIcon: undefined,
        hideBackButton: false,
      },
      topbarCenter: {
        topbarCenterText: "",
      },
      topbarLeft: {
        topbarLeftText: "",
      },
    });
  });
});
