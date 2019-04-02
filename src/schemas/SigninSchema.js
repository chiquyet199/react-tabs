import {isRequired} from "../utils/validators/common";
import {isValidEmail} from "../utils/validators/email";

export default ({next}) => {
  return {
    next: next || "/rent-passport",
    type: "object",
    title: "Sign in",
    header: "Sign in",
    defaultErrorMessage: "A problem has occurred",
    buttonText: "Sign in",
    properties: {
      email: {
        type: "string",
        title: "Email",
        validations: [isRequired, isValidEmail],
        autoFocus: true,
      },
      password: {
        type: "string",
        title: "Password",
        uiComponent: "password",
        validations: [isRequired],
      },
    },
  };
};
