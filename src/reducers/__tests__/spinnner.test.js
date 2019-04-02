import {SHOW_SPINNER, HIDE_SPINNER} from "../../actions/types";
import spinnerReducer from "../spinner";

const fakeState = false;

describe("spinnerReducer reducer", () => {
  it("throw an error without an action", () => {
    expect(() => spinnerReducer(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = spinnerReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper state for a SHOW_SPINNER action type", () => {
    const newState = spinnerReducer(false, {type: SHOW_SPINNER});
    expect(newState).toEqual(true);
  });

  it("return the proper state for a HIDE_SPINNER action type", () => {
    const newState = spinnerReducer(true, {type: HIDE_SPINNER});
    expect(newState).toEqual(false);
  });
});
