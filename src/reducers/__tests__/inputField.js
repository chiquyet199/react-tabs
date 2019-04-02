import {SHOW_PASSWORD, LOAD} from "../../actions/types";

const fakeState = {test: "fakeState"};

const fieldReducer = require("../inputField").default;

describe("Input Field reducer", () => {
  it("throw an error without an action", () => {
    expect(() => fieldReducer(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = fieldReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without a state", () => {
    const newState = fieldReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({
      showPassword: true,
    });
  });

  it("return the proper state for a LOAD action type", () => {
    const newState = fieldReducer(fakeState, {
      type: LOAD,
      data: "test",
    });
    expect(newState).toEqual({
      data: "test",
    });
  });

  it("return the proper state for a SHOW_PASSWORD action type", () => {
    const newState = fieldReducer(undefined, {
      type: SHOW_PASSWORD,
    });
    expect(newState).toEqual({
      showPassword: false,
    });
  });
});
