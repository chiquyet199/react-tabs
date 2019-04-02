import {
  LOGIN,
  LOGOUT,
  LOGIN_FACEBOOK,
  PRE_ACTIVATION_LOGIN,
  SET_LANDING_PATH,
  STORE_USER,
} from "../actions/types";

const initialState = {
  user: {},
  isLoggedIn: false,
  landingPath: null,
  preActivationUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const user = action.user || state.user;

      const newState = {
        ...state,
        user,
        isLoggedIn: true,
        preActivationUser: {},
      };
      if (action.agent) {
        newState.user.agencyId = action.agent.agencyId;
        [newState.user.branchId] = action.agent.branchIds;
        newState.user.agent = action.agent;
      }
      if (action.agency) {
        newState.user.agency = {
          id: action.agency.id,
          name: action.agency.name,
        };
      }

      return newState;
    }
    case PRE_ACTIVATION_LOGIN: {
      return {
        ...state,
        preActivationUser: action.payload,
      };
    }
    case LOGIN_FACEBOOK:
      return {
        ...state,
        facebookAccessToken: action.user,
      };
    case LOGOUT:
      return {...initialState};
    case STORE_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_LANDING_PATH:
      return {
        ...state,
        landingPath: action.path,
      };
    default:
      return state;
  }
};
