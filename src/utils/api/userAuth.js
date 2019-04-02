import {get, post} from "./api";

export const registerUser = values => post("/signup/email", values);

export const registerUserFacebook = values => post("/signup/oauth", values);

export const facebookLoginAttempt = values => post("/auth/login/oauth", values);

export const sendAgentPasswordResetEmail = email =>
  post("/agent/auth/requestPasswordReset", {email});

export const resetAgentPassword = body =>
  post("/agent/auth/confirmPasswordReset", body);

export const sendUserPasswordResetEmail = email =>
  post("/user/auth/requestPasswordReset", {email});

export const resetUserPassword = body =>
  post("/user/auth/confirmPasswordReset", body);

export const isEmailTaken = email =>
  post("/signup/checkEmailAvailable", {email}).then(
    ({available}) => !available,
  ); // !available == taken

export const login = values => post("/auth/login/email", values);

export const agentLogin = values => post("/agent/auth/login/email", values);

export const requestVerifyEmail = userId =>
  post("/signup/resendConfirmationEmail", {userId});

export const verifyEmail = token => post("/signup/confirm", {token});

export const getUserById = userId => get("/getUser", {userId});

export const getAgencyUsers = agencyId =>
  get("/agency/agentUsers/get", agencyId);

export const updateUser = user => post("/updateUser", user);
