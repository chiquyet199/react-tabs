import {findLeaseByRenter, findLeaseByProperty} from "../lease";
import * as api from "../api";

jest.mock("../api.js");

describe("Lease endpoint tests", () => {
  describe("find by renter", () => {
    beforeEach(() => {
      api.get.mockClear();
    });

    it("should be a get request to /lease/findBy/renter", () => {
      findLeaseByRenter();
      expect(api.get).toHaveBeenCalledWith(
        "/lease/findBy/renter",
        expect.any(Object),
      );
    });

    it("should pass renterID in a FindByRenterRequest", () => {
      const renterID = "abc-123";
      findLeaseByRenter(renterID);
      expect(api.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({renterID}),
      );
    });
  });

  describe("find by property", () => {
    beforeEach(() => {
      api.get.mockClear();
    });

    it("should be a get request to /lease/findBy/property", () => {
      findLeaseByProperty();
      expect(api.get).toHaveBeenCalledWith(
        "/lease/findBy/property",
        expect.any(Object),
      );
    });

    it("should pass propertyID in a FindByPropertyRequest", () => {
      const propertyID = "abc-123";
      findLeaseByProperty(propertyID);
      expect(api.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({propertyID}),
      );
    });
  });
});
