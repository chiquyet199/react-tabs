import {isEmailAvailable, isValidEmail} from "./email";
import API from "../api";
import {errorNotification} from "../../actions/notifications";
import store from "../store/store";

jest.mock("../store/store");
jest.mock("canopy-frontend-common/src/utils/api/invites");
jest.mock("canopy-frontend-common/src/actions/notifications");

describe("isEmailAvailable tests", () => {
  beforeEach(() => {
    API.isEmailTaken.mockClear();
    errorNotification.mockClear();
  });
  it("calls isEmailAvailable function", async () => {
    const email = "test1@gmail.com";
    API.isEmailTaken.mockImplementation(async () => {
      return {available: email};
    });
    await isEmailAvailable(email);
    await expect(API.isEmailTaken).toHaveBeenCalledWith(email);
  });

  it("dispatches error notification on service failure", async () => {
    const error = {error: {message: "Invalid Email Address"}};
    const err = {type: "FAKE_ERROR", message: "Invalid Email Address"};
    API.isEmailTaken.mockImplementation(async () => {
      throw error; // eslint-disable-line no-throw-literal
    });
    errorNotification.mockImplementation(() => {
      return err;
    });
    store.dispatch = jest.fn();
    const res = await isEmailAvailable();
    await expect(store.dispatch).toHaveBeenCalledWith(errorNotification());
    expect(res).toBeTruthy();
  });
});

describe("valid email tests", () => {
  it("Passes valid addresses", () => {
    let valid = isValidEmail("email@domain.com");
    expect(valid).toBeFalsy();

    valid = isValidEmail("firstname.lastname@domain.com");
    expect(valid).toBeFalsy();

    valid = isValidEmail("email@subdomain.domain.com");
    expect(valid).toBeFalsy();

    valid = isValidEmail("firstname+lastname@domain.com");
    expect(valid).toBeFalsy();

    valid = isValidEmail("email@123.123.123.123");
    expect(valid).toBeFalsy();

    valid = isValidEmail("1234567890@domain.com");
    expect(valid).toBeFalsy();

    valid = isValidEmail("email@domain-one.com");
    expect(valid).toBeFalsy();

    valid = isValidEmail("_______@domain.com");
    expect(valid).toBeFalsy();

    valid = isValidEmail("email@domain.name");
    expect(valid).toBeFalsy();

    valid = isValidEmail("email@domain.co.uk");
    expect(valid).toBeFalsy();

    valid = isValidEmail("firstname-lastname@domain.com");
    expect(valid).toBeFalsy();
  });

  it("Fails invalid addresses", () => {
    let valid = isValidEmail("plainaddress");
    expect(valid).toBeTruthy();

    valid = isValidEmail("#@%^%#$@#$@#.com");
    expect(valid).toBeTruthy();

    valid = isValidEmail("@domain.com");
    expect(valid).toBeTruthy();

    valid = isValidEmail("Joe Smith <email@domain.com>");
    expect(valid).toBeTruthy();

    valid = isValidEmail("email.domain.com");
    expect(valid).toBeTruthy();

    valid = isValidEmail("email@domain@domain.com");
    expect(valid).toBeTruthy();

    valid = isValidEmail("あいうえお@domain.com");
    expect(valid).toBeTruthy();

    valid = isValidEmail("email@domain.com (Joe Smith)");
    expect(valid).toBeTruthy();

    valid = isValidEmail("email@-domain.com");
    expect(valid).toBeTruthy();

    valid = isValidEmail("email@domain..com");
    expect(valid).toBeTruthy();
  });
});
