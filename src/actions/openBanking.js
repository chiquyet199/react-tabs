import API from "../utils/api";
import {
  OPEN_BANKING_METADATA,
  OPEN_BANKING_CREDENTIALS_VERIFIED,
  OPEN_BANKING_TRANSACTIONS,
  OPEN_BANKING_TRANSACTIONS_CLEAR,
} from "./types";
import {errorNotification} from "./notifications";

export const openBankingMetadataResult = values => ({
  type: OPEN_BANKING_METADATA,
  values,
});

export const openBankingCredentialsVerified = (isAuthorised = true) => ({
  type: OPEN_BANKING_CREDENTIALS_VERIFIED,
  isAuthorised,
});

const openBankingTransactions = values => ({
  type: OPEN_BANKING_TRANSACTIONS,
  values,
});

export const openBankingTransactionsClear = () => ({
  type: OPEN_BANKING_TRANSACTIONS_CLEAR,
});

export const getOpenBankingMetadata = () => async dispatch => {
  try {
    const value = await API.openBankingMetadata();
    dispatch(openBankingMetadataResult(value));
  } catch (e) {
    dispatch(errorNotification(e));
  }
};

export const sendOpenBankingAuthoriseToken = ({
  code,
  redirectUri,
}) => async dispatch => {
  try {
    await API.openBankingAuthorise({code, redirectUri});
    dispatch(openBankingCredentialsVerified());
  } catch (e) {
    dispatch(errorNotification(e));
  }
};

export const getRentalTransactions = payment => async dispatch => {
  try {
    const transactions = await API.openBankingFindTransactions({
      category: "RENT",
      payment,
    });
    dispatch(openBankingTransactions(transactions));
  } catch (e) {
    dispatch(errorNotification(e));
  }
};

export const getSalaryTransactions = payment => async dispatch => {
  try {
    const transactions = await API.openBankingFindTransactions({
      category: "INCOME",
      payment,
    });
    dispatch(openBankingTransactions(transactions));
  } catch (e) {
    dispatch(errorNotification(e));
  }
};

export const confirmTransactions = transactionsId => async dispatch => {
  try {
    await API.openBankingConfirmPayment(transactionsId);
  } catch (e) {
    dispatch(errorNotification(e));
  }
};
