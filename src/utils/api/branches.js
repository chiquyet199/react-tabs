import {get, post} from "./api";
// @params includes the required agencyId, along with searching and sorting params
export const getBranches = params => get("/agency/branch/getMany", params);
export const deleteBranch = values =>
  post("/agencyLeads/removeFromBranch", values);
