import {AsyncStorage} from "react-native";
import API from "../utils/api";
import * as AuthAction from "./auth";
import * as NavigationAction from "./navigation";
import {errorNotification, infoNotification} from "./notifications";
import {LOGIN, LOGOUT, DELETE_RENT_PASSPORT, INFO_NOTIFICATION} from "./types";
import {unsetToken, setToken} from "../utils/api/api";
import store from "../utils/store/store";

jest.mock("../utils/api/userAuth");
jest.mock("./notifications");
jest.mock("../utils/api/api");
jest.mock("../utils/store/store");

describe("Auth action tests", () => {
  beforeEach(() => {
    API.login.mockClear();
    API.requestVerifyEmail.mockClear();
    errorNotification.mockClear();
    infoNotification.mockClear();
  });
  describe("login tests", () => {
    store.getState = jest.fn(() => {
      return {
        locale: {
          translations: {
            emailSentTo: "Email sent to",
            verifyEmail_tap_link: "Tap link to verify email",
            login_problem_recovering_last_session:
              "login_problem_recovering_last_session",
          },
        },
      };
    });

    it("calls to verify new account by email", () => {
      invokeVerifyEmail(1234, "email@mail.com");
      expect(API.requestVerifyEmail).toHaveBeenCalledWith(1234);
    });

    it("verifies email and dispatches the correct notification", async () => {
      const infoAction = {
        type: INFO_NOTIFICATION,
        message: "Tap link to verify email",
      };
      API.requestVerifyEmail.mockImplementation(async () => {
        return Promise.resolve({success: true});
      });
      infoNotification.mockImplementation(() => infoAction);
      const {dispatchFake} = await invokeVerifyEmail(1234, "email@mail.com");
      expect(infoNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(infoAction);
    });

    it("dispatches error notification in case API fails", async () => {
      const error = new Error("503, a problem");
      const en = {type: "FAKE_ERROR", message: error};
      API.requestVerifyEmail.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeVerifyEmail(1234, "email@mail.com");
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("calls login on API", () => {
      invokeLogin();
      expect(API.login).toHaveBeenCalled();
    });

    it("passes username and password to API.login", () => {
      const credentials = {username: "dmatteo", password: "gr8goalsansiro"};
      invokeLogin(credentials);
      expect(API.login).toHaveBeenCalledWith(credentials);
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("API out to lunch");
      const en = {type: "FAKE_ERROR", message: error};
      API.login.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeLogin();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("returns error on service failure", async () => {
      const error = new Error("API on tea break");
      API.login.mockImplementation(async () => {
        throw error;
      });
      const {result} = await invokeLogin();
      expect(result).toEqual(expect.objectContaining(error));
    });

    const invokeLogin = async (values = {username: "", password: ""}) => {
      const dispatchFake = jest.fn();
      const result = await AuthAction.login(values)(dispatchFake);

      return {dispatchFake, result};
    };
    const invokeVerifyEmail = async (userId, email) => {
      const dispatchFake = jest.fn();
      const result = await AuthAction.requestVerifyEmail({userId, email})(
        dispatchFake,
      );

      return {dispatchFake, result};
    };
  });

  describe("agent login tests", () => {
    it("calls agentLogin on API", () => {
      invokeAgentLogin();
      expect(API.agentLogin).toHaveBeenCalled();
    });

    it("passes username and password to API.agentLogin", () => {
      const credentials = {username: "dmatteo", password: "gr8goalsansiro"};
      invokeAgentLogin(credentials);
      expect(API.agentLogin).toHaveBeenCalledWith(credentials);
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("API out to lunch");
      const en = {type: "FAKE_ERROR", message: error};
      API.agentLogin.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeAgentLogin();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("returns error on service failure", async () => {
      const error = new Error("API on tea break");
      API.login.mockImplementation(async () => {
        throw error;
      });
      const {result} = await invokeAgentLogin();
      expect(result).toEqual(expect.objectContaining(error));
    });

    const invokeAgentLogin = async (values = {username: "", password: ""}) => {
      const dispatchFake = jest.fn();
      const result = await AuthAction.agentLogin(values)(dispatchFake);

      return {dispatchFake, result};
    };
  });

  describe("Login Success Tests", () => {
    it("has type of LOGIN", () => {
      expect(AuthAction.loginSuccess({}).type).toBe(LOGIN);
    });

    it("has user object", () => {
      const user = {name: "Jack Black", email: "jack@black.com"};
      expect(AuthAction.loginSuccess({user}).user).toEqual(user);
    });

    it("contains response other than user", () => {
      const response = sampleLoginResponse();
      expect(AuthAction.loginSuccess(response.data)).toEqual(
        expect.objectContaining(response.data),
      );
    });
  });

  describe("loggedIn tests", () => {
    beforeEach(() => {
      setToken.mockClear();
    });

    it("dispatches loginSuccess action", async () => {
      const response = {token: "abc123"};
      const dispatchFake = await invokeLoggedIn(response);

      expect(dispatchFake).toHaveBeenCalledWith(
        expect.objectContaining({
          type: LOGIN,
        }),
      );
    });

    it("passes response to action", async () => {
      const response = {token: "abc123", user: {}};
      const dispatchFake = await invokeLoggedIn(response);

      expect(dispatchFake).toHaveBeenCalledWith(
        expect.objectContaining(response),
      );
    });

    it("calls setToken on API with given token", async () => {
      const response = {token: "abc123"};
      await invokeLoggedIn(response);
      expect(setToken).toHaveBeenCalledWith(response.token);
    });

    it("dispatches error notification if there's no token in response", async () => {
      const en = {type: "FAKE_ERROR", message: ""};
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeLoggedIn();
      expect(errorNotification).toHaveBeenCalledWith(
        expect.objectContaining({message: "token not available"}),
      );
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeLoggedIn = async (values = {}) => {
      const dispatchFake = jest.fn();
      await AuthAction.loggedIn(values)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("loggedOut tests", () => {
    beforeEach(() => {
      unsetToken.mockClear();
    });

    it("calls clearToken on API", () => {
      invokeLoggedOut();
      expect(unsetToken).toHaveBeenCalled();
    });

    it("dispatches logout event", () => {
      const dispatch = invokeLoggedOut();
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: LOGOUT,
        }),
      );
    });

    it("dispatches delete rent passport event", () => {
      const dispatch = invokeLoggedOut();
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: DELETE_RENT_PASSPORT,
        }),
      );
    });

    const invokeLoggedOut = (values = {}) => {
      const dispatchFake = jest.fn();
      AuthAction.loggedOut(values)(dispatchFake);

      return dispatchFake;
    };
  });

  const sampleLoginResponse = () => ({
    success: true,
    requestId: "4c4f9748-4225-4a12-82d5-2348b8f324bf",
    data: {
      success: true,
      expires: 1539363048,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MDY1NzJkOC1jMGYyLTQ4MjktYmFiMi00ZTM2YTcyNzc5ZTMiLCJpc3MiOiJjYW5vcHkucmVudCIsImlhdCI6MTUzOTI3NjY0OCwiZXhwIjoxNTM5MzYzMDQ4LCJzdWIiOiI1ODYxMTFiOS1iNDdkLTQ5YTgtYmI3My02YWVkMThlYjA1MDUiLCJ0eXBlIjoiQUdFTlQifQ.Ftui5Yk-WBCh63555vvGm5i5iAlw0dPLfd_Dgcahs8Y",
      user: {
        id: "586111b9-b47d-49a8-bb73-6aed18eb0505",
        type: "AGENT",
        email: "matt@canopy.rent",
        firstName: "Matt",
        middleName: null,
        lastName: "Murdock",
        phone: null,
        dob: null,
        language: "en",
        marketing: false,
      },
      agent: {
        userId: "586111b9-b47d-49a8-bb73-6aed18eb0505",
        agencyId: "75606532-04be-4996-9c15-d762201116e0",
        role: "ADMIN",
        branchIds: ["ff6fde63-7c96-4ea6-9ee3-7c0458f5a55e"],
      },
      agency: {
        id: "75606532-04be-4996-9c15-d762201116e0",
        name: "Matt's Agency",
        type: "ESTATE_AGENCY",
        phone: "077123456789",
        address: {
          line1: "1 Main Street",
          postCode: "YO61 1LG",
          countryCode: "GB",
        },
        companyRegistrationNumber: "12345667",
        bankAccount: {
          accountHolder: "M Murdock",
          sortCode: "40-00-04",
          accountNumber: "12345678",
        },
        legalRepresentative: {
          firstName: "Matthew",
          lastName: "Murdock",
          address: {
            line1: "1 Main Street",
            postCode: "YO61 1LG",
            countryCode: "GB",
          },
          dob: "1985-01-01",
        },
        isActive: false,
      },
    },
  });

  describe("checkLoggedIn tests", () => {
    it("sets landing path when not in state", async () => {
      const path = "/fake/path";
      const action = AuthAction.setLandingPath(path);
      const dispatch = await invokeCheckLoggedIn(false, path);
      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining(action),
      );
    });

    it("doesn't set landing path when it's already in state", async () => {
      const path = "/fake/path";
      const action = AuthAction.setLandingPath(path);
      const dispatch = await invokeCheckLoggedIn(false, path, {
        auth: {landingPath: path},
        locale: {
          translations: {
            verifyEmail_tap_link: "Tap link to verify email",
            login_problem_recovering_last_session:
              "login_problem_recovering_last_session",
          },
        },
      });
      expect(dispatch).not.toHaveBeenNthCalledWith(
        1,
        expect.objectContaining(action),
      );
    });

    it("doesn't set landing path when none is supplied", async () => {
      const action = AuthAction.setLandingPath();
      const dispatch = await invokeCheckLoggedIn();
      expect(dispatch).not.toHaveBeenNthCalledWith(
        1,
        expect.objectContaining(action),
      );
    });

    it("calls getItem on AsyncStorage", async () => {
      AsyncStorage.getItem = jest.fn();
      await invokeCheckLoggedIn();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("loginData");
      AsyncStorage.getItem.mockReset();
    });

    it("redirects to /welcome when getItem returns null", async () => {
      NavigationAction.go = jest.fn(path => ({path}));
      AsyncStorage.getItem = jest.fn(() => null);

      const dispatch = await invokeCheckLoggedIn();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith("loginData");
      expect(dispatch).toHaveBeenLastCalledWith(
        expect.objectContaining({path: "/welcome"}),
      );

      NavigationAction.go.mockReset();
      AsyncStorage.getItem.mockReset();
    });

    it("calls loggedIn when session has not expired", async () => {
      const loginData = {expires: Math.floor(new Date().getTime() / 1000) + 20};

      AuthAction.loggedIn = jest.fn();
      AsyncStorage.getItem = jest.fn(() => JSON.stringify(loginData));

      await invokeCheckLoggedIn();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith("loginData");
      expect(AuthAction.loggedIn).toHaveBeenCalledWith(loginData, true);

      AuthAction.loggedIn.mockReset();
      AsyncStorage.getItem.mockReset();
    });

    it("calls loggedOut when session has not expired", async () => {
      const loginData = {expires: Math.floor(new Date().getTime() / 1000) - 20};

      AuthAction.loggedOut = jest.fn();
      AsyncStorage.getItem = jest.fn(() => JSON.stringify(loginData));

      await invokeCheckLoggedIn();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith("loginData");
      expect(AuthAction.loggedOut).toHaveBeenCalled();

      AuthAction.loggedIn.mockReset();
      AsyncStorage.getItem.mockReset();
    });

    const invokeCheckLoggedIn = async (
      redirect,
      landingPath,
      fakeState = {
        auth: {},
        locale: {
          translations: {
            verifyEmail_tap_link: "Tap link to verify email",
            login_problem_recovering_last_session:
              "login_problem_recovering_last_session",
          },
        },
      },
    ) => {
      const dispatchFake = jest.fn();
      // fn => fn && typeof fn === "function" && fn(),
      const getStateFake = jest.fn(() => fakeState);
      await AuthAction.checkLoggedIn(redirect, landingPath)(
        dispatchFake,
        getStateFake,
      );

      return dispatchFake;
    };
  });
});
