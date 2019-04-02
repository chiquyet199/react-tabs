import API from "../utils/api";
import {errorNotification} from "./notifications";
import {updateAgency, getInitialValues, storeValues} from "./settings";
import {STORE_INITIAL_VALUES} from "./types";

jest.mock("../utils/api/profile");
jest.mock("../utils/api/references");
jest.mock("../utils/api/postcode");
jest.mock("../utils/api/rentPassport");
jest.mock("./notifications");
jest.mock("../utils/api/invites");
jest.mock("../utils/api/accounts");

describe("Form action tests", () => {
  beforeEach(() => {
    API.updateAgency.mockClear();
    API.getInitialSettingsValues.mockClear();
    errorNotification.mockClear();
  });

  describe("StoreValues action test", () => {
    it("has type of STORE_INITIAL_VALUES", () => {
      expect(storeValues("test")).toEqual(
        expect.objectContaining({type: STORE_INITIAL_VALUES, values: "test"}),
      );
    });

    describe("UpdateAgency tests", () => {
      it("calls update agency", () => {
        invokeUpdate();
        expect(API.updateAgency).toHaveBeenCalled();
      });

      it("passes values to updateAgency", () => {
        const values = {name: "canopy"};
        invokeUpdate(values);
        expect(API.updateAgency).toHaveBeenCalledWith(values);
      });
    });
    describe("GetInitialValues tests", () => {
      it("calls update agency", () => {
        invokeGetInitialValues();
        expect(API.getInitialSettingsValues).toHaveBeenCalled();
      });
    });
  });

  const invokeUpdate = values => {
    const dispatchFake = jest.fn();
    updateAgency({values})(dispatchFake);

    return dispatchFake;
  };

  const invokeGetInitialValues = () => {
    const dispatchFake = jest.fn();
    getInitialValues()(dispatchFake);

    return dispatchFake;
  };
});
