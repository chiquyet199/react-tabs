import {SHOW_SPINNER, HIDE_SPINNER} from "./types";
import {showSpinner, hideSpinner} from "./spinner";

describe("Loading spinner", () => {
  it("show spinner", () => {
    const expectedAction = {
      type: SHOW_SPINNER,
    };
    expect(showSpinner()).toEqual(expectedAction);
  });

  it("hide spinner", () => {
    const expectedAction = {
      type: HIDE_SPINNER,
    };
    expect(hideSpinner()).toEqual(expectedAction);
  });
});
