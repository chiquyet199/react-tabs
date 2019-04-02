import {updateSelectedBranch, changeSelectedBranch} from "./selectedBranch";
import {errorNotification} from "./notifications";
import {UPDATE_SELECTED_BRANCH} from "./types";

jest.mock("./notifications");

describe("Selected Branch tests", () => {
  describe("update selected branch tests", () => {
    it("has a type of UPDATE_SELECTED_BRANCH", () => {
      expect(updateSelectedBranch().type).toBe(UPDATE_SELECTED_BRANCH);
    });

    it("passes new selected branch", () => {
      const newSelectedBranch = "abc-132";
      expect(updateSelectedBranch(newSelectedBranch).newSelectedBranch).toBe(
        newSelectedBranch,
      );
    });
  });

  describe("change selected branch action creator tests", () => {
    it("dispatches updateSelectedBranch action when selected branch available in state", () => {
      const newSelectedBranch = "abc-123";
      const usb = updateSelectedBranch(newSelectedBranch);
      const getState = () => ({
        branches: {
          ids: ["abc-123", "def-456"],
          selected: "def-456",
        },
      });

      const {dispatchFake} = invokeChangeSelectedBranch(
        newSelectedBranch,
        getState,
      );

      expect(dispatchFake).toHaveBeenCalledWith(usb);
    });

    it("dispatches error notification if selected branch isn't available in state", () => {
      const error = new Error("Can't change branch selection");
      const en = {type: "FAKE_ERROR", message: error};
      errorNotification.mockImplementation(() => en);
      const newSelectedBranch = "abc-123";
      const getState = () => ({
        branches: {
          ids: ["ghi-789", "def-456"],
          selected: "def-456",
        },
      });

      const {dispatchFake} = invokeChangeSelectedBranch(
        newSelectedBranch,
        getState,
      );

      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeChangeSelectedBranch = (newSelectedBranch, getState) => {
      const dispatchFake = jest.fn();
      const result = changeSelectedBranch(newSelectedBranch)(
        dispatchFake,
        getState,
      );

      return {dispatchFake, result};
    };
  });
});
