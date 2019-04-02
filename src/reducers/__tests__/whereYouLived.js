import whereYouLivedReducer from "../whereYouLived";
import {GET_RENT_PASSPORT, DELETE_RENT_PASSPORT} from "../../actions/types";
import goodRentPassport from "../../__mocks__/goodRentPassport";

const fakeState = {test: "fakeState"};

describe("Where You Lived Rent Passport Reducer", () => {
  it("throws an error without an action", () => {
    expect(() => whereYouLivedReducer(fakeState)).toThrow();
  });

  it("will return the same state without a matching action.type", () => {
    const newState = whereYouLivedReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without state", () => {
    const newState = whereYouLivedReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({});
  });

  it("returns the expected state for GET_RENT_PASSPORT action", () => {
    const data = getRentPassportData();
    const newState = whereYouLivedReducer(fakeState, {
      type: GET_RENT_PASSPORT,
      rentPassport: data,
    });
    expect(newState).toEqual({...fakeState, residenceInfo: data.residenceInfo});
  });

  it("return the proper state for a DELETE_RENT_PASSPORT action type", () => {
    const newState = whereYouLivedReducer(undefined, {
      type: DELETE_RENT_PASSPORT,
    });
    expect(newState).toEqual({});
  });

  const getRentPassportData = () => goodRentPassport;
});
