import {SHOW_MENU, HIDE_MENU} from "./types";
import {showMenu, hideMenu} from "./menu";

describe("action menu", () => {
  it("show menu", () => {
    const expectedAction = {
      type: SHOW_MENU,
    };
    expect(showMenu()).toEqual(expectedAction);
  });

  it("hide menu", () => {
    const expectedAction = {
      type: HIDE_MENU,
    };
    expect(hideMenu()).toEqual(expectedAction);
  });
});
