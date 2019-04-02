import API from "../utils/api";
import {
  sendRightToRentRequest,
  storePhoto,
  storeBackPhoto,
  noCameraError,
} from "./photos";
import {errorNotification} from "./notifications";
import {STORE_BACK_PHOTO, STORE_PHOTO} from "./types";
import {push} from "connected-react-router";

jest.mock("../utils/api/agency");
jest.mock("./notifications");

describe("Photos action tests", () => {
  beforeEach(() => {
    API.sendRightToRentProof = jest.fn().mockRejectedValue({});
    errorNotification.mockClear();
  });

  describe("unshareRentPassport tests", () => {
    it("has type of STORE_PHOTO", () => {
      const photo = {test: "test value"};
      expect(storePhoto(photo)).toEqual({type: STORE_PHOTO, photo});
    });

    it("has type of STORE_PHOTO_BACK", () => {
      const photo = {test: "test value"};
      expect(storeBackPhoto(photo)).toEqual({type: STORE_BACK_PHOTO, photo});
    });

    it("passes values to sendRightToRentProof API call", async () => {
      await invokeSendRightToRentRequest();
      await expect(API.sendRightToRentProof).toHaveBeenCalled();
    });

    it("Dispatches push upon successful response", async () => {
      const generateResponse = {success: true};
      API.sendRightToRentProof.mockResolvedValue(generateResponse);
      const dispatchFake = await invokeSendRightToRentRequest();
      expect(dispatchFake).toHaveBeenCalledWith(push("/invited-to-rent"));
    });

    it("Doesn't dispatch push upon no error or returned value", async () => {
      API.sendRightToRentProof.mockResolvedValue();
      const dispatchFake = await invokeSendRightToRentRequest();
      expect(dispatchFake).not.toHaveBeenCalledWith(push("/invited-to-rent"));
    });

    it("Dispatches error notification", async () => {
      await invokeErrorNotification();
      expect(errorNotification).toHaveBeenCalled();
    });

    it("calls sendRightToRentProof on API with JSON values", async () => {
      const values = {
        rightToRentPhoto: {
          passportId: 2323,
          docType: "passport",
          data: {
            uri: "342342",
          },
        },
        rightToRentPhotoBack: {
          data: {
            uri: 23423,
          },
        },
      };
      await invokeSendRightToRentRequest();
      expect(API.sendRightToRentProof).toHaveBeenCalledWith(dataToJson(values));
    });

    it("No Back value when called without RightToRentPhotoBack", async () => {
      const values = {
        rightToRentPhoto: {
          passportId: 2323,
          docType: "passport",
          data: {
            uri: "342342",
          },
        },
      };
      await invokeSendRightToRentFront();
      expect(API.sendRightToRentProof).toHaveBeenCalledWith(dataToJson(values));
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.sendRightToRentProof.mockRejectedValue({})(async () => {
        Promise.reject(error);
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeSendRightToRentFront();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeSendRightToRentRequest = async () => {
      const values = {
        rightToRentPhoto: {
          passportId: 2323,
          docType: "passport",
          data: {
            uri: "342342",
          },
        },
        rightToRentPhotoBack: {
          data: {
            uri: 23423,
          },
        },
      };
      const dispatchFake = jest.fn();
      await sendRightToRentRequest(values)(dispatchFake);

      return dispatchFake;
    };

    const invokeSendRightToRentFront = async () => {
      const values = {
        rightToRentPhoto: {
          passportId: 2323,
          docType: "passport",
          data: {
            uri: "342342",
          },
        },
      };
      const dispatchFake = jest.fn();
      const result = await sendRightToRentRequest(values)(dispatchFake);

      return {dispatchFake, result};
    };

    const invokeErrorNotification = async () => {
      const dispatchFake = jest.fn();
      const result = await noCameraError()(dispatchFake);

      return {dispatchFake, result};
    };
  });
});

const toImage = (side, photo) => ({type: side, url: photo});

const dataToJson = data => {
  return {
    sharedPassportId: data.rightToRentPhoto.passportId,
    documents: [
      {
        type: data.rightToRentPhoto.documentType,
        images: [
          data.rightToRentPhoto.data.uri &&
            toImage("FRONT", data.rightToRentPhoto.data.uri),
          data.rightToRentPhotoBack &&
            toImage("BACK", data.rightToRentPhotoBack.data.uri),
        ],
      },
    ],
  };
};
