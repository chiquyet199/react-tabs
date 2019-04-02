import {getAgent, removeAgent, updateAgentById} from "../actions/agents";
import {REMOVE_AGENT, GET_AGENT} from "./types";
import {errorNotification} from "./notifications";
import API from "../utils/api";

jest.mock("../utils/api/agents");
jest.mock("../actions/notifications");

describe("Agents actions tests", () => {
  it("has type of GET_AGENT", () => {
    expect(getAgent()).toEqual(expect.objectContaining({type: GET_AGENT}));
  });

  it("has agent data", () => {
    const values = {name: "test"};
    expect(getAgent(values)).toEqual(
      expect.objectContaining({
        type: "GET_AGENT",
        agent: values,
      }),
    );
  });
});

describe("removeImage tests", () => {
  it("has type of REMOVE_AGENT", () => {
    expect(removeAgent()).toEqual(
      expect.objectContaining({type: REMOVE_AGENT}),
    );
  });
});

describe("updateAgentById  tests", () => {
  beforeEach(() => {
    API.updateAgentById.mockClear();
  });
  it("calls updateAgentById method", () => {
    invokeUpdateAgentByIdRequest();
    expect(API.updateAgentById).toHaveBeenCalled();
  });

  it("passes data to updateAgentById method", () => {
    const data = {
      agencyId: "2",
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.uk",
      role: "Admin",
      branches: ["0"],
    };
    invokeUpdateAgentByIdRequest(data);
    expect(API.updateAgentById).toHaveBeenCalledWith(data);
  });

  it("dispatches error notification on service failure", async () => {
    const error = new Error("Unable to contact Agents API service");
    const err = {type: "FAKE_ERROR", message: error};
    API.updateAgentById.mockImplementation(async () => {
      throw error;
    });
    errorNotification.mockImplementation(() => {
      return err;
    });
    const dispatchFake = await invokeAsyncUpdateAgent({
      values: {},
    });
    expect(errorNotification).toHaveBeenCalled();
    expect(dispatchFake).toHaveBeenCalledWith(err);
  });

  const invokeUpdateAgentByIdRequest = values => {
    const dispatchFake = jest.fn();
    updateAgentById(values)(dispatchFake);

    return dispatchFake;
  };

  const invokeAsyncUpdateAgent = async values => {
    const dispatchFake = jest.fn();
    await updateAgentById(values)(dispatchFake);

    return dispatchFake;
  };
});
