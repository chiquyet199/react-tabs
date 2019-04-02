import {
  acceptAgentInvitation,
  fetchAgentById,
  removeAgentById,
  updateAgentById,
} from "../agents";
import * as api from "../api";

jest.mock("../api.js");

describe("fetchAgentById", () => {
  beforeEach(() => {
    api.get.mockClear();
  });

  it("should be a post request to /agency/agent/get", () => {
    fetchAgentById({});
    expect(api.get).toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledWith(
      "/agency/agent/get",
      expect.any(Object),
    );
  });

  it("should pass through form values", () => {
    const agentId = "12";
    fetchAgentById(agentId);
    expect(api.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({agentId}),
    );
  });
});

describe("updateAgentById", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  const mockUpdateData = {
    agencyId: "11",
    firstName: "firstName",
    lastName: "lastName",
    email: "email@email.uk",
    role: "manager",
    branches: ["2"],
  };

  it("should be a post request to /agency/agent/update", () => {
    updateAgentById(mockUpdateData);
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(
      "/agency/agent/update",
      expect.any(Object),
    );
  });

  it("should pass through values", () => {
    updateAgentById(mockUpdateData);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(mockUpdateData),
    );
  });
});

describe("removeAgentById", () => {
  beforeEach(() => {
    api.del.mockClear();
  });

  it("should be a post request to /agency/agent/delete", () => {
    removeAgentById(12);
    expect(api.del).toHaveBeenCalled();
    expect(api.del).toHaveBeenCalledWith(
      "/agency/agent/delete",
      expect.any(Object),
    );
  });

  it("should pass through values", () => {
    const agentId = "12";
    removeAgentById(agentId);
    expect(api.del).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({agentId}),
    );
  });
});

describe("acceptAgentInvitation", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  it("should be a post request to /agency/agent/acceptInvite", () => {
    acceptAgentInvitation({
      invitationId: "testid",
      firstName: "Goofy",
      lastName: "Tester",
      password: "securestuff",
    });
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(
      "/agency/agent/acceptInvite",
      expect.any(Object),
    );
  });

  it("should pass through values", () => {
    const values = {
      invitationId: "testid",
      firstName: "Goofy",
      lastName: "Tester",
      password: "securestuff",
    };
    acceptAgentInvitation(values);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(values),
    );
  });
});
