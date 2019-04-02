import {GET_USER, GET_USER_PREFERENCES} from "../../actions/types";
import userReducer from "../user";

const fakeState = false;

describe("user reducer", () => {
  it("throws an error without an action", () => {
    expect(() => userReducer(fakeState)).toThrow();
  });

  it("returns the same state without a matching action.type", () => {
    const newState = userReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("returns the proper state for a GET_USER action type", () => {
    const action = {type: GET_USER, user: {userId: "abc-123"}};
    const newState = userReducer(false, action);
    expect(newState).toEqual(expect.objectContaining({profile: action.user}));
  });

  it("returns the proper state for a GET_USER_PREFERENCES action type", () => {
    const action = {
      type: GET_USER_PREFERENCES,
      userPreferences: {
        userId: "abc-123",
        disabledTypes: [{messageType: "MARKETING", notificationType: "PUSH"}],
      },
    };
    const newState = userReducer(false, action);
    expect(newState).toEqual(
      expect.objectContaining({
        userNotificationPreferences: action.userPreferences,
      }),
    );
  });
});
