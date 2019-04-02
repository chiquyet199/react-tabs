import {UPDATE_GLOBAL_THEME} from "../../actions/types";

const fakeState = {test: "fakeState"};

const themeReducer = require("../theme").default;

describe("Theme reducer", () => {
  it("throw an error without an action", () => {
    expect(() => themeReducer(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = themeReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without a state", () => {
    const newState = themeReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual("light");
  });

  it("return the proper state for a UPDATE_GLOBAL_THEME action type", () => {
    const newState = themeReducer(undefined, {
      type: UPDATE_GLOBAL_THEME,
      globaltheme: "dark",
    });
    expect(newState).toEqual("dark");
  });
});
