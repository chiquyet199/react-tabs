import API from "../api";
import {errorNotification} from "../../actions/notifications";
import store from "../store/store";
import {emailRegex} from "./regex";

export const isValidEmail = email =>
  email && !email.toLowerCase().match(emailRegex) && {email: "invalidEmail"};

export const isEmailAvailable = email => {
  return API.isEmailTaken(email)
    .then(
      ({available}) => (!available ? {email: "emailTaken"} : true), // !available == taken
    )
    .catch(({error}) => {
      store.dispatch(errorNotification({error: error.message}));

      return {email: "invalidEmail"};
    });
};

export const isRequired = email => !email && {email: "required"};

export const signUpEmailValidation = async email =>
  isRequired(email) || isValidEmail(email) || isEmailAvailable(email);

export const emailValidation = email => isRequired(email);
