import {alphaOnlyRegex} from "./regex";

export const isValidAlpha = (input, field) =>
  input && !input.match(alphaOnlyRegex) && {[field]: "onlyLetters"};
