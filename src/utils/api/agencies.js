import {get, post} from "./api";

export const getAgencyBranches = agencyId => get("/branch/getMany", agencyId);
export const getRentPassportShares = () => get("/agencyLeads/branchesShared");
export const createBranch = values => post("/agency/branch/create", values);
