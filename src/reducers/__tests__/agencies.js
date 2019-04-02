import agenciesReducer from "../agencies";
import {GET_AGENCY_BRANCHES} from "../../actions/types";

const fakeState = {test: "fakeState"};

describe("Agencies Reducer", () => {
  it("throws an error without an action", () => {
    expect(() => agenciesReducer(fakeState)).toThrow();
  });

  it("will return the same state without a matching action.type", () => {
    const newState = agenciesReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without state", () => {
    const newState = agenciesReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({
      branches: [],
    });
  });

  it("returns the expected state for GET_AGENCY_BRANCHES action", () => {
    const data = getBranchesList();
    const newState = agenciesReducer(fakeState, {
      type: GET_AGENCY_BRANCHES,
      value: data,
    });
    expect(newState).toEqual({
      test: "fakeState",
      branches: data,
    });
  });

  const getBranchesList = () => [
    {
      id: 0,
      agencyId: 0,
      name: "Branch 0",
      address: {
        line1: "Address 0",
        town: "Town 0",
        state: "State0",
        postCode: "AA12345",
        countryCode: "UK",
      },
      phone: "3434435345634",
    },
    {
      id: 1,
      agencyId: 1,
      name: "Branch 1",
      address: {
        line1: "Address 1",
        town: "Town 1",
        state: "State1",
        postCode: "AA12345",
        countryCode: "UK",
      },
      phone: "3434435345634",
    },
    {
      id: 2,
      agencyId: 2,
      name: "Branch 2",
      address: {
        line1: "Address 2",
        town: "Town 2",
        state: "State2",
        postCode: "AA12345",
        countryCode: "UK",
      },
      phone: "3434435345634",
    },
  ];
});
