import API from "../utils/api";
import {
  lookupAddress,
  postcodeLookupResult,
  registerUser,
  registerUserProfile,
  generateRentPassport,
  inviteUser,
  createRentPassport,
} from "./form";
import {errorNotification} from "./notifications";
import {POSTCODE_LOOKUP_RESULT, GET_RENT_PASSPORT} from "./types";
import {updateProgress, clearProgress} from "./progress";
import {push} from "connected-react-router";

jest.mock("../utils/api/profile");
jest.mock("../utils/api/userAuth");
jest.mock("../utils/api/postcode");
jest.mock("../utils/api/rentPassport");
jest.mock("./notifications");
jest.mock("../utils/api/invites");

describe("Form action tests", () => {
  beforeEach(() => {
    API.postcodeLookup.mockClear();
    API.registerUserProfile.mockClear();
    API.registerUser.mockClear();
    API.generateRentPassport.mockClear();
    errorNotification.mockClear();
    API.inviteUser.mockClear();
    API.storeRentPassportData.mockClear();
  });

  describe("registerUser tests", () => {
    it("registerUser receives data", () => {
      const val = {
        values: {
          firstName: "big",
          lastName: "man",
          email: "denis+null0@canopy.rent",
          marketing: true,
          password: "qwertyuiop[",
        },
        nextLoc: "/verify",
      };
      invokeRegisterUser(val);
      expect(API.registerUser).toHaveBeenCalledWith(
        expect.objectContaining(val.values),
      );
    });

    const invokeRegisterUser = values => {
      const dispatchFake = jest.fn();
      registerUser(values)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("postcodeLookupResult tests", () => {
    it("has type of POSTCODE_LOOKUP_RESULT", () => {
      expect(postcodeLookupResult()).toEqual(
        expect.objectContaining({type: POSTCODE_LOOKUP_RESULT}),
      );
    });

    it("lists addresses", () => {
      const values = getAddressList();
      expect(postcodeLookupResult(values)).toEqual(
        expect.objectContaining({values}),
      );
    });
  });

  describe("Address lookup tests", () => {
    it("calls postcode lookup", () => {
      invokeLookup();
      expect(API.postcodeLookup).toHaveBeenCalled();
    });

    it("passes postcode to postcode lookup", () => {
      const postcode = "yo61 1lg";
      invokeLookup(postcode);
      expect(API.postcodeLookup).toHaveBeenCalledWith(postcode, "GB");
    });

    it("passes country code to postcode lookup", () => {
      const countryCodes = ["UK", "US", "FR", "NZ"];
      for (let x = 0; x < countryCodes.length; x += 1) {
        const countryCode = countryCodes[x];
        invokeLookup("", countryCode);
        expect(API.postcodeLookup).toHaveBeenCalledWith("", countryCode);
      }
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.postcodeLookup.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeLookupAsync();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("dispatches addresses given by postcode service", async () => {
      const postCodeServiceResponse = getAddressList();
      API.postcodeLookup.mockImplementation(async () => {
        return postCodeServiceResponse;
      });
      const dispatchFake = await invokeLookupAsync("yo61 1lg");
      expect(dispatchFake).toHaveBeenCalledWith(
        postcodeLookupResult(postCodeServiceResponse),
      );
    });

    const invokeLookup = (postcode, countryCode = "GB") => {
      const dispatchFake = jest.fn();
      lookupAddress(postcode, countryCode)(dispatchFake);

      return dispatchFake;
    };

    const invokeLookupAsync = async postcode => {
      const dispatchFake = jest.fn();
      await lookupAddress(postcode, "GB")(dispatchFake);

      return dispatchFake;
    };
  });

  describe("registerUserProfile tests", () => {
    it("calls user register profile", () => {
      invokeRegisterUserProfile({values: {}});
      expect(API.registerUserProfile).toHaveBeenCalled();
    });

    it("passes data to user register profile", () => {
      const val = {
        values: {firstNameRentPassport: "firstNameRentPassport"},
        nextLoc: "/",
      };
      invokeRegisterUserProfile(val);
      expect(API.registerUserProfile).toHaveBeenCalledWith(
        expect.objectContaining(val.values),
      );
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact User API service");
      const err = {type: "FAKE_ERROR", message: error};
      API.registerUserProfile.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return err;
      });
      const dispatchFake = await invokeAsyncRegisterUserProfile({values: {}});
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(err);
    });

    it("dispatches response from user service", async () => {
      const registerUserProfileRes = userRegisterResponse();
      const val = {
        values: {firstNameRentPassport: "firstNameRentPassport"},
        nextLoc: "/",
      };
      API.registerUserProfile.mockImplementation(async () => {
        return registerUserProfileRes;
      });
      const dispatchFake = await invokeAsyncRegisterUserProfile(val);
      expect(dispatchFake).toHaveBeenCalledWith(updateProgress(0));
    });

    const invokeRegisterUserProfile = values => {
      const dispatchFake = jest.fn();
      registerUserProfile(values)(dispatchFake);

      return dispatchFake;
    };

    const invokeAsyncRegisterUserProfile = async values => {
      const dispatchFake = jest.fn();
      await registerUserProfile(values)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("generateRentPassport tests", () => {
    it("calls user generate rent passport", () => {
      invokeGenerateRentPassport({values: {}});
      expect(API.generateRentPassport).toHaveBeenCalled();
    });

    it("passes data to generate rent passport", () => {
      const val = {
        values: {firstNameRentPassport: "firstNameRentPassport"},
        nextLoc: "/",
      };
      invokeGenerateRentPassport(val);
      expect(API.generateRentPassport).toHaveBeenCalledWith(
        expect.objectContaining(val.values),
      );
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact User API service");
      const err = {type: "FAKE_ERROR", message: error};
      API.generateRentPassport.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return err;
      });
      const dispatchFake = await invokeAsyncGenerateRentPassport({values: {}});
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(err);
    });

    it("dispatches response from generate rent passport service", async () => {
      const generateRentPassportRes = userRegisterResponse();
      const val = {
        values: {firstNameRentPassport: "firstNameRentPassport"},
        nextLoc: "/",
      };
      API.generateRentPassport.mockImplementation(async () => {
        return generateRentPassportRes;
      });
      const dispatchFake = await invokeAsyncGenerateRentPassport(val);
      expect(dispatchFake).toHaveBeenCalledWith(push(val.nextLoc));
    });

    it("dispatches GET_RENT_PASSPORT on success", async () => {
      const rentPassport = {
        userId: "abc-123",
        status: "COMPLETE",
        aboutInfo: {},
        residenceInfo: [],
        workInfo: [],
        annualIncomeInfo: {},
        financialInfo: {},
        legalInfo: {},
      };
      API.generateRentPassport.mockImplementation(async () => ({
        ...rentPassport,
      }));
      const dispatchFake = await invokeAsyncGenerateRentPassport({values: {}});
      expect(dispatchFake).toHaveBeenCalledWith(
        expect.objectContaining({
          type: GET_RENT_PASSPORT,
          rentPassport,
        }),
      );
    });

    const invokeGenerateRentPassport = values => {
      const dispatchFake = jest.fn();
      generateRentPassport(values)(dispatchFake);

      return dispatchFake;
    };

    const invokeAsyncGenerateRentPassport = async values => {
      const dispatchFake = jest.fn();
      await generateRentPassport(values)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("inviteUser tests", () => {
    it("calls inviteUser profile", () => {
      invokeInviteUserRequest({values: {}});
      expect(API.inviteUser).toHaveBeenCalled();
    });

    it("passes data to invite user", () => {
      const val = {
        values: {reference_id: "123456"},
        nextLoc: "/",
      };
      invokeInviteUserRequest(val);
      expect(API.inviteUser).toHaveBeenCalledWith(expect.objectContaining(val));
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact User API service");
      const err = {type: "FAKE_ERROR", message: error};
      API.inviteUser.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return err;
      });
      const dispatchFake = await invokeAsyncInviteUserRequest({
        values: {},
      });
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(err);
    });

    it("dispatches response from invite user service", async () => {
      const invokeInviteUserRequestResponse = inviteUserRequestResponse();
      const val = {
        values: {reference_id: "123456"},
        nextLoc: "/",
      };
      API.inviteUser.mockImplementation(async () => {
        return invokeInviteUserRequestResponse;
      });
      const dispatchFake = await invokeAsyncInviteUserRequest(val);
      expect(dispatchFake).toHaveBeenCalledWith(updateProgress(0));
    });

    const invokeInviteUserRequest = values => {
      const dispatchFake = jest.fn();
      inviteUser(values)(dispatchFake);

      return dispatchFake;
    };

    const invokeAsyncInviteUserRequest = async values => {
      const dispatchFake = jest.fn();
      await inviteUser(values)(dispatchFake);

      return dispatchFake;
    };
  });

  describe("createRentPassport tests", () => {
    it("calls createRentPassport profile", () => {
      invokeCreateRentPassportRequest({values: {}, nextLoc: "/rent-passport"});
      expect(API.storeRentPassportData).toHaveBeenCalled();
    });

    it("passes data to store Rent Passport Data", () => {
      const val = {
        values: {reference_id: "123456"},
        nextLoc: "/rent-passport",
      };
      invokeCreateRentPassportRequest(val);
      expect(API.storeRentPassportData).toHaveBeenCalledWith(
        expect.objectContaining(val),
      );
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact Rent Passport API service");
      const err = {type: "FAKE_ERROR", message: error};
      API.storeRentPassportData.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return err;
      });
      const dispatchFake = await invokeAsyncCreateRentPassportRequest({
        values: {},
        nextLoc: "/rent-passport",
      });
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(err);
    });

    it("dispatches response from invite rent passport service", async () => {
      const invokeCreateRentPassportRequestResponse = createRentPassportRequestResponse();
      const val = {
        values: {reference_id: "123456"},
        nextLoc: "/rent-passport",
      };
      API.storeRentPassportData.mockImplementation(async () => {
        return invokeCreateRentPassportRequestResponse;
      });
      const dispatchFake = await invokeAsyncCreateRentPassportRequest(val);
      expect(dispatchFake).toHaveBeenCalledWith(clearProgress());
    });

    const invokeCreateRentPassportRequest = values => {
      const dispatchFake = jest.fn();
      createRentPassport(values)(dispatchFake);

      return dispatchFake;
    };

    const invokeAsyncCreateRentPassportRequest = async values => {
      const dispatchFake = jest.fn();
      await createRentPassport(values)(dispatchFake);

      return dispatchFake;
    };
  });

  const getAddressList = () => {
    return [
      "1 High Street, Stillington, York",
      "2 High Street, Stillington, York",
      "3 High Street, Stillington, York",
    ];
  };

  const userRegisterResponse = () => {
    return {user: {firstNameRentPassport: "firstNameRentPassport"}};
  };

  const inviteUserRequestResponse = () => {
    return {reference_id: "123456"};
  };

  const createRentPassportRequestResponse = () => {
    return {reference_id: "123456"};
  };
});
