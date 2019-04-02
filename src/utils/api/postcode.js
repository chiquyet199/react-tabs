import {post} from "./api";

export const postcodeLookup = (postCode, countryCode) =>
  post("/complete-address", {address: {postCode, countryCode}});
