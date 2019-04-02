import rentPassportSharesBranches from "../rentPassportSharesBranches";
import {
  RENT_PASSPORTS_SHARES_RECEIVED,
  UNSHARE_PASSPORT,
} from "../../actions/types";
import {data as mockData} from "../../__mocks__/MockRentPassportShares.js";

const fakeState = {test: "fakeState"};

describe("rentPassportSharesBranches reducer", () => {
  it("throw an error without an action", () => {
    expect(() => rentPassportSharesBranches(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = rentPassportSharesBranches(fakeState, {
      type: "fakeAction",
    });
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without a state", () => {
    const newState = rentPassportSharesBranches(undefined, {
      type: "fakeAction",
    });
    expect(newState).toEqual({
      shared_properties: [],
      shared_branches: [],
      pending_requests: [],
    });
  });

  it("returns the expected state for RENT_PASSPORTS_SHARES_RECEIVED action", () => {
    const data = getRentPassportData();
    const newState = rentPassportSharesBranches(fakeState, {
      type: RENT_PASSPORTS_SHARES_RECEIVED,
      data,
    });
    expect(newState).toEqual(data);
  });

  it("return the proper state for a UNSHARE_PASSPORT action type", () => {
    const newState = rentPassportSharesBranches(undefined, {
      type: UNSHARE_PASSPORT,
    });
    expect(newState).toEqual({
      shared_properties: [],
      shared_branches: [],
      pending_requests: [],
    });
  });

  const getRentPassportData = () => mockData;
});
