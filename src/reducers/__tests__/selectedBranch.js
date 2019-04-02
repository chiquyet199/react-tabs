import selectedBranchReducer from "../selectedBranch";
import {LOGIN, UPDATE_SELECTED_BRANCH} from "../../actions/types";

const fakeState = {test: "fakeState"};

describe("Selected Branch reducer", () => {
  it("throws an error without an action", () => {
    expect(() => selectedBranchReducer(fakeState)).toThrow();
  });

  it("returns the same state without a matching action.type", () => {
    const newState = selectedBranchReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("returns the proper initialState when called without a state", () => {
    const newState = selectedBranchReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({
      branches: {ids: [], selected: ""},
    });
  });

  it("updates the state with the selectedBranch for a LOGIN action type, taking the first branch id", () => {
    const sampleResponse = getSampleResponse();
    const newState = selectedBranchReducer(fakeState, sampleResponse);
    expect(newState.branches.selected).toBe(sampleResponse.agent.branchIds[0]);
  });

  it("updates the state with selectable branches for a LOGIN action type", () => {
    const sampleResponse = getSampleResponse();
    const newState = selectedBranchReducer(fakeState, sampleResponse);
    expect(newState.branches.ids).toEqual(
      expect.arrayContaining(sampleResponse.agent.branchIds),
    );
  });

  it("updates the state with the selectedBranch for a UPDATE_SELECTED_BRANCH action type", () => {
    const state = {
      ...fakeState,
      branches: {
        ids: ["abc-123", "def-456"],
        selected: "abc-123",
      },
    };
    const newSelectedBranch = "def-456";
    const action = {
      type: UPDATE_SELECTED_BRANCH,
      newSelectedBranch,
    };
    const newState = selectedBranchReducer(state, action);
    expect(newState.branches.selected).toBe(newSelectedBranch);
  });

  const getSampleResponse = () => ({
    type: LOGIN,
    success: true,
    expires: 1539363048,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MDY1NzJkOC1jMGYyLTQ4MjktYmFiMi00ZTM2YTcyNzc5ZTMiLCJpc3MiOiJjYW5vcHkucmVudCIsImlhdCI6MTUzOTI3NjY0OCwiZXhwIjoxNTM5MzYzMDQ4LCJzdWIiOiI1ODYxMTFiOS1iNDdkLTQ5YTgtYmI3My02YWVkMThlYjA1MDUiLCJ0eXBlIjoiQUdFTlQifQ.Ftui5Yk-WBCh63555vvGm5i5iAlw0dPLfd_Dgcahs8Y",
    user: {
      id: "586111b9-b47d-49a8-bb73-6aed18eb0505",
      type: "AGENT",
      email: "matt@canopy.rent",
      firstName: "Matt",
      middleName: null,
      lastName: "Murdock",
      phone: null,
      dob: null,
      language: "en",
      marketing: false,
    },
    agent: {
      userId: "586111b9-b47d-49a8-bb73-6aed18eb0505",
      agencyId: "75606532-04be-4996-9c15-d762201116e0",
      role: "ADMIN",
      branchIds: ["ff6fde63-7c96-4ea6-9ee3-7c0458f5a55e", "abc-123-def-456"],
    },
    agency: {
      id: "75606532-04be-4996-9c15-d762201116e0",
      name: "Matt's Agency",
      type: "ESTATE_AGENCY",
      phone: "077123456789",
      address: {
        line1: "1 Main Street",
        postCode: "YO61 1LG",
        countryCode: "GB",
      },
      companyRegistrationNumber: "12345667",
      bankAccount: {
        accountHolder: "M Murdock",
        sortCode: "40-00-04",
        accountNumber: "12345678",
      },
      legalRepresentative: {
        firstName: "Matthew",
        lastName: "Murdock",
        address: {
          line1: "1 Main Street",
          postCode: "YO61 1LG",
          countryCode: "GB",
        },
        dob: "1985-01-01",
      },
      isActive: false,
    },
  });
});
