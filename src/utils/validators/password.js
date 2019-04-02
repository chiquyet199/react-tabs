import {passwordRegex} from "./regex";

export const isValidPassword = (password, field) =>
  password && !password.match(passwordRegex) && {[field]: "invalidPassword"};

export const matchesConfirmPassword = (password, field, values) =>
  password &&
  password !== values.confirmPassword && {
    confirmPassword: "passwordsDontMatch",
  };
