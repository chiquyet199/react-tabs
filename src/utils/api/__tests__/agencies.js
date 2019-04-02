import {getAgencyBranches, getRentPassportShares} from "../agencies";
import * as api from "../api";

jest.mock("../api.js");

describe("getAgencyBranches", () => {
  beforeEach(() => {
    api.get.mockClear();
  });

  it("should be a post request to /branch/getMany", () => {
    getAgencyBranches({});
    expect(api.get).toHaveBeenCalledWith("/branch/getMany", expect.any(Object));
  });

  it("should pass through values", () => {
    const agencyId = "12";
    getAgencyBranches(agencyId);
    expect(api.get).toHaveBeenCalledWith(expect.any(String), agencyId);
  });
});

describe("getRentPassportShares", () => {
  beforeEach(() => {
    api.get.mockClear();
  });

  it("should call a GET on /agencyLeads/branchesShared", () => {
    getRentPassportShares();
    expect(api.get).toHaveBeenCalledWith("/agencyLeads/branchesShared");
  });
});
