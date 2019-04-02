import API from "../utils/api";
import {
  sendLeaseRequest,
  findLeaseByRenter,
  leasesLookupResult,
  getPropertyActiveLease,
  findLeaseByProperty,
} from "./leases";
import {errorNotification} from "./notifications";
import {push} from "connected-react-router";
import {LEASES_LOOKUP_RESULT, GET_PROPERTY_ACTIVE_LEASE} from "./types";

jest.mock("../utils/api/invites");
jest.mock("../utils/api/lease");
jest.mock("./notifications");

describe("Lease action tests", () => {
  describe("getPropertyActiveLease action tests", () => {
    it("has type 'GET_PROPERTY_ACTIVE_LEASE'", () => {
      expect(getPropertyActiveLease().type).toBe(GET_PROPERTY_ACTIVE_LEASE);
    });

    it("has lease data", () => {
      const lease = getSampleLease();
      expect(getPropertyActiveLease(lease).value).toBe(lease);
    });
  });

  describe("leaseLookupResult action tests", () => {
    it("has type 'LEASES_LOOKUP_RESULT'", () => {
      expect(leasesLookupResult().type).toBe(LEASES_LOOKUP_RESULT);
    });

    it("has leases data", () => {
      const leases = getSampleLeases();
      expect(leasesLookupResult(leases).value).toBe(leases);
    });
  });

  describe("Invite to lease action creator test", () => {
    beforeEach(() => {
      errorNotification.mockClear();
      API.inviteToLease.mockClear();
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.inviteToLease.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeSendLease();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("dispatches push on success", async () => {
      const success = push("/invited-to-rent");
      API.inviteToLease.mockImplementation(async () => {
        return {success: true};
      });

      const dispatchFake = await invokeSendLease();
      expect(dispatchFake).toHaveBeenCalledWith(success);
    });

    it("calls inviteToLease", () => {
      const data = {data: "test"};
      invokeSendLease(data);
      expect(API.inviteToLease).toHaveBeenCalledWith({data});
    });

    const invokeSendLease = async data => {
      const dispatchFake = jest.fn();
      await sendLeaseRequest({data})(dispatchFake);

      return dispatchFake;
    };
  });

  describe("Find lease by renter action creator test", () => {
    beforeEach(() => {
      API.findLeaseByRenter.mockClear();
    });

    it("calls findLeaseByRenter on API with renter ID", () => {
      const renterID = "abc-123";
      invokeFindLeaseByRenter(renterID);
      expect(API.findLeaseByRenter).toHaveBeenCalledWith(renterID);
    });

    it("dispatches leasesLookupResult action when leases retrieved", async () => {
      const leases = getSampleLeases();
      const leasePromise = Promise.resolve(leases);
      API.findLeaseByRenter.mockImplementation(() => leasePromise);
      const dispatchFake = await invokeFindLeaseByRenter();
      expect(dispatchFake).toHaveBeenCalledWith(leasesLookupResult(leases));
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("API out to lunch");
      const en = {type: "FAKE_ERROR", message: error};
      API.findLeaseByRenter.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeFindLeaseByRenter();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeFindLeaseByRenter = async (renterID = "abc-132") => {
      const dispatchFake = jest.fn();
      await findLeaseByRenter(renterID)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("Find lease by property action creator test", () => {
    beforeEach(() => {
      API.findLeaseByProperty.mockClear();
    });

    it("calls findLeaseByRenter on API with renter ID", () => {
      const propertyID = "abc-123";
      invokeFindLeaseByProperty(propertyID);
      expect(API.findLeaseByProperty).toHaveBeenCalledWith(propertyID);
    });

    it("dispatches leasesLookupResult action when leases retrieved", async () => {
      const leases = getSampleLeases();
      const leasePromise = Promise.resolve(leases);
      API.findLeaseByProperty.mockImplementation(() => leasePromise);
      const dispatchFake = await invokeFindLeaseByProperty();
      expect(dispatchFake).toHaveBeenCalledWith(getPropertyActiveLease(leases));
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("API out to lunch");
      const en = {type: "FAKE_ERROR", message: error};
      API.findLeaseByProperty.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeFindLeaseByProperty();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeFindLeaseByProperty = async (propertyID = "abc-132") => {
      const dispatchFake = jest.fn();
      await findLeaseByProperty(propertyID)(dispatchFake);

      return dispatchFake;
    };
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
});
