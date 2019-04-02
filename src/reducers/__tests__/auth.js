import authReducer from "../auth";
import {
  LOGIN,
  LOGOUT,
  PRE_ACTIVATION_LOGIN,
  SET_LANDING_PATH,
} from "../../actions/types";

const fakeState = {
  user: {},
  isLoggedIn: false,
  landingPath: null,
  preActivationUser: {},
};

describe("Auth reducer", () => {
  it("throw an error for a payload without an action", () => {
    expect(() => authReducer(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = authReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without a state", () => {
    const newState = authReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({
      user: {},
      isLoggedIn: false,
      landingPath: null,
      preActivationUser: {},
    });
  });

  it("return proper state for PRE_ACTIVATION_LOGIN action type", () => {
    const newState = authReducer(fakeState, {
      type: PRE_ACTIVATION_LOGIN,
      payload: {
        userId: 123,
        email: "test@mail.com",
      },
    });
    expect(newState).toEqual({
      user: {},
      isLoggedIn: false,
      landingPath: null,
      preActivationUser: {
        userId: 123,
        email: "test@mail.com",
      },
    });
  });

  it("return the proper state for a LOGIN action type", () => {
    const newState = authReducer(fakeState, {
      type: LOGIN,
      user: {name: "fakeUser"},
    });
    expect(newState).toEqual({
      user: {name: "fakeUser"},
      isLoggedIn: true,
      landingPath: null,
      preActivationUser: {},
    });
  });

  it("stores agencyId and branchId when Agent provided", () => {
    const response = {
      agent: {
        userId: "abc-123",
        agencyId: "def-456",
        role: "AGENT",
        branchIds: ["ghi-789"],
      },
      user: {
        id: "abc-123",
        firstName: "Fake",
        lastName: "Name",
      },
    };
    const newState = authReducer(fakeState, {
      type: LOGIN,
      ...response,
    });
    expect(newState).toEqual(
      expect.objectContaining({
        user: {
          ...response.user,
          agencyId: response.agent.agencyId,
          branchId: response.agent.branchIds[0],
        },
      }),
    );
  });

  it("stores Agent info in the user object", () => {
    const response = {
      agent: {
        userId: "abc-123",
        agencyId: "def-456",
        role: "AGENT",
        branchIds: ["ghi-789"],
      },
      user: {
        id: "abc-123",
        firstName: "Fake",
        lastName: "Name",
      },
    };
    const newState = authReducer(fakeState, {
      type: LOGIN,
      ...response,
    });
    expect(newState.user).toEqual(
      expect.objectContaining({
        agent: {
          ...response.agent,
        },
      }),
    );
  });

  it("stores Agency name and id in agency, inside the user object", () => {
    const response = {
      user: {
        id: "abc-123",
        firstName: "Fake",
        lastName: "Name",
      },
      agency: {
        id: "abc-123",
        name: "Shadow",
        type: "ESTATE_AGENT",
        companyRegistrationNumber: "abcdef123456",
        phone: "01234567890",
        address: "99 Bishopsgate, London",
        agents: [{}, {}],
      },
    };
    const newState = authReducer(fakeState, {
      type: LOGIN,
      ...response,
    });
    expect(newState.user.agency).toEqual({
      id: response.agency.id,
      name: response.agency.name,
    });
  });

  it("leaves user object unchanged if action doesn't provide a new one", () => {
    const user = {id: "abc-123"};
    const currentState = {
      ...fakeState,
      user,
    };
    const newState = authReducer(currentState, {
      type: LOGIN,
    });
    expect(newState.user).toBe(user);
  });

  it("return the proper state for a LOGOUT action type and call logout function from auth module", () => {
    const newState = authReducer(fakeState, {type: LOGOUT});
    expect(newState).toEqual({
      user: {},
      isLoggedIn: false,
      landingPath: null,
      preActivationUser: {},
    });
  });

  it("return the proper state for a SET_LANDING_PATH action type", () => {
    const landingPath = "/fake/path";
    const newState = authReducer(fakeState, {
      type: SET_LANDING_PATH,
      path: landingPath,
    });
    expect(newState).toEqual({
      user: {},
      isLoggedIn: false,
      landingPath,
      preActivationUser: {},
    });
  });
});
