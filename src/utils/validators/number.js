import {numberRegex, decimalRegex} from "./regex";

export const isOnlyNumber = (number, field) =>
  number && !number.match(numberRegex) && {[field]: "onlyNumbers"};

export const isDecimal = (number, field) =>
  number && !number.match(decimalRegex) && {[field]: "invalidNumber"};
