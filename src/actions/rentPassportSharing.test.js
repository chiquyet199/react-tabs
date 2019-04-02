import * as RentPassportSharing from "./rentPassportSharing";
import API from "../utils/api";
import {infoNotification, errorNotification} from "./notifications";
import {showSpinner, hideSpinner} from "./spinner";
import {convert} from "../utils/RentPassportSharesConvertor";
import {RENT_PASSPORTS_SHARES_RECEIVED} from "./types";

jest.mock("../utils/api/sharePassports");
jest.mock("../utils/api/agencies");
jest.mock("../utils/api/branches");
jest.mock("./notifications");
jest.mock("./spinner");
jest.mock("../utils/RentPassportSharesConvertor");
// jest.mock("./rentPassportSharing");

describe("Rent Passport Sharing Action Creator tests", () => {
  describe("Share Rent Passport", () => {
    beforeEach(() => {
      API.sharePropertyRentPassport.mockClear();
      errorNotification.mockClear();
      infoNotification.mockClear();
    });

    it("passes given group id to sharePropertyRentPassport API method", () => {
      const groupId = "abc-123";
      invokeSharePropertyRentPassport(groupId);
      expect(API.sharePropertyRentPassport).toHaveBeenCalledWith(groupId);
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.sharePropertyRentPassport.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeSharePropertyRentPassport();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("dispatches info notification on share success", async () => {
      API.sharePropertyRentPassport.mockImplementation(() =>
        Promise.resolve({}),
      );
      await invokeSharePropertyRentPassport();
      expect(infoNotification).toHaveBeenCalled();
    });

    const invokeSharePropertyRentPassport = async groupId => {
      const dispatchFake = jest.fn();
      await RentPassportSharing.sharePropertyRentPassport(groupId)(
        dispatchFake,
      );

      return dispatchFake;
    };
  });

  describe("Unshare Rent Passport", () => {
    beforeEach(() => {
      API.deleteBranch.mockClear();
      errorNotification.mockClear();
      infoNotification.mockClear();
    });

    it("passes renterId and branchId to deleteBranch", () => {
      const params = {
        branchId: "abc-123",
        renterId: "def-456",
      };
      invokeUnsharePassport(params);
      expect(API.deleteBranch).toHaveBeenCalledWith(params);
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.deleteBranch.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeUnsharePassport();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("dispatches info notification on share success", async () => {
      API.deleteBranch.mockImplementation(() => Promise.resolve({}));
      await invokeUnsharePassport();
      expect(infoNotification).toHaveBeenCalled();
    });

    const invokeUnsharePassport = async (params = {}) => {
      const dispatchFake = jest.fn();
      await RentPassportSharing.unsharePassport(params)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("Get Rent Passport Shares", () => {
    beforeEach(() => {
      clearGetRentPassportMocks();
    });

    it("dispatches show spinner action", async () => {
      await testShowSpinner(invokeGetSharedBranches);
    });

    it("invokes getRentPassportShares", async () => {
      await testInvokesGetRentPassportShares(invokeGetSharedBranches);
    });

    it("dispatches error notification on service failure", async () => {
      await testDispatchErrorNotificationOnServiceFailure(
        invokeGetSharedBranches,
      );
    });

    it("dispatches converted data in RENT_PASSPORTS_SHARES_RECEIVED action", async () => {
      await testDispatchConvertedData(invokeGetSharedBranches);
    });

    it("dispatches hideSpinner action", async () => {
      await testDispatchHideSpinner(invokeGetSharedBranches);
    });

    const invokeGetSharedBranches = async () => {
      const dispatchFake = jest.fn();
      await RentPassportSharing.getSharedBranches()(dispatchFake);

      return dispatchFake;
    };
  });

  const clearGetRentPassportMocks = () => {
    showSpinner.mockClear();
    hideSpinner.mockClear();
    API.getRentPassportShares.mockClear();
    convert.mockClear();
  };

  const testShowSpinner = async invoker => {
    const showSpinnerAction = {};
    showSpinner.mockImplementation(() => showSpinnerAction);
    const dispatch = await invoker();
    expect(showSpinner).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(showSpinnerAction);
  };

  const testInvokesGetRentPassportShares = async invoker => {
    await invoker();
    expect(API.getRentPassportShares).toHaveBeenCalled();
  };

  const testDispatchErrorNotificationOnServiceFailure = async invoker => {
    const error = new Error("Unable to contact API service");
    const en = {type: "FAKE_ERROR", message: error};
    API.getRentPassportShares.mockImplementation(async () => {
      throw error;
    });
    errorNotification.mockImplementation(() => {
      return en;
    });
    const dispatchFake = await invoker();
    expect(errorNotification).toHaveBeenCalled();
    expect(dispatchFake).toHaveBeenCalledWith(en);
  };

  const testDispatchConvertedData = async invoker => {
    const rentPassportShares = {abc: 123};
    const convertedData = {def: 456};
    API.getRentPassportShares.mockImplementation(() =>
      Promise.resolve(rentPassportShares),
    );
    convert.mockImplementation(() => convertedData);
    const dispatchFake = await invoker();
    expect(dispatchFake).toHaveBeenCalledWith(
      expect.objectContaining({
        type: RENT_PASSPORTS_SHARES_RECEIVED,
        data: convertedData,
      }),
    );
  };

  const testDispatchHideSpinner = async invoker => {
    const hideSpinnerAction = {};
    hideSpinner.mockImplementation(() => hideSpinnerAction);
    const dispatchFake = await invoker();
    expect(hideSpinner).toHaveBeenCalled();
    expect(dispatchFake).toHaveBeenCalledWith(hideSpinnerAction);
  };
});
