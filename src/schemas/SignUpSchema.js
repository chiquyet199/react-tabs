import {isRequired} from "../utils/validators/common";
import {signUpEmailValidation} from "../utils/validators/email";
import {isValidPassword} from "../utils/validators/password";

export const signUpSchema = {
  name: {
    progress: 0,
    next: "email",
    type: "object",
    title: "name",
    header: "What is your name?",
    properties: {
      firstName: {
        type: "string",
        title: "First Name",
        validations: [isRequired],
      },
      lastName: {
        type: "string",
        title: "Last Name",
        validations: [isRequired],
      },
    },
  },
  email: {
    progress: 33,
    next: "password",
    type: "object",
    title: "email",
    header: "What is your email?",
    properties: {
      email: {
        type: "string",
        title: "Email",
        validations: [isRequired, signUpEmailValidation],
      },
      marketing: {
        type: "boolean",
        title:
          "I'd like to receive occasional marketing and policy emails from Canopy and its partners.",
        uiComponent: "switch",
      },
    },
  },
  password: {
    progress: 66,
    next: "terms",
    type: "object",
    title: "password",
    header: "Create a password",
    properties: {
      info: {
        type: "string",
        title:
          "Your password must include one symbol and be 8 or more characters long",
        uiComponent: "text",
        align: "left",
      },
      password: {
        type: "string",
        title: "Password",
        uiComponent: "password",
        validations: [isRequired, isValidPassword],
      },
    },
  },
};
