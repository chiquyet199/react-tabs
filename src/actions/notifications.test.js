import {
  ERROR_NOTIFICATION,
  INFO_NOTIFICATION,
  WARNING_NOTIFICATION,
} from "./types";
import {
  expireNotification,
  clearNotification,
  infoNotification,
  errorNotification,
  warningNotification,
} from "./notifications";

describe("action navigation", () => {
  it("expireNotification", async () => {
    jest.useFakeTimers();
    const dispatchFake = jest.fn();
    expireNotification(dispatchFake).then(() => {
      expect(dispatchFake).toBeCalledWith(clearNotification);
    });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    jest.runAllTimers();
  });

  it("infoNotification", async () => {
    const dispatchFake = jest.fn();
    const message = "Message text";
    const expectedAction = {
      type: INFO_NOTIFICATION,
      message,
    };

    await infoNotification(message)(dispatchFake);
    expect(dispatchFake).toBeCalledWith(expectedAction);
  });

  it("errorNotification", async () => {
    const dispatchFake = jest.fn();
    const message = "Message text";
    const expectedAction = {
      type: ERROR_NOTIFICATION,
      message,
    };

    await errorNotification({message})(dispatchFake);
    expect(dispatchFake).toBeCalledWith(expectedAction);
  });

  it("warningNotification", async () => {
    const dispatchFake = jest.fn();
    const message = "Message text";
    const expectedAction = {
      type: WARNING_NOTIFICATION,
      message,
    };

    await warningNotification(message)(dispatchFake);
    expect(dispatchFake).toBeCalledWith(expectedAction);
  });
});
