import {registerUserProfile} from "../profile";
import * as api from "../api";

jest.mock("../api.js");

describe("registerUserProfile", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  it("should be a post request to /user/profile", () => {
    registerUserProfile({});
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith("/user/profile", expect.any(Object));
  });

  it("should pass through form values", () => {
    const values = {firstNameRentPassport: "firstNameRentPassport"};
    registerUserProfile(values);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(values),
    );
  });
});
