import {showPassword, load} from "../actions/inputField";
import {SHOW_PASSWORD, LOAD} from "./types";

describe("inputField actions tests", () => {
  it("has type of LOAD", () => {
    expect(load()).toEqual(expect.objectContaining({type: LOAD}));
  });
  it("has type of SHOW_PASSWORD", () => {
    expect(showPassword()).toEqual(
      expect.objectContaining({type: SHOW_PASSWORD}),
    );
  });

  it("passed data to LOAD", () => {
    expect(load({val: 1})).toEqual(
      expect.objectContaining({type: "LOAD", data: {val: 1}}),
    );
  });
});
