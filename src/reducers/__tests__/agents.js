import {GET_AGENT, REMOVE_AGENT} from "../../actions/types";

const fakeState = {test: "fakeState"};

const agentsReducer = require("../agents").default;

describe("GET_AGENT reducer", () => {
  it("throw an error without an action", () => {
    expect(() => agentsReducer(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = agentsReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without a state", () => {
    const newState = agentsReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({});
  });

  it("return the proper state for a GET_AGENT action type", () => {
    const agent = {name: "test"};
    const newState = agentsReducer(undefined, {
      type: GET_AGENT,
      agent,
    });
    expect(newState).toEqual({agent});
  });
});

describe("REMOVE_AGENT reducer", () => {
  it("throw an error without an action", () => {
    expect(() => agentsReducer(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = agentsReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without a state", () => {
    const newState = agentsReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({});
  });

  it("return the proper state for a GET_AGENT action type", () => {
    const newState = agentsReducer(undefined, {
      type: REMOVE_AGENT,
    });
    expect(newState).toEqual({});
  });
});
