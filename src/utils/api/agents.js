import {get, del, post} from "./api";

export const registerEmailAgentUser = data =>
  post("/agent/auth/register/email", data);

export const acceptAgentInvitation = data =>
  post("/agency/agent/acceptInvite", data);

export const requestVerifyAgentEmail = userId =>
  post("/agent/auth/resendConfirmationEmail", {userId});

export const fetchAgentById = agentId => get("/agency/agent/get", {agentId});

export const updateAgentById = data => post("/agency/agent/update", data);

export const removeAgentById = agentId =>
  del("/agency/agent/delete", {agentId});
