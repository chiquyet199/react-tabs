import {union} from "underscore";
import {
  GET_RENT_PASSPORTS,
  STORE_PASSPORT,
  STORE_PASSPORT_CHECKLIST,
  RESET_CHECKED_PASSPORTS,
  SET_BRANCH_RENT_PASSPORTS,
  RENT_PASSPORT_IS_ALREADY_SHARED,
} from "../actions/types";

const initialState = {
  passports: [],
  sharedWith: "",
  passportsChecked: false,
  passportsSelected: [],
  selectedPassport: "",
  alreadyShared: false,
};

const getPassportArray = (passportsSelected, passport) => {
  if (passportsSelected.length === 1 && passportsSelected[0] === passport) {
    return [];
  }
  const index = passportsSelected.indexOf(passport);
  if (index !== -1) {
    passportsSelected.splice(index, 1);

    return passportsSelected;
  }

  return union(passportsSelected, [passport]);
};
const getSelectedPassport = passportArray => {
  const [firstPassport] = passportArray;
  if (passportArray.length === 0) {
    return "";
  } else if ("pending" in firstPassport) {
    return "pending";
  }

  return "shared";
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RENT_PASSPORTS: {
      let passportsChecked;
      if (action.passports.length === 0) {
        passportsChecked = true;
      }

      return {...state, passports: action.passports, passportsChecked};
    }
    case STORE_PASSPORT:
      return {...state, sharedWith: action.passport.email};
    case SET_BRANCH_RENT_PASSPORTS:
      return {...state, passports: action.allPassports, alreadyShared: false};
    case RENT_PASSPORT_IS_ALREADY_SHARED:
      return {...state, alreadyShared: true};
    case STORE_PASSPORT_CHECKLIST: {
      const passportsSelected = getPassportArray(
        state.passportsSelected,
        action.passport,
      );
      const selectedPassport = getSelectedPassport(passportsSelected);

      return {
        ...state,
        passportsSelected,
        selectedPassport,
      };
    }
    case RESET_CHECKED_PASSPORTS:
      return {...state, passportsSelected: [], selectedPassport: ""};
    default:
      return state;
  }
};
