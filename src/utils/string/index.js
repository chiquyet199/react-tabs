import {NBSP} from "../../constants/unicode";

export const capitalizeFirstLetter = string => {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
};

export const makeString = type => {
  const str = type
    .split("_")
    .join(" ")
    .toLowerCase();

  return capitalizeFirstLetter(str);
};

export const formatMoney = (number, currency = "", fractions = 2) =>
  `${currency} ${number
    .toFixed(fractions)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const formatAddress = (address, includePostcode = false) =>
  [
    address.line1,
    address.line2,
    address.town,
    includePostcode && address.postCode,
  ]
    .filter(it => !!it)
    .map(it => it.replace(/\s/g, NBSP)) // replace normal spaces with non-breaking spaces
    .join(", "); // put breakable spaces between the address elements

export const keyFromString = str =>
  str.replace(/\s/g, "_").replace(/[^A-Za-z0-9_]/g, "");
