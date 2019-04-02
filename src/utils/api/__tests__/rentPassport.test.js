import {
  generateRentPassport,
  getRentPassport,
  storeRentPassportData,
} from "../rentPassport";
import * as api from "../api";

jest.mock("../api.js");

describe("registerUserProfile", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  it("should be a post request to /generate-rent-passport", () => {
    generateRentPassport({});
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(
      "/rent-passport/submit",
      expect.any(Object),
    );
  });

  it("should pass through form values", () => {
    const values = {firstNameRentPassport: "firstNameRentPassport"};
    generateRentPassport(values);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(values),
    );
  });
});

describe("getRentPassport", () => {
  beforeEach(() => {
    api.get.mockClear();
  });
  it("should be a get request to /rent-passport", () => {
    getRentPassport();
    expect(api.get).toHaveBeenCalledWith("/rent-passport");
  });
});

describe("storeRentPassportData", () => {
  beforeEach(() => {
    api.post.mockClear();
  });
  it("should be a post request to /rent-passport", () => {
    const values = {
      name: "name",
    };
    storeRentPassportData(values);
    expect(api.post).toHaveBeenCalledWith("/rent-passport", values);
  });
});
