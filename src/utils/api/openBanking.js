import {get, post} from "./api";

export const openBankingMetadata = () => get("/open-banking/authorise");

export const openBankingAuthorise = ({code, redirectUri}) =>
  post("/open-banking/authorise", {provider: "TRUELAYER", code, redirectUri});

export const openBankingFindTransactions = criteria =>
  post("/open-banking/verification/findTransactions", criteria);

export const openBankingConfirmPayment = paymentId =>
  post("/open-banking/verification/confirmTransactions", {id: paymentId});
