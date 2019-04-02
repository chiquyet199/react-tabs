// TODO update User / Tenant Object
import {GET_USER, GET_USER_PREFERENCES} from "../actions/types";

const initialState = {
  profile: {},
};

export default (state = initialState, action) => {
  const {type, user, userPreferences} = action;

  switch (type) {
    case GET_USER:
      return {...state, profile: user};

    case GET_USER_PREFERENCES:
      return {...state, userNotificationPreferences: userPreferences};
    default:
      return state;
  }
};
