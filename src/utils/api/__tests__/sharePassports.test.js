import {
  sharePropertyRentPassport,
  getSharedRentPassports,
} from "../sharePassports";
import * as api from "../api";
jest.mock("../api.js");

describe("sharePropertyRentPassport", () => {
  beforeEach(() => {
    api.post.mockClear();
  });
  it("should be a post request to /agencyLeads/shareRentPassport", () => {
    sharePropertyRentPassport({});
    expect(api.post).toHaveBeenCalledWith(
      "/agencyLeads/shareRentPassport",
      expect.any(Object),
    );
  });
  it("should pass through form values", () => {
    const groupId = "2";
    sharePropertyRentPassport(groupId);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({groupId}),
    );
  });
});

describe("get SharedRent Passports", () => {
  beforeEach(() => {
    api.post.mockClear();
  });
  it("should be a get request to /shared-rent-passport/findPassports", () => {
    const params = {branchId: 111, status: "PENDING"};
    getSharedRentPassports(params);
    expect(api.get).toHaveBeenCalledWith(
      "/shared-rent-passport/findPassports",
      expect.objectContaining(params),
    );
  });
});
