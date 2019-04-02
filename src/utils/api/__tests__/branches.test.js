import {getBranches, deleteBranch} from "../branches";
import * as api from "../api";

jest.mock("../api.js");
const params = {
  order: "desc",
  orderBy: "name",
  search: "",
  agencyId: "111",
};
describe("getBranches util", () => {
  beforeEach(() => {
    api.get.mockClear();
  });
  it("should call a get request to /agency/branches and pass through parameters", () => {
    getBranches(params);
    expect(api.get).toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledWith(
      "/agency/branch/getMany",
      expect.objectContaining(params),
    );
  });
});

describe("deleteBranch", () => {
  beforeEach(() => {
    api.post.mockClear();
  });
  it("should be a post request to /agencyLeads/removeFromBranch", () => {
    deleteBranch({branchId: "11111", renterId: "22222"});
    expect(api.post).toHaveBeenCalledWith(
      "/agencyLeads/removeFromBranch",
      expect.any(Object),
    );
  });
  it("should pass through values", () => {
    const data = {branchId: "11111", renterId: "22222"};
    deleteBranch({data});
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({data}),
    );
  });
});
