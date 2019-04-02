import API from "../utils/api";
import {
  checkForPassports,
  sendRentPassportRequest,
  storePassport,
  getPassports,
  deletePassportsFromProperty,
  deletePendingPassportRequest,
  requestRentPassportByEmail,
  setAllPassports,
  checkIfPassportIsAlreadyShared,
} from "./requestPassport";
import {errorNotification} from "./notifications";
import {
  GET_RENT_PASSPORTS,
  SET_BRANCH_RENT_PASSPORTS,
  STORE_PASSPORT,
} from "./types";

jest.mock("../utils/api/rentPassport");
jest.mock("../utils/api/agency");
jest.mock("./notifications");

const values = {
  branchId: "ece-abc-ef12",
  emails: ["max@gmail.com"],
};

describe("Request Rent Passport Tests", () => {
  const rentPassportGroupsResponse = () => {
    return [{name: "Max", email: "max@gmail.com"}];
  };

  beforeEach(() => {
    API.inviteToSharePassport.mockClear();
    API.searchRentPassports.mockClear();
    API.generateRentPassport.mockClear();
    API.removeSharedPassport.mockClear();
    API.removePendingPassportRequest.mockClear();
    errorNotification.mockClear();
    API.getRentPassportsGroup.mockClear();
  });

  describe("Request Rent Passport tests", () => {
    describe("Get Passport & store Passport test", () => {
      it("Get passport has passport and type", () => {
        expect(getPassports("passport")).toEqual(
          expect.objectContaining({
            type: GET_RENT_PASSPORTS,
            passports: "passport",
          }),
        );
      });

      it("Store passport has passport and type", () => {
        expect(storePassport("passport")).toEqual(
          expect.objectContaining({
            type: STORE_PASSPORT,
            passport: "passport",
          }),
        );
      });
    });

    describe("Check for Passports test", () => {
      it("calls checkForPassports", () => {
        invokeCheckForPassports();
        expect(API.searchRentPassports).toHaveBeenCalled();
      });

      it("passes email to checkForPassports", () => {
        const email = "test@";
        invokeCheckForPassports(email);
        expect(API.searchRentPassports).toHaveBeenCalledWith(email);
      });

      it("passes passport to deletePassports", () => {
        const passport = "test@";
        invokeDeletePassports(passport);
        expect(API.removeSharedPassport).toHaveBeenCalledWith(passport);
      });

      it("passes passport to deletePendingRequest", () => {
        const passport = "test@";
        invokeDeleteRequest(passport);
        expect(API.removePendingPassportRequest).toHaveBeenCalledWith(passport);
      });

      it("dispatches error notification on service failure", async () => {
        const error = new Error("Unable to contact API service");
        const en = {type: "FAKE_ERROR", message: error};
        API.searchRentPassports.mockImplementation(async () => {
          throw error;
        });
        errorNotification.mockImplementation(() => {
          return en;
        });
        const dispatchFake = await invokeCheckForPassportsAsync();
        expect(errorNotification).toHaveBeenCalled();
        expect(dispatchFake).toHaveBeenCalledWith(en);
      });
    });

    describe("Send rent passport request", () => {
      it("call inviteToShare and passes email to inviteToShare passports", () => {
        const emails = {email: "test@email.com"};
        invokeInviteToShare(emails);
        expect(API.inviteToSharePassport).toHaveBeenCalledWith({
          emails: ["test@email.com"],
        });
      });

      it("dispatches error notification on service failure", async () => {
        const emails = {email: "test@email.com"};
        const error = new Error("Unable to contact API service");
        const en = {type: "FAKE_ERROR", message: error};
        API.inviteToSharePassport.mockImplementation(async () => {
          throw error;
        });
        errorNotification.mockImplementation(() => {
          return en;
        });
        const dispatchFake = await invokeInviteToShareAsync(emails);
        expect(errorNotification).toHaveBeenCalled();
        expect(dispatchFake).toHaveBeenCalledWith(en);
      });
    });

    const invokeCheckForPassports = email => {
      const dispatchFake = jest.fn();
      checkForPassports(email)(dispatchFake);

      return dispatchFake;
    };

    const invokeDeletePassports = passport => {
      const dispatchFake = jest.fn();
      deletePassportsFromProperty(passport)(dispatchFake);

      return dispatchFake;
    };

    const invokeDeleteRequest = passport => {
      const dispatchFake = jest.fn();
      deletePendingPassportRequest(passport)(dispatchFake);

      return dispatchFake;
    };

    const invokeCheckForPassportsAsync = async email => {
      const dispatchFake = jest.fn();
      await checkForPassports(email)(dispatchFake);

      return dispatchFake;
    };

    const invokeInviteToShare = email => {
      const dispatchFake = jest.fn();
      sendRentPassportRequest(email)(dispatchFake);

      return dispatchFake;
    };

    const invokeInviteToShareAsync = async email => {
      const dispatchFake = jest.fn();
      await sendRentPassportRequest(email)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("Request rent passports by Email test", () => {
    const _values = {email: "test1@canopy.rent"};

    it("calls branchRequestRentPassport", async () => {
      invokeRequestRentPassport(_values);
      expect(API.inviteToSharePassport).toHaveBeenCalled();
    });

    it(
      "passes branchId, email to requestRentPassportByEmail." +
        "calls getRentPassportsGroup without status",
      () => {
        invokeRequestRentPassport(_values);
        expect(API.inviteToSharePassport).toHaveBeenCalledWith({
          emails: [_values.email],
        });
      },
    );

    it("dispatches response from rentPassportGroups service", async () => {
      const allPassports = rentPassportGroupsResponse();
      API.getRentPassportsGroup.mockImplementation(async () => {
        return allPassports;
      });
      const dispatchFake = await invokeRequestRentPassportByEmailAsync(
        allPassports,
      );
      expect(dispatchFake).toHaveBeenCalledWith({
        allPassports,
        type: "SET_BRANCH_RENT_PASSPORTS",
      });
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
      const dispatchFake = await invokeRequestRentPassportByEmailAsync(values);
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("Sets all passports", () => {
      expect(
        setAllPassports([{name: "name", email: "email@gmail.com"}]),
      ).toEqual(
        expect.objectContaining({
          type: SET_BRANCH_RENT_PASSPORTS,
          allPassports: [{name: "name", email: "email@gmail.com"}],
        }),
      );
    });

    const invokeRequestRentPassport = async email => {
      const dispatchFake = jest.fn();
      sendRentPassportRequest(email)(dispatchFake);

      return dispatchFake;
    };

    const invokeRequestRentPassportByEmailAsync = async data => {
      const dispatchFake = jest.fn();
      await requestRentPassportByEmail(data)(dispatchFake);

      return dispatchFake;
    };
  });
  describe("Check if passport is already shared test", () => {
    it("calls branchRequestRentPassport", () => {
      invokeCheckIfPassportIsAlreadyShared(values);
      expect(API.getRentPassportsGroup).toHaveBeenCalled();
    });

    it(
      "passes branchId, email, and statusParam to requestRentPassportByEmail." +
        "calls getRentPassportsGroup with status",
      () => {
        invokeCheckIfPassportIsAlreadyShared(values);
        expect(API.getRentPassportsGroup).toHaveBeenCalledWith(values);
      },
    );

    it("dispatches response from rentPassportGroups service", async () => {
      const invokeRentPassportGroupsResponse = rentPassportGroupsResponse();

      API.getRentPassportsGroup.mockImplementation(async () => {
        return invokeRentPassportGroupsResponse;
      });
      const dispatchFake = await invokeCheckIfPassportIsAlreadySharedAsync(
        invokeRentPassportGroupsResponse,
      );
      expect(dispatchFake).toHaveBeenCalledWith({
        type: "RENT_PASSPORT_IS_ALREADY_SHARED",
      });
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
      const dispatchFake = await invokeCheckIfPassportIsAlreadySharedAsync(
        values,
      );
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeCheckIfPassportIsAlreadyShared = data => {
      const dispatchFake = jest.fn();
      checkIfPassportIsAlreadyShared(data)(dispatchFake);

      return dispatchFake;
    };

    const invokeCheckIfPassportIsAlreadySharedAsync = async data => {
      const dispatchFake = jest.fn();
      await checkIfPassportIsAlreadyShared(data)(dispatchFake);

      return dispatchFake;
    };
  });
});
