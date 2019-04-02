import {REMOVE_AGENT, GET_AGENT} from "./types";
import API from "../utils/api";
import {errorNotification} from "./notifications";

export const getAgent = agent => ({
  type: GET_AGENT,
  agent,
});

export const removeAgent = () => ({
  type: REMOVE_AGENT,
});

export const updateAgentById = data => async dispatch => {
  const agent = await API.updateAgentById(data).catch(({error}) =>
    dispatch(errorNotification(error)),
  );
  if (agent) {
    dispatch(getAgent(agent));
  }

  return agent;
};
