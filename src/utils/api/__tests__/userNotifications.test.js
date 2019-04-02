import {
  getUserNotificationPreferences,
  updateUserNotificationPreferences,
} from "../userNotifications";
import * as api from "../api";

jest.mock("../api.js");

describe("Notifications tests", () => {
  describe("getNotificationSettings tests", () => {
    beforeEach(() => {
      api.get.mockClear();
    });

    it("should be a get request to /preferences", () => {
      getUserNotificationPreferences();
      expect(api.get).toHaveBeenCalledWith("/preferences", expect.any(Object));
    });

    it("should pass userId in a GetNotificationSettingRequest", () => {
      const userId = "abc-123";
      getUserNotificationPreferences(userId);
      expect(api.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({userId}),
      );
    });
  });

  describe("updateUser tests", () => {
    beforeEach(() => {
      api.post.mockClear();
    });

    it("should be a post request to /preferences", () => {
      updateUserNotificationPreferences();
      expect(api.post).toHaveBeenCalledWith("/preferences", expect.any(Object));
    });

    it("should pass notification settings", () => {
      const notificationPreferences = {
        disabledTypes: [{messageType: "MARKETING", notificationType: "EMAIL"}],
      };
      updateUserNotificationPreferences(notificationPreferences);
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({notificationPreferences}),
      );
    });
  });
});
