import {get, post, postFile} from "./api";
// eslint-disable-next-line no-unused-vars
import {defaultPassports, defaultProperty} from "./__mocks__/propertyMockData";

export const getProperties = (agencyId, branchId, searchParams) =>
  get("/properties", {agencyId, branchId, ...searchParams});

export const fetchPropertyById = propertyId =>
  // Promise.resolve(defaultProperty);
  get("/property/get", {propertyId});

/**
 * method fetches Rent Passport group for selected property by propertyId
 * @param {String} propertyId is required (request URL - packages/service-gateway/gateways/AgencyLeads.ts, request response - packages/canopy-types/lib/ShareRentPassport.ts)
 */
export const getPropertyRentPassportsGroup = propertyId =>
  // Promise.resolve(defaultPassports);
  get("/passportGroups", {propertyId});

/**
 * method removes Rent Passport from property
 * @param {Object} data - "branchId" and "renterId" are required (canopy-backend/packages/service-gateway/schemas/agency/leads/RemoveFromBranchRequest.json)
 */
export const removeRentPassportFromProperty = data =>
  post("/agencyLeads/removeFromBranch", data);

/**
 * method removes property by id
 * @param {Object} data - "groupId" and "propertyId" are required (canopy-backend/packages/service-gateway/schemas/agency/leads/RemovePropertyRequest.json)
 */
export const deleteSharedPropertyByIds = data =>
  post("/agencyLeads/removeProperty", data);

export const fetchSharedRentPassportsWithProperty = propertyId =>
  // Promise.resolve(defaultPassports);
  get("/agencyLeads/sharedPassportsForProperty", {propertyId});

export const uploadPropertyCSV = body => postFile("/properties/csv", body);

export const checkPropertyCSV = body =>
  postFile("/properties/csv?dryrun=true", body);
