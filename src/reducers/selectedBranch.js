import {LOGIN, UPDATE_SELECTED_BRANCH} from "../actions/types";

const initialState = {
  branches: {
    ids: [],
    selected: "",
  },
};

const isLoginActionWithUserBranch = action =>
  action.type === LOGIN && action.agent && action.agent.branchIds.length;

export default (state = initialState, action) => {
  if (isLoginActionWithUserBranch(action)) {
    const [selected] = action.agent.branchIds;

    return {
      ...state,
      branches: {
        ids: action.agent.branchIds,
        selected,
      },
    };
  } else if (action.type === UPDATE_SELECTED_BRANCH) {
    const selected = action.newSelectedBranch;

    return {
      ...state,
      branches: {
        ids: state.branches.ids,
        selected,
      },
    };
  }

  return state;
};
