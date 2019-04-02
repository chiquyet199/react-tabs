import React from "react";
import {shallow} from "enzyme";
import {VerifyEmailRedirect} from "./VerifyEmail";

const testProps = {
  go: jest.fn(),
  storeUser: jest.fn(),
};

jest.mock("../../utils/api", () => ({
  verifyEmail: arg =>
    Promise.resolve({user: "testUser", success: arg === "test"}),
}));

const flushPromises = () => new Promise(resolve => setImmediate(resolve));
// testing util to wait for inaccessible promises to resolve

describe("Redirects", () => {
  beforeEach(() => jest.resetAllMocks());

  describe("VerifyEmailRedirect", () => {
    describe("without token in query string", () => {
      it("redirects to /verify-email with no token", () => {
        shallow(<VerifyEmailRedirect {...testProps} location={{}} />);
        expect(testProps.go).toHaveBeenCalledWith("/verify-email");
      });
    });

    describe("with token in query string", () => {
      describe("API call returns success", () => {
        it("redirects user to /verify-email-success", async () => {
          shallow(
            <VerifyEmailRedirect
              {...testProps}
              location={{search: "?token=test"}}
            />,
          );
          await flushPromises();
          expect(testProps.go).toHaveBeenCalledWith("/verify-email-success");
        });

        it("updates user in redux", async () => {
          shallow(
            <VerifyEmailRedirect
              {...testProps}
              location={{search: "?token=test"}}
            />,
          );
          await flushPromises();
          expect(testProps.storeUser).toHaveBeenCalledWith("testUser");
        });
      });
      describe("API call returns false for success", () => {
        it("redirects user to /verify-email-success", async () => {
          shallow(
            <VerifyEmailRedirect
              {...testProps}
              location={{search: "?token=bad"}}
            />,
          );
          await flushPromises();
          expect(testProps.go).toHaveBeenCalledWith("/verify-email");
        });
      });
    });
  });
});
