import {get} from "./api";

export const findLeaseByRenter = renterID =>
  get("/lease/findBy/renter", {renterID});

export const findLeaseByProperty = propertyID =>
  get("/lease/findBy/property", {propertyID});
