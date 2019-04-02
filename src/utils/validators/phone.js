import {phoneRegex} from "./regex";

export const isValidPhoneNumber = (phoneNumber, field) =>
  phoneNumber &&
  !phoneNumber.match(phoneRegex) && {
    [field]: "invalidPhoneNumber",
  };

const isRequired = phoneNumber => !phoneNumber && {phoneNumber: "required"};

export const phoneValidation = phoneNumber => isRequired(phoneNumber);
