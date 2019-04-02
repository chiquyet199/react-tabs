import {postcodeLookup} from "../postcode";
import * as api from "../api";

jest.mock("../api.js");

describe("Postcode lookup", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  it("should be a get request to /addresses", () => {
    postcodeLookup("", "GB");
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(
      "/complete-address",
      expect.any(Object),
    );
  });

  it("should pass through postcode (with camel case!)", () => {
    const postCode = "yo61 1lg";
    postcodeLookup(postCode, "GB");
    expect(api.post).toHaveBeenCalledWith(expect.any(String), {
      address: {postCode, countryCode: "GB"},
    });
  });

  it("should pass given country code", () => {
    const countryCodes = ["GB", "DL", "US", "FR"];
    for (let x = 0; x < countryCodes.length; x += 1) {
      const countryCode = countryCodes[x];
      postcodeLookup("", countryCode);
      expect(api.post).toHaveBeenCalledWith(expect.any(String), {
        address: {countryCode, postCode: ""},
      });
    }
  });
});
