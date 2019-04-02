import {GET_RENT_PASSPORT, DELETE_RENT_PASSPORT} from "./types";

export const getRentPassport = rentPassport => ({
  type: GET_RENT_PASSPORT,
  rentPassport,
});
export const deleteRentPassport = () => ({
  type: DELETE_RENT_PASSPORT,
});
