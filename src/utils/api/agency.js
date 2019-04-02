import {get, post} from "./api";

export const shareRentPassport = values =>
  post("/agencyLeads/shareRentPassport", values);

export const unshareRentPassport = values => post("/unsharePassport", values);

// request URL taken from => packages/service-gateway/gateways/AgencyLeads.ts
// request response taken from => packages/canopy-types/lib/ShareRentPassport.ts

export const getRentPassportsGroup = values =>
  get("/agencyLeads/passportGroups", values);

export const removePendingRequest = values =>
  post("/agencyLeads/removePendingRequest", values);

export const sendRightToRentProof = values =>
  post("/right-to-rent/createRightToRentCheck", values);
