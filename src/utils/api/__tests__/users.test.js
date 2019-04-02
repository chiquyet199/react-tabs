import {getAgencyUsers, getUserById} from "../userAuth";
import * as api from "../api";
jest.mock("../api.js");

describe("user auth", () => {
  beforeEach(() => {
    api.get.mockClear();
  });

  describe("get Agency Users", () => {
    it("should pass the parameters to correct URL", () => {
      const params = {
        agencyId: 111,
      };
      getAgencyUsers(params);
      expect(api.get).toHaveBeenCalledWith(
        "/agency/agentUsers/get",
        expect.objectContaining(params),
      );
    });
  });

  describe("getUserById", () => {
    it("should make a get request to /getUser", () => {
      getUserById("abc-123");
      expect(api.get).toHaveBeenCalledWith("/getUser", expect.any(Object));
    });

    it("should pass given user id", () => {
      const userId = "abc-123-def-456";
      getUserById(userId);
      expect(api.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({userId}),
      );
    });
  });
});
