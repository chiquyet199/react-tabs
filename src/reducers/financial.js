import {
  GET_RENT_PASSPORT,
  DELETE_RENT_PASSPORT,
  OPEN_BANKING_CREDENTIALS_VERIFIED,
} from "../actions/types";
import RentPassportHelpers from "../utils/helpers/rentPassport";

const initialState = {};

const getMessagesFromRentPassport = rentPassport =>
  [].concat(
    (rentPassport.annualIncomeInfo && rentPassport.annualIncomeInfo.messages) ||
      [],
    (rentPassport.financialInfo && rentPassport.financialInfo.messages) || [],
  );

export default (state = initialState, {type, rentPassport, isAuthorised}) => {
  switch (type) {
    case GET_RENT_PASSPORT:
      return rentPassport.annualIncomeInfo && rentPassport.financialInfo
        ? {
            ...state,
            ...rentPassport.annualIncomeInfo,
            ...rentPassport.financialInfo,
            status: RentPassportHelpers.getStatusFromMultipleStatuses({
              financial: [
                rentPassport.annualIncomeInfo,
                rentPassport.financialInfo,
              ],
            }),
            messages: getMessagesFromRentPassport(rentPassport),
          }
        : state;
    case DELETE_RENT_PASSPORT:
      return {
        ...initialState,
      };
    case OPEN_BANKING_CREDENTIALS_VERIFIED:
      return {
        ...state,
        openBankingCredentialsVerified: isAuthorised,
      };
    default:
      return state;
  }
};
