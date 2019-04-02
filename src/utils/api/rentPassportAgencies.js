import {get, post} from "./api";

export const unsharePassport = values => post("/unsharePassport", values);
export const getBranchesShared = () => get("/branchesShared");
