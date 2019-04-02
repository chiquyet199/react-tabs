import {GET_AGENT, REMOVE_AGENT} from "../actions/types";

const initialState = {};

export default (state = initialState, {type, agent}) => {
  switch (type) {
    case GET_AGENT:
      return {...state, agent};

    case REMOVE_AGENT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
