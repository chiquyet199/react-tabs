import {post} from "./api";

export const inviteUser = values => post("/agency/agent/invite", values);

export const isEmailTaken = email =>
  post("/signup/checkEmailAvailable", {email});

export const inviteToLease = data => post("/lease/create", {data});
