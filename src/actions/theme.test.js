import {updateTheme} from "../actions/theme";
import {UPDATE_GLOBAL_THEME} from "./types";

describe("update theme tests", () => {
  it("has type of SET_GLOBAL_THEME", () => {
    expect(updateTheme()).toEqual(
      expect.objectContaining({type: UPDATE_GLOBAL_THEME}),
    );
  });

  it("has theme", () => {
    expect(updateTheme("light")).toEqual(
      expect.objectContaining({
        type: "UPDATE_GLOBAL_THEME",
        globaltheme: "light",
      }),
    );
  });
});
