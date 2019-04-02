import API from "../utils/api";
import {
  unshareRentPassport,
  fetchRentPassports,
  removePendingRequest,
  removeFromBranch,
  removeFromProperty,
} from "./agency";
import {errorNotification, infoNotification} from "./notifications";

jest.mock("../utils/api/agency");
jest.mock("../utils/api/properties");
jest.mock("./notifications");

describe("Agency action tests", () => {
  beforeEach(() => {
    API.getRentPassportsGroup.mockClear();
    API.unshareRentPassport.mockClear();
    API.removePendingRequest.mockClear();
    API.removeRentPassportFromProperty.mockClear();

    errorNotification.mockClear();
  });

  describe("unshareRentPassport tests", () => {
    it("calls unshareRentPassport on API", () => {
      invokeUnshareRentPassport();
      expect(API.unshareRentPassport).toHaveBeenCalled();
    });

    it("passes groupId and renterId to removePendingRequest API call and calls info notification", async () => {
      const values = {
        groupId: 123,
        renterId: 123,
      };

      await invokeUnshareRentPassport(values);
      await expect(API.unshareRentPassport).toHaveBeenCalledWith(values);
      await expect(infoNotification).toHaveBeenCalled();
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.unshareRentPassport.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeUnshareRentPassport();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("returns error on service failure", async () => {
      const error = new Error("Unable to contact API service");
      API.unshareRentPassport.mockImplementation(async () => {
        throw error;
      });
      const {result} = await invokeUnshareRentPassport();
      expect(result).toEqual(expect.objectContaining(error));
    });

    const invokeUnshareRentPassport = async values => {
      const dispatchFake = jest.fn();
      const result = await unshareRentPassport(values)(dispatchFake);

      return {dispatchFake, result};
    };
  });

  describe("fetchRentPassports tests", () => {
    it("calls fetchRentPassports on API", () => {
      invokeFetchRentPassports({
        branchId: 777,
        params: {},
      });
      expect(API.getRentPassportsGroup).toHaveBeenCalled();
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.getRentPassportsGroup.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeFetchRentPassports({
        branchId: 777,
        params: {},
      });
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("returns error on service failure", async () => {
      const error = new Error("Unable to contact API service");
      API.getRentPassportsGroup.mockImplementation(async () => {
        throw error;
      });
      const {result} = await invokeFetchRentPassports({
        branchId: 777,
        params: {},
      });
      expect(result).toEqual(expect.objectContaining(error));
    });

    const invokeFetchRentPassports = async ({branchId, params}) => {
      const dispatchFake = jest.fn();
      const result = await fetchRentPassports(branchId, {params})(dispatchFake);

      return {dispatchFake, result};
    };
  });

  describe("removePendingRequest tests", () => {
    it("calls removePendingRequest on API", () => {
      invokeRemovePendingRequest();
      expect(API.removePendingRequest).toHaveBeenCalled();
    });

    it("passes groupId and email to removePendingRequest API call and calls info notification", async () => {
      const values = {
        groupId: "HgecS1p1ccc8ZtfThdgJ",
        email: "max@gmail.com",
      };
      await invokeRemovePendingRequest(values);
      await expect(API.removePendingRequest).toHaveBeenCalledWith(values);
      await expect(infoNotification).toHaveBeenCalled();
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.removePendingRequest.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeRemovePendingRequest();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("returns error on service failure", async () => {
      const error = new Error("Unable to contact API service");
      API.removePendingRequest.mockImplementation(async () => {
        throw error;
      });
      const {result} = await invokeRemovePendingRequest();
      expect(result).toEqual(expect.objectContaining(error));
    });

    const invokeRemovePendingRequest = async values => {
      const dispatchFake = jest.fn();
      const result = await removePendingRequest(values)(dispatchFake);

      return {dispatchFake, result};
    };
  });

  describe("removeFromBranch tests", () => {
    it("calls removeFromBranch on API", () => {
      invokeRemoveFromBranch();
      expect(API.removeRentPassportFromProperty).toHaveBeenCalled();
    });

    it("passes groupId and renterId to removeRentPassportFromProperty API call and calls info notification", async () => {
      const values = {
        groupId: "HgecS1p1ccc8ZtfThdgJ",
        renterId: "renterId",
      };
      await invokeRemoveFromBranch(values);
      await expect(API.removeRentPassportFromProperty).toHaveBeenCalledWith(
        values,
      );
      await expect(infoNotification).toHaveBeenCalled();
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.removeRentPassportFromProperty.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeRemoveFromBranch();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("returns error on service failure", async () => {
      const error = new Error("Unable to contact API service");
      API.removeRentPassportFromProperty.mockImplementation(async () => {
        throw error;
      });
      const {result} = await invokeRemoveFromBranch();
      expect(result).toEqual(expect.objectContaining(error));
    });

    const invokeRemoveFromBranch = async values => {
      const dispatchFake = jest.fn();
      const result = await removeFromBranch(values)(dispatchFake);

      return {dispatchFake, result};
    };
  });

  describe("removeFromProperty tests", () => {
    it("calls deleteSharedPropertyByIds on API", () => {
      invokeRemoveFromProperty();
      expect(API.deleteSharedPropertyByIds).toHaveBeenCalled();
    });

    it("passes groupId and propertyId to deleteSharedPropertyByIds API call and calls info notification", async () => {
      const values = {
        groupId: "HgecS1p1ccc8ZtfThdgJ",
        propertyId: "propertyId",
      };
      await invokeRemoveFromProperty(values);
      await expect(API.deleteSharedPropertyByIds).toHaveBeenCalledWith(values);
      await expect(infoNotification).toHaveBeenCalled();
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.deleteSharedPropertyByIds.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeRemoveFromProperty();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("returns error on service failure", async () => {
      const error = new Error("Unable to contact API Service");
      API.deleteSharedPropertyByIds.mockImplementation(async () => {
        throw error;
      });
      const {result} = await invokeRemoveFromProperty();
      expect(result).toEqual(expect.objectContaining(error));
    });

    const invokeRemoveFromProperty = async values => {
      const dispatchFake = jest.fn();
      const result = await removeFromProperty(values)(dispatchFake);

      return {dispatchFake, result};
    };
  });
});
