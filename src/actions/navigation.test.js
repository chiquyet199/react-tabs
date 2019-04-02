import {openURL} from "../utils/helpers/linking";
import {mailto} from "./navigation";

/*
this wrapping nonsense is necessary because jest won't mock
the Linking library in react-native directly on runs of
web tests
*/
jest.mock("../utils/helpers/linking");

describe("Navigation action tests", () => {
  describe("mailto action tests", () => {
    it("calls linking with correct protocol and email address", () => {
      const email = "testy.mctestface@testing.com";
      mailto(email)();
      expect(openURL).toHaveBeenCalledWith(`mailto:${email}`);
    });
  });
});
