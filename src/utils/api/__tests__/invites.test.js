import {inviteUser, isEmailTaken, inviteToLease} from "../invites";
import * as api from "../api";

jest.mock("../api.js");

describe("inviteUser", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  it("should be a post request to /user/invite", () => {
    inviteUser({});
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(
      "/agency/agent/invite",
      expect.any(Object),
    );
  });

  it("should pass through form values", () => {
    const values = {email: "email@gmail.com"};
    inviteUser(values);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(values),
    );
  });
});

describe("isEmailTaken", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  it("should be a post request to /signup/checkEmailAvailable", () => {
    isEmailTaken({});
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(
      "/signup/checkEmailAvailable",
      expect.any(Object),
    );
  });

  it("should pass through form values", () => {
    const values = {email: "test@gmail.com"};
    isEmailTaken(values.email);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(values),
    );
  });
});

describe("inviteToLease", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  it("should be a post request to /lease/create", () => {
    inviteToLease({});
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith("/lease/create", expect.any(Object));
  });

  it("should pass through data", () => {
    const values = {data: "test"};
    inviteToLease(values.data);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(values),
    );
  });
});
