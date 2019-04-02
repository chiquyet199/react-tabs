import {login, updateUser} from "../userAuth";
import * as api from "../api";

jest.mock("../api.js");

describe("Users test", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  describe("login tests", () => {
    it("should be a post request to /auth/login/email", () => {
      login();
      expect(api.post).toHaveBeenCalledWith("/auth/login/email", undefined);
    });

    it("should pass through credentials", () => {
      const creds = {username: "dmatteo", password: "gr8goalsansiro"};
      login(creds);
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining(creds),
      );
    });
  });

  describe("updateUser tests", () => {
    it("should be a post request to /updateUser", () => {
      updateUser();
      expect(api.post).toHaveBeenCalledWith("/updateUser", undefined);
    });

    it("should pass through user object", () => {
      const user = {id: "abc-123", email: "dmatteo@gr8goalsansiro.com"};
      updateUser(user);
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining(user),
      );
    });
  });
});
