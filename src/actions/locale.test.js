import {SET_LOCALE} from "./types";
import {setLocale} from "./locale";

describe("action locale", () => {
  it("set locale", () => {
    const currentLocale = "De-de";
    const expectedAction = {
      type: SET_LOCALE,
      currentLocale,
    };
    expect(setLocale(currentLocale)).toEqual(expectedAction);
  });
});
