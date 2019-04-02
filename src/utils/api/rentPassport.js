import {post, get} from "./api";

export const generateRentPassport = values =>
  post("/rent-passport/submit", values);

export const searchRentPassports = values =>
  get("/search-rent-passports", values);

export const inviteToSharePassport = values =>
  post("/agencyLeads/requestShareRentPassport", values);

export const removeSharedPassport = rentPassport =>
  post("/agencyLeads/unsharePassport", rentPassport);

export const removePendingPassportRequest = rentPassport =>
  post("/agencyLeads/removePendingRequest", rentPassport);

export const getRentPassport = () => get("/rent-passport");

export const storeRentPassportData = values => post("/rent-passport", values);

export const sendIncomeValues = values => post("/rent-passport", values);
