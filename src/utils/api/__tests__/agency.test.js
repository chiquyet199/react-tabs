import {unshareRentPassport, getRentPassportsGroup} from "../agency";
import * as api from "../api";

jest.mock("../api.js");

describe("createHqAccount", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  it("should be a post request to /unsharePassport", () => {
    unshareRentPassport({});
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(
      "/unsharePassport",
      expect.any(Object),
    );
  });

  it("should pass through Pending request data", () => {
    const values = {
      groupId: "11",
      renterId: "11",
    };
    unshareRentPassport(values);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(values),
    );
  });
});

describe("getRentPassportsGroup", () => {
  beforeEach(() => {
    api.get.mockClear();
  });

  it("should be a get request to /agencyLeads/passportGroups", () => {
    getRentPassportsGroup({branchId: 777, sort: "asc"});
    expect(api.get).toHaveBeenCalledWith(
      "/agencyLeads/passportGroups",
      expect.any(Object),
    );
  });

  it("should pass through parameters", () => {
    getRentPassportsGroup({branchId: 777, sort: "asc"});
    expect(api.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({branchId: 777, sort: "asc"}),
    );
  });
});
