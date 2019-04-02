import {GET_RENT_PASSPORT, DELETE_RENT_PASSPORT} from "./types";
import {getRentPassport, deleteRentPassport} from "../actions/rent-passport";

describe("getRentPassport tests", () => {
  it("has type of GET_RENT_PASSPORT", () => {
    expect(getRentPassport()).toEqual(
      expect.objectContaining({type: GET_RENT_PASSPORT}),
    );
  });

  it("has rent passport data", () => {
    const rentPassport = {
      userId: "67e4b887-466e-4abe-8d12-bc87204e5df8",
      status: "SUBMITTED",
    };

    expect(getRentPassport(rentPassport)).toEqual(
      expect.objectContaining({
        type: "GET_RENT_PASSPORT",
        rentPassport,
      }),
    );
  });
});

describe("deleteRentPassport tests", () => {
  it("has type of DELETE_RENT_PASSPORT", () => {
    expect(deleteRentPassport()).toEqual(
      expect.objectContaining({type: DELETE_RENT_PASSPORT}),
    );
  });
});
