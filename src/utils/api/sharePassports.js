import {post, get} from "./api";

/**
 * method removes property by id
 * @param {string} groupId - "groupId" required (canopy-backend/packages/service-gateway/schemas/agency/leads/RemovePropertyRequest.json)
 */
export const sharePropertyRentPassport = groupId =>
  post("/agencyLeads/shareRentPassport", {groupId});

// params is an object containing required branchId & status, along with other optional search criteria
export const getSharedRentPassports = params =>
  get("/shared-rent-passport/findPassports", params);
