import API from "../utils/api";
import {
  getUser,
  getUserPreferences,
  fetchUserById,
  updateCurrentUser,
  getUserNotificationPreferences,
  updateUserNotificationPreferences,
} from "../actions/users";
import {storeUser} from "../actions/auth";
import {GET_USER, GET_USER_PREFERENCES} from "./types";
import {errorNotification} from "./notifications";

jest.mock("../utils/api/userAuth");
jest.mock("../utils/api/userNotifications");
jest.mock("./notifications");

describe("user action and action creator tests", () => {
  describe("updateCurrentUser action creator tests", () => {
    beforeEach(() => {
      API.updateUser.mockClear();
    });

    it("calls updateUser on API", () => {
      invokeUpdateCurrentUser();
      expect(API.updateUser).toHaveBeenCalled();
    });

    it("passes user object", () => {
      const user = getFakeUserObject();
      invokeUpdateCurrentUser(user);
      expect(API.updateUser).toHaveBeenCalledWith(user);
    });

    it("dispatches GET_USER action when user details update successfully", async () => {
      const user = getFakeUserObject();
      const action = storeUser(user);
      const userPromise = Promise.resolve(user);
      API.updateUser.mockImplementation(() => userPromise);

      const dispatchFake = await invokeUpdateCurrentUser();

      expect(dispatchFake).toHaveBeenCalledWith(action);
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("API out to lunch");
      const en = {type: "FAKE_ERROR", message: error};
      API.updateUser.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeUpdateCurrentUser();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const getFakeUserObject = () => ({
      id: "abc-123",
      firstName: "David",
      lastName: "Batty",
      email: "david.batty@mailinator.com",
    });

    const invokeUpdateCurrentUser = async user => {
      const dispatchFake = jest.fn();
      await updateCurrentUser(user)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("fetchUserById user action creator tests", () => {
    beforeEach(() => {
      API.getUserById.mockClear();
    });

    it("calls getUserById on API", () => {
      invokeFetchUserById();
      expect(API.getUserById).toHaveBeenCalled();
    });

    it("requests given userId", () => {
      const userId = "abc-123-def-456";
      invokeFetchUserById(userId);
      expect(API.getUserById).toHaveBeenCalledWith(userId);
    });

    it("dispatches GET_USER action when user details retrieved", async () => {
      const user = {
        firstName: "Inigo",
        lastName: "Montoya",
      };
      const action = getUser(user);
      const userPromise = Promise.resolve(user);
      API.getUserById.mockImplementation(() => userPromise);

      const dispatchFake = await invokeFetchUserById();

      expect(dispatchFake).toHaveBeenCalledWith(action);
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("API out to lunch");
      const en = {type: "FAKE_ERROR", message: error};
      API.getUserById.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeFetchUserById();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeFetchUserById = async (userId = "abc-123") => {
      const dispatchFake = jest.fn();
      await fetchUserById(userId)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("Users actions tests", () => {
    it("getUser has type of GET_USER", () => {
      expect(getUser()).toEqual(expect.objectContaining({type: GET_USER}));
    });

    it("getUser has agent data", () => {
      const values = {id: "1234", name: "test"};
      expect(getUser(values)).toEqual(
        expect.objectContaining({
          user: values,
        }),
      );
    });

    it("getUserPreferences has type of GET_USER_PREFERENCES", () => {
      expect(getUserPreferences()).toEqual(
        expect.objectContaining({type: GET_USER_PREFERENCES}),
      );
    });

    it("getUserPreferences has preference data", () => {
      const userPreferences = {
        userId: "abc-123",
        disabledTypes: [{messageType: "MARKETING", notificationType: "EMAIL"}],
      };
      expect(getUserPreferences(userPreferences)).toEqual(
        expect.objectContaining({
          userPreferences,
        }),
      );
    });
  });

  describe("getUserNotificationPreferences", () => {
    beforeEach(() => {
      API.getUserNotificationPreferences.mockClear();
    });

    it("calls getUserNotificationPreferences on API with given userId", () => {
      const userId = "acb-123-def-456";
      invokeGetUserNotificationPreferences(userId);
      expect(API.getUserNotificationPreferences).toHaveBeenCalledWith(userId);
    });

    it("dispatches GET_USER_PREFERENCES action when user notification preferences retrieved", async () => {
      const userPreferences = {
        notificationPreferences: {userId: "abc-123", disabledTypes: []},
      };
      const action = {
        type: GET_USER_PREFERENCES,
        userPreferences,
      };
      const userPrefPromise = Promise.resolve({
        notificationPreferences: userPreferences,
      });
      API.getUserNotificationPreferences.mockImplementation(
        () => userPrefPromise,
      );

      const dispatchFake = await invokeGetUserNotificationPreferences();

      expect(dispatchFake).toHaveBeenCalledWith(action);
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("API out to lunch");
      const en = {type: "FAKE_ERROR", message: error};
      API.getUserNotificationPreferences.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeGetUserNotificationPreferences();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeGetUserNotificationPreferences = async (userId = "abc-123") => {
      const dispatchFake = jest.fn();
      await getUserNotificationPreferences(userId)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("updateUserNotificationPreferences", () => {
    beforeEach(() => {
      API.updateUserNotificationPreferences.mockClear();
    });

    it("calls updateUserNotificationPreferences on API with given userNotificationPreferences", () => {
      const unp = {
        userId: "acb-123-def-456",
        disabledTypes: [
          {messageType: "MARKETING", notificationType: "MOBILE_PUSH"},
        ],
      };
      invokeUpdateUserNotificationPreferences(unp);
      expect(API.updateUserNotificationPreferences).toHaveBeenCalledWith(unp);
    });

    it("dispatches GET_USER_PREFERENCES action when user notification preferences successfully updated", async () => {
      const userPreferences = {
        notificationPreferences: {userId: "abc-123", disabledTypes: []},
      };
      const action = {
        type: GET_USER_PREFERENCES,
        userPreferences,
      };
      const userPrefPromise = Promise.resolve(userPreferences);
      API.updateUserNotificationPreferences.mockImplementation(
        () => userPrefPromise,
      );

      const dispatchFake = await invokeUpdateUserNotificationPreferences();

      expect(dispatchFake).toHaveBeenCalledWith(action);
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("API out to lunch");
      const en = {type: "FAKE_ERROR", message: error};
      API.updateUserNotificationPreferences.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeUpdateUserNotificationPreferences();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeUpdateUserNotificationPreferences = async (
      userNotificationPreferences = {userId: "abc-123", disabledTypes: []},
    ) => {
      const dispatchFake = jest.fn();
      await updateUserNotificationPreferences(userNotificationPreferences)(
        dispatchFake,
      );

      return dispatchFake;
    };
  });
});
