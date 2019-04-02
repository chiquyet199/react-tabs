import {
  openBankingMetadata,
  openBankingAuthorise,
  openBankingFindTransactions,
  openBankingConfirmPayment,
} from "../openBanking";
import * as api from "../api";

jest.mock("../api.js");
describe("openBanking API tests", () => {
  describe("openBankingMetadata", () => {
    beforeEach(() => {
      api.get.mockClear();
    });

    it("should be a get request to /open-banking/authorise", () => {
      openBankingMetadata();
      expect(api.get).toHaveBeenCalledWith("/open-banking/authorise");
    });
  });

  describe("openBankingAuthorise", () => {
    beforeEach(() => {
      api.post.mockClear();
    });

    it("should be a post request to /open-banking/authorise", () => {
      openBankingAuthorise(getSampleParams());
      expect(api.post).toHaveBeenCalledWith(
        "/open-banking/authorise",
        expect.any(Object),
      );
    });

    it("should pass provider as 'TRUELAYER'", () => {
      openBankingAuthorise(getSampleParams());
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          provider: "TRUELAYER",
        }),
      );
    });

    it("should pass given code", () => {
      const code = "abc-123";
      openBankingAuthorise(getSampleParams({code}));
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({code}),
      );
    });

    it("should pass redirectUri", () => {
      const redirectUri = "http://canopy.rent/here/is/a/path";
      openBankingAuthorise(getSampleParams({redirectUri}));
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({redirectUri}),
      );
    });

    const getSampleParams = params => ({
      code: "",
      redirectUri: "",
      ...params,
    });
  });

  describe("openBankingFindTransactions", () => {
    beforeEach(() => {
      api.post.mockClear();
    });

    it("should be a post request to /open-banking/verification/findTransactions", () => {
      openBankingFindTransactions({});
      expect(api.post).toHaveBeenCalledWith(
        "/open-banking/verification/findTransactions",
        expect.any(Object),
      );
    });

    it("should pass criteria", () => {
      const criteria = {
        category: "RENT",
        payment: {
          amount: 101,
          reference: "RENTY MCRENTPAYMENT",
          date: "2019-01-29",
          frequency: "MONTHLY",
        },
      };
      openBankingFindTransactions(criteria);
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining(criteria),
      );
    });
  });

  describe("openBankingConfirmPayment", () => {
    beforeEach(() => {
      api.post.mockClear();
    });

    it("should be a post request to /open-banking/verification/confirmTransactions", () => {
      openBankingConfirmPayment("");
      expect(api.post).toHaveBeenCalledWith(
        "/open-banking/verification/confirmTransactions",
        expect.any(Object),
      );
    });

    it("should pass paymentId", () => {
      const id = "abc-123-def-456";
      openBankingConfirmPayment(id);
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({id}),
      );
    });
  });
});
