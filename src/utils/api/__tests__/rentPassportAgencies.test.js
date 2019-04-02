import {getBranchesShared, unsharePassport} from "../rentPassportAgencies";
import * as api from "../api";
jest.mock("../api.js");
describe("branchesShared", () => {
  beforeEach(() => {
    api.get.mockClear();
  });
  it("should be a get request to /branchesShared", () => {
    getBranchesShared();
    expect(api.get).toHaveBeenCalledWith("/branchesShared");
  });
  it("should pass through parameters", () => {
    getBranchesShared();
    expect(api.get).toHaveBeenCalledWith(expect.any(String));
  });

  it("should be a get request to /unsharePassport", () => {
    unsharePassport({id: 13});
    expect(api.post).toHaveBeenCalledWith(
      "/unsharePassport",
      expect.any(Object),
    );
  });
});
