import {post} from "./api";

export const registerUserProfile = values => post("/user/profile", values);
