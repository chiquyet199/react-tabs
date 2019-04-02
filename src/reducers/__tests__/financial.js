import financialReducer from "../financial";
import {
  GET_RENT_PASSPORT,
  DELETE_RENT_PASSPORT,
  OPEN_BANKING_CREDENTIALS_VERIFIED,
} from "../../actions/types";
import goodRentPassport from "../../__mocks__/goodRentPassport";
import RentPassportHelpers from "../../utils/helpers/rentPassport";

const fakeState = {test: "fakeState"};
jest.mock("../../utils/helpers/rentPassport");

describe("Financial Rent Passport Reducer", () => {
  const setupStatusFromMultipleStatusMock = (returnedStatus = "GREEN") => {
    RentPassportHelpers.getStatusFromMultipleStatuses.mockImplementation(
      () => returnedStatus,
    );
  };

  afterEach(() => {
    RentPassportHelpers.getStatusFromMultipleStatuses.mockReset();
  });

  it("throws an error without an action", () => {
    expect(() => financialReducer(fakeState)).toThrow();
  });

  it("will return the same state without a matching action.type", () => {
    const newState = financialReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without state", () => {
    const newState = financialReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({});
  });

  it("returns the expected state for GET_RENT_PASSPORT action", () => {
    setupStatusFromMultipleStatusMock("YELLOW");
    const data = getRentPassportData();
    const newState = financialReducer(fakeState, {
      type: GET_RENT_PASSPORT,
      rentPassport: data,
    });

    expect(newState).toEqual({
      ...fakeState,
      ...data.annualIncomeInfo,
      ...data.financialInfo,
      status: "YELLOW",
      messages: [],
    });
  });

  it("passes valid arguments to getStatusFromMultipleStatuses when rent passport has no data", () => {
    financialReducer(fakeState, {
      type: GET_RENT_PASSPORT,
      rentPassport: getPendingRentPassport(),
    });

    expect(
      RentPassportHelpers.getStatusFromMultipleStatuses,
    ).not.toHaveBeenCalled();
  });

  it("parses pending rent passport", () => {
    setupStatusFromMultipleStatusMock("NONE");
    const data = getPendingRentPassport();
    const newState = financialReducer(fakeState, {
      type: GET_RENT_PASSPORT,
      rentPassport: data,
    });
    expect(newState).toEqual(fakeState);
  });

  it("return the proper state for a DELETE_RENT_PASSPORT action type", () => {
    const newState = financialReducer(undefined, {
      type: DELETE_RENT_PASSPORT,
    });
    expect(newState).toEqual({});
  });

  it("adds openBankingCredentialsVerified key for OPEN_BANKING_CREDENTIALS_VERIFIED action", () => {
    const newState = financialReducer(fakeState, {
      type: OPEN_BANKING_CREDENTIALS_VERIFIED,
      isAuthorised: true,
    });
    expect(newState).toEqual(
      expect.objectContaining({
        ...fakeState,
        openBankingCredentialsVerified: true,
      }),
    );
  });

  it("adds openBankingCredentialsVerified key with false value", () => {
    const newState = financialReducer(fakeState, {
      type: OPEN_BANKING_CREDENTIALS_VERIFIED,
      isAuthorised: false,
    });
    expect(newState.openBankingCredentialsVerified === false).toBeTruthy();
  });

  const getRentPassportData = () => goodRentPassport;

  const getPendingRentPassport = () => ({status: "PENDING", userId: "abc-123"});
});
