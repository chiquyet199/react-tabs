import {
  GET_PROPERTY,
  DELETE_PROPERTY,
  GET_PASSPORTS,
  GET_PROPERTY_PASSPORTS_GROUP,
} from "./types";
import * as API from "../utils/api";
import * as NotificationsAction from "./notifications";
import {push} from "connected-react-router";
import store from "../utils/store/store";

const rentPassportSharedTranslation = store.getState().locale.translations
  .rent_passport_shared_success;

export const getProperty = property => ({
  type: GET_PROPERTY,
  property,
});

export const deleteProperty = () => ({
  type: DELETE_PROPERTY,
});

export const fetchPropertyById = propertyId => async dispatch => {
  const property = await API.default
    .fetchPropertyById(propertyId)
    .catch(({error}) => dispatch(NotificationsAction.errorNotification(error)));

  if (property) {
    dispatch(getProperty(property));
  }
};

export const fetchSharedPassportsWithProperty = propertyId => async dispatch => {
  const passports = await API.default
    .fetchSharedRentPassportsWithProperty(propertyId)
    .catch(({error}) => dispatch(NotificationsAction.errorNotification(error)));

  if (passports) {
    dispatch(getPassports(passports));
  }
};

export const getPassports = passports => ({
  type: GET_PASSPORTS,
  passports,
});

export const deleteSharedPropertyByIds = data => async dispatch => {
  const property = await API.default
    .deleteSharedPropertyByIds(data)
    .catch(({error}) => dispatch(NotificationsAction.errorNotification(error)));

  if (property) {
    dispatch(deleteProperty(property));
    dispatch(push("/properties"));
  }
};

export const sharePropertyRentPassport = groupId => async dispatch => {
  const passport = await API.default
    .sharePropertyRentPassport(groupId)
    .catch(({error}) => dispatch(NotificationsAction.errorNotification(error)));
  if (passport) {
    dispatch(
      NotificationsAction.infoNotification(rentPassportSharedTranslation),
    );
  }
};

export const setPassportsGroup = rentPassportsGroup => ({
  type: GET_PROPERTY_PASSPORTS_GROUP,
  rentPassportsGroup,
});
