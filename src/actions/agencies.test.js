import {
  getAgencyBranches,
  fetchAgencyBranches,
  createNewBranch,
} from "../actions/agencies";
import {GET_AGENCY_BRANCHES} from "./types";
import API from "../utils/api";
import {errorNotification} from "./notifications";

jest.mock("../utils/api/agencies");
jest.mock("../actions/notifications");

describe("Agencies actions tests", () => {
  describe("getAgencyBranches tests", () => {
    it("has type of GET_AGENCY_BRANCHES", () => {
      expect(getAgencyBranches()).toEqual(
        expect.objectContaining({type: GET_AGENCY_BRANCHES}),
      );
    });

    it("has agency branch data", () => {
      const values = {id: "11", name: "test"};
      expect(getAgencyBranches(values)).toEqual(
        expect.objectContaining({
          type: "GET_AGENCY_BRANCHES",
          value: values,
        }),
      );
    });
  });

  describe("fetchAgencyBranches tests", () => {
    beforeEach(() => {
      API.getAgencyBranches.mockClear();

      errorNotification.mockClear();
    });

    it("calls fetch agency branches function", () => {
      invokeFetchAgencyBranches(null);
      expect(API.getAgencyBranches).toHaveBeenCalled();
    });

    it("passes agencyId to fetch agency branches function", () => {
      const agencyId = 99;
      invokeFetchAgencyBranches(agencyId);
      expect(API.getAgencyBranches).toHaveBeenCalledWith(agencyId);
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const err = {type: "FAKE_ERROR", message: error};
      API.getAgencyBranches.mockImplementation(() => {
        return Promise.reject(error);
      });
      errorNotification.mockImplementation(() => {
        return err;
      });
      let dispatchFake;
      try {
        dispatchFake = await invokeFetchAgencyBranches(null);
      } catch (thrownError) {
        expect(errorNotification).toHaveBeenCalled();
        expect(dispatchFake).toHaveBeenCalledWith(err);
        expect(thrownError).toBe(err);
      }
    });

    it("passes agencyId to create new branch  function", () => {
      const newBranch = {address: "21 York Street"};
      const user = {agencyId: "12345"};
      const result = Object.assign(newBranch, user);
      invokeCreateBranch(newBranch, user);
      expect(API.createBranch).toHaveBeenCalledWith(result);
    });

    it("dispatches error notification on create new branch service failure", async () => {
      const newBranch = {address: "21 York Street"};
      const user = {agencyId: "12345"};
      const error = new Error("Unable to contact API service");
      const err = {type: "FAKE_ERROR", message: error};
      API.createBranch.mockImplementation(() => {
        return Promise.reject(error);
      });
      errorNotification.mockImplementation(() => {
        return err;
      });
      let dispatchFake;
      try {
        dispatchFake = await invokeCreateBranch(newBranch, user);
      } catch (thrownError) {
        expect(errorNotification).toHaveBeenCalled();
        expect(dispatchFake).toHaveBeenCalledWith(err);
        expect(thrownError).toBe(err);
      }
    });

    const invokeFetchAgencyBranches = async agencyId => {
      const dispatchFake = jest.fn();
      await fetchAgencyBranches(agencyId)(dispatchFake);

      return dispatchFake;
    };

    const invokeCreateBranch = async (newBranch, user) => {
      const dispatchFake = jest.fn();
      await createNewBranch(newBranch, user)(dispatchFake);

      return dispatchFake;
    };
  });
});
