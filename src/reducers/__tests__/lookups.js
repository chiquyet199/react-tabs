import lookupReducer from "../lookups";
import {
  POSTCODE_LOOKUP_RESULT,
  LEASES_LOOKUP_RESULT,
  POSTCODE_CLEAR_RESULT,
  OPEN_BANKING_METADATA,
  OPEN_BANKING_TRANSACTIONS,
  OPEN_BANKING_TRANSACTIONS_CLEAR,
} from "../../actions/types";

const fakeState = {test: "fakeState"};

describe("Lookup Reducer", () => {
  it("throws an error without an action", () => {
    expect(() => lookupReducer(fakeState)).toThrow();
  });

  it("return the same state without a matching action.type", () => {
    const newState = lookupReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without a state", () => {
    const newState = lookupReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({
      addresses: [],
    });
  });

  it("returns the expected state for POSTCODE_LOOKUP_RESULT action", () => {
    const newState = lookupReducer(fakeState, {
      type: POSTCODE_LOOKUP_RESULT,
      values: [
        "1 Main Street, Stillington, York",
        "2 Main Street, Stillington, York",
        "3 Main Street, Stillington, York",
      ],
    });
    expect(newState).toEqual({
      test: "fakeState",
      addresses: [
        "1 Main Street, Stillington, York",
        "2 Main Street, Stillington, York",
        "3 Main Street, Stillington, York",
      ],
    });
  });

  it("clears the address lookup for POSTCODE", () => {
    const state = {
      test: "fakeState",
      addresses: [
        "1 Main Street, Stillington, York",
        "2 Main Street, Stillington, York",
        "3 Main Street, Stillington, York",
      ],
    };
    const newState = lookupReducer(state, {
      type: POSTCODE_CLEAR_RESULT,
    });
    expect(newState).toEqual({
      test: "fakeState",
    });
  });

  it("returns the expected state for LEASES_LOOKUP_RESULT action", () => {
    const leases = getSampleLeases();
    const newState = lookupReducer(fakeState, {
      type: LEASES_LOOKUP_RESULT,
      values: leases,
    });
    expect(newState).toEqual(expect.objectContaining({leases}));
  });

  it("returns the expected state for OPEN_BANKING_METADATA action", () => {
    const metadata = {
      provider: "FALSEPLATFORM",
      redirectUrl: "http://www.falseplatform.com",
    };
    const newState = lookupReducer(fakeState, {
      type: OPEN_BANKING_METADATA,
      values: metadata,
    });
    expect(newState).toEqual(
      expect.objectContaining({openBankingRedirectUrl: metadata.redirectUrl}),
    );
  });

  it("returns the expected state for OPEN_BANKING_TRANSACTIONS action", () => {
    const transactionsLookup = getFindPaymentsSample();
    const newState = lookupReducer(fakeState, {
      type: OPEN_BANKING_TRANSACTIONS,
      values: transactionsLookup,
    });
    expect(newState).toEqual(
      expect.objectContaining({
        transactionsLookup,
      }),
    );
  });

  it("clears the transactions lookup", () => {
    const transactionsLookup = getFindPaymentsSample();
    const state = {
      test: "fakeState",
      transactionsLookup,
    };
    const newState = lookupReducer(state, {
      type: OPEN_BANKING_TRANSACTIONS_CLEAR,
    });
    expect(newState).toEqual({
      test: "fakeState",
    });
  });

  const getSampleLeases = () => [
    getSampleLease(),
    getSampleLease("def-456"),
    getSampleLease("ghi-789"),
  ];

  const getSampleLease = (id = "abc-123") => ({
    id,
    branchId: "zyx-999",
    property: {},
    renters: [],
    agent: {},
    status: {},
    rentAmount: 999,
    rentFrequency: "MONTHLY",
    duration: {},
    conditionsFreeText: "",
    documents: [],
  });

  const getFindPaymentsSample = () => ({
    id: "6122ccc1-d2b5-49ce-4af2-44f72a2a7a0e",
    status: "SUCCESS",
    from: "2018-02-05",
    to: "2019-02-05",
    transactions: [
      {
        id: "4eb4a3d2cdffec975c6da61600e3044e",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2019-01-25T00:00:00+00:00",
      },
      {
        id: "262745b9a7592c674b07289f19a86525",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-12-27T00:00:00+00:00",
      },
      {
        id: "c1db32bf1422fd1ad88b46e2a882c57e",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-11-26T00:00:00+00:00",
      },
      {
        id: "67d97a8a73d3d0a578e77c418ff76a59",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-10-25T00:00:00+00:00",
      },
      {
        id: "f54a67dde9f3610e9080bbdb91b9296c",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-09-25T00:00:00+00:00",
      },
      {
        id: "351a0a54c527e11efc3d1a1fbb631e88",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-08-28T00:00:00+00:00",
      },
      {
        id: "c711ba91b9f320ffe3230fd9195b26da",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-07-25T00:00:00+00:00",
      },
      {
        id: "693cc5f02a0d4a2217f4d4f91824a334",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-06-25T00:00:00+00:00",
      },
      {
        id: "f094ced8efeb0fe31903c64095997c58",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-05-25T00:00:00+00:00",
      },
      {
        id: "04a1c844b2255941ed8530be051e2bee",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-04-25T00:00:00+00:00",
      },
      {
        id: "81ae280237cd65955551d6a6828de7e8",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-03-26T00:00:00+00:00",
      },
    ],
    candidates: [
      {
        id: "fe049e1a36bec356fac5d89dc88bc364",
        amount: -9908.62,
        currency: "GBP",
        reference: "BOUGHT THREE MORE HORSES",
        timestamp: "2019-02-01T00:00:00+00:00",
      },
      {
        id: "fe049e1a36bec356fac5d89dc88bc364",
        amount: -3308.62,
        currency: "GBP",
        reference: "BOUGHT A HORSE",
        timestamp: "2019-02-01T00:00:00+00:00",
      },
    ],
  });
});
