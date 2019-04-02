import {SHOW_MENU, HIDE_MENU} from "../../actions/types";

const fakeState = {test: "fakeState"};

const menuReducer = require("../menu").default;

describe("Menu reducer", () => {
  it("throw an error without an action", () => {
    expect(() => menuReducer(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = menuReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without a state", () => {
    const newState = menuReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({
      showMenu: true,
    });
  });

  it("return the proper state for a SHOW_MENU action type", () => {
    const newState = menuReducer(undefined, {
      type: SHOW_MENU,
    });
    expect(newState).toEqual({
      showMenu: true,
    });
  });

  it("return the proper state for a HIDE_MENU action type", () => {
    const newState = menuReducer(undefined, {
      type: HIDE_MENU,
    });
    expect(newState).toEqual({
      showMenu: false,
    });
  });
});
