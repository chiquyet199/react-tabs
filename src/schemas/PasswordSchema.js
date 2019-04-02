import {isRequired} from "../utils/validators/common";
import {isValidEmail} from "../utils/validators/email";
import {
  isValidPassword,
  matchesConfirmPassword,
} from "../utils/validators/password";

export const passwordSchema = ({forgotPassword, resetPassword}) => ({
  forgot: {
    type: "object",
    header: forgotPassword.heading,
    properties: {
      info: {
        type: "string",
        title: forgotPassword.enterEmail,
        uiComponent: "text",
        align: "left",
        autoFocus: true,
      },
      valueOne: {
        type: "string",
        title: forgotPassword.emailAddress,
        validations: [isRequired, isValidEmail],
      },
    },
  },
  reset: {
    type: "object",
    header: resetPassword.heading,
    properties: {
      info: {
        type: "string",
        title: resetPassword.passwordRules,
        uiComponent: "text",
        align: "left",
      },
      valueOne: {
        type: "string",
        title: resetPassword.newPassword,
        uiComponent: "password",
        validations: [isRequired, isValidPassword, matchesConfirmPassword],
      },
      confirmPassword: {
        const: {
          $data: "1/password",
        },
        type: "string",
        title: resetPassword.confirmPassword,
        uiComponent: "password",
        validations: [isRequired],
      },
    },
  },
});
