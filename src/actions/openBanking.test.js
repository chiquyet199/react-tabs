import API from "../utils/api";
import {
  getOpenBankingMetadata,
  sendOpenBankingAuthoriseToken,
  getRentalTransactions,
  getSalaryTransactions,
  confirmTransactions,
} from "./openBanking";
import {errorNotification} from "./notifications";
import {
  OPEN_BANKING_METADATA,
  OPEN_BANKING_CREDENTIALS_VERIFIED,
  OPEN_BANKING_TRANSACTIONS,
} from "./types";

jest.mock("../utils/api/openBanking");
jest.mock("./notifications");

describe("openbanking action tests", () => {
  describe("getOpenBankingMetadata action tests", () => {
    beforeEach(() => {
      API.openBankingMetadata.mockClear();
      errorNotification.mockClear();
    });

    it("calls openBankingMetadata api method", async () => {
      invokeGetOpenBankingMetadata();
      expect(API.openBankingMetadata).toHaveBeenCalled();
    });

    it("dispatches value from openBankingMetadata", async () => {
      const values = {
        provider: "TRUELAYER",
        redirectUrl:
          "https://auth.truelayer.com/?response_type=code&client_id=test-co68&nonce=3169845005&scope=info%20accounts%20balance%20transactions%20cards%20products%20beneficiaries%20offline_access&redirect_uri=http://localhost:3000/truelayer/redirect&enable_mock=true&enable_oauth_providers=true&enable_open_banking_providers=true&enable_credentials_sharing_providers_de=false&enable_credentials_sharing_providers=true",
        isAuthorised: false,
      };
      API.openBankingMetadata.mockImplementation(() => Promise.resolve(values));
      const dispatchFake = await invokeGetOpenBankingMetadata();
      expect(dispatchFake).toHaveBeenCalledWith(
        expect.objectContaining({
          type: OPEN_BANKING_METADATA,
          values,
        }),
      );
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.openBankingMetadata.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeGetOpenBankingMetadata();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeGetOpenBankingMetadata = async () => {
      const dispatchFake = jest.fn();
      await getOpenBankingMetadata()(dispatchFake);

      return dispatchFake;
    };
  });
  describe("sendOpenBankingAuthoriseToken action tests", () => {
    beforeEach(() => {
      API.openBankingAuthorise.mockClear();
      errorNotification.mockClear();
    });

    it("passes code to openBankingMetadata api method", async () => {
      const code = "abc-123";
      invokeSendOpenBankingAuthoriseToken({code});
      expect(API.openBankingAuthorise).toHaveBeenCalledWith(
        expect.objectContaining({code}),
      );
    });

    it("passes redirectUri to openBankingMetadata api method", async () => {
      const redirectUri = "http://canopy.rent/connect/to/open/banking";
      invokeSendOpenBankingAuthoriseToken({redirectUri});
      expect(API.openBankingAuthorise).toHaveBeenCalledWith(
        expect.objectContaining({redirectUri}),
      );
    });

    it("doesn't pass arbitrary parameters", async () => {
      const anyOldRubbish = true;
      invokeSendOpenBankingAuthoriseToken({anyOldRubbish});
      expect(API.openBankingAuthorise).not.toHaveBeenCalledWith(
        expect.objectContaining({anyOldRubbish}),
      );
    });

    it("dispatches OPEN_BANKING_CREDENTIALS_VERIFIED on success", async () => {
      const token = "abc-123";
      const dispatch = await invokeSendOpenBankingAuthoriseToken(token);
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: OPEN_BANKING_CREDENTIALS_VERIFIED,
        }),
      );
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.openBankingAuthorise.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeSendOpenBankingAuthoriseToken();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeSendOpenBankingAuthoriseToken = async params => {
      const dispatchFake = jest.fn();
      await sendOpenBankingAuthoriseToken({
        code: "abc123",
        redirectUri: "http://here/is/a/path",
        ...params,
      })(dispatchFake);

      return dispatchFake;
    };
  });
  describe("getRentalTransactions", () => {
    beforeEach(() => {
      API.openBankingFindTransactions.mockClear();
      errorNotification.mockClear();
    });

    it("calls openBankingFindTransactions api method", async () => {
      const payment = {
        amount: 101,
        reference: "RENTY MCRENTPAYMENT",
        date: "2019-01-29",
        frequency: "MONTHLY",
      };
      invokeGetRentalTranslations(payment);
      expect(API.openBankingFindTransactions).toHaveBeenCalledWith(
        expect.objectContaining({
          category: "RENT",
          payment,
        }),
      );
    });

    it("dispatches value from openBankingFindTransactions", async () => {
      const payment = {
        amount: 101,
        reference: "RENTY MCRENTPAYMENT",
        date: "2019-01-29",
        frequency: "MONTHLY",
      };
      const response = findPaymentsSample();
      API.openBankingFindTransactions.mockImplementation(() =>
        Promise.resolve(response),
      );
      const dispatch = await invokeGetRentalTranslations(payment);
      expect(dispatch).toHaveBeenCalledWith({
        type: OPEN_BANKING_TRANSACTIONS,
        values: response,
      });
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.openBankingFindTransactions.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeGetRentalTranslations({});
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeGetRentalTranslations = async payment => {
      const dispatchFake = jest.fn();
      await getRentalTransactions(payment)(dispatchFake);

      return dispatchFake;
    };
  });
  describe("getSalaryTransactions", () => {
    beforeEach(() => {
      API.openBankingFindTransactions.mockClear();
      errorNotification.mockClear();
    });

    it("calls openBankingFindTransactions api method", async () => {
      const payment = {
        amount: 1010,
        reference: "SALARY AGOGO",
        date: "2019-01-29",
        frequency: "MONTHLY",
      };
      invokeGetSalaryTranslations(payment);
      expect(API.openBankingFindTransactions).toHaveBeenCalledWith(
        expect.objectContaining({
          category: "INCOME",
          payment,
        }),
      );
    });

    it("dispatches value from openBankingFindTransactions", async () => {
      const payment = {
        amount: 1010,
        reference: "SALARY AGOGO",
        date: "2019-01-29",
        frequency: "MONTHLY",
      };
      const response = findPaymentsSample();
      API.openBankingFindTransactions.mockImplementation(() =>
        Promise.resolve(response),
      );
      const dispatch = await invokeGetSalaryTranslations(payment);
      expect(dispatch).toHaveBeenCalledWith({
        type: OPEN_BANKING_TRANSACTIONS,
        values: response,
      });
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.openBankingFindTransactions.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeGetSalaryTranslations({});
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeGetSalaryTranslations = async payment => {
      const dispatchFake = jest.fn();
      await getSalaryTransactions(payment)(dispatchFake);

      return dispatchFake;
    };
  });
  describe("confirmTransactions action tests", () => {
    beforeEach(() => {
      API.openBankingConfirmPayment.mockClear();
      errorNotification.mockClear();
    });

    it("passes token to confirmTransactions api method", async () => {
      const token = "abc-123";
      invokeSendOpenBankingConfirmTransactions({token});
      expect(API.openBankingConfirmPayment).toHaveBeenCalledWith(
        expect.objectContaining({token}),
      );
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.openBankingConfirmPayment.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const dispatchFake = await invokeSendOpenBankingConfirmTransactions();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    const invokeSendOpenBankingConfirmTransactions = async params => {
      const dispatchFake = jest.fn();
      await confirmTransactions({
        token: "abc123",
        redirectUri: "http://canopy.rent/this/is/a/path",
        ...params,
      })(dispatchFake);

      return dispatchFake;
    };
  });

  const findPaymentsSample = () => ({
    id: "6122ccc1-d2b5-49ce-4af2-44f72a2a7a0e",
    status: "SUCCESS",
    from: "2018-02-05",
    to: "2019-02-05",
    transactions: [
      {
        id: "4eb4a3d2cdffec975c6da61600e3044e",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2019-01-25T00:00:00+00:00",
      },
      {
        id: "262745b9a7592c674b07289f19a86525",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-12-27T00:00:00+00:00",
      },
      {
        id: "c1db32bf1422fd1ad88b46e2a882c57e",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-11-26T00:00:00+00:00",
      },
      {
        id: "67d97a8a73d3d0a578e77c418ff76a59",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-10-25T00:00:00+00:00",
      },
      {
        id: "f54a67dde9f3610e9080bbdb91b9296c",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-09-25T00:00:00+00:00",
      },
      {
        id: "351a0a54c527e11efc3d1a1fbb631e88",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-08-28T00:00:00+00:00",
      },
      {
        id: "c711ba91b9f320ffe3230fd9195b26da",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-07-25T00:00:00+00:00",
      },
      {
        id: "693cc5f02a0d4a2217f4d4f91824a334",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-06-25T00:00:00+00:00",
      },
      {
        id: "f094ced8efeb0fe31903c64095997c58",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-05-25T00:00:00+00:00",
      },
      {
        id: "04a1c844b2255941ed8530be051e2bee",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-04-25T00:00:00+00:00",
      },
      {
        id: "81ae280237cd65955551d6a6828de7e8",
        amount: -500.0,
        currency: "GBP",
        reference: "CANOPY RENTAL ENTERPRISES",
        timestamp: "2018-03-26T00:00:00+00:00",
      },
    ],
    candidates: [
      {
        id: "fe049e1a36bec356fac5d89dc88bc364",
        amount: -9908.62,
        currency: "GBP",
        reference: "BOUGHT THREE MORE HORSES",
        timestamp: "2019-02-01T00:00:00+00:00",
      },
      {
        id: "fe049e1a36bec356fac5d89dc88bc364",
        amount: -3308.62,
        currency: "GBP",
        reference: "BOUGHT A HORSE",
        timestamp: "2019-02-01T00:00:00+00:00",
      },
    ],
  });
});
