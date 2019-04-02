import {
  GET_PROPERTY_LIST,
  GET_PROPERTY,
  GET_PROPERTY_PASSPORTS_GROUP,
  DELETE_PROPERTY,
  GET_PASSPORTS,
  GET_PROPERTY_ACTIVE_LEASE,
} from "../actions/types";

const initialState = {
  values: {},
  property: {},
  sharedRentPassports: [],
  passportsInvitedToRent: [],
};

export default (
  state = initialState,
  {type, value, rentPassportsGroup, property, passports},
) => {
  switch (type) {
    case GET_PROPERTY_LIST:
      return {
        ...state,
        values: value,
      };
    case GET_PROPERTY: {
      const _property = property.property;

      return {...state, property: _property};
    }
    case GET_PASSPORTS:
      return {...state, sharedRentPassports: passports};
    case GET_PROPERTY_PASSPORTS_GROUP:
      return {
        ...state,
        property: {...state.property, rentPassportsGroup},
      };
    case GET_PROPERTY_ACTIVE_LEASE:
      return {
        ...state,
        property: {...state.property, lease: value},
      };
    case DELETE_PROPERTY:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
