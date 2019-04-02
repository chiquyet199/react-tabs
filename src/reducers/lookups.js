import {
  POSTCODE_LOOKUP_RESULT,
  LEASES_LOOKUP_RESULT,
  OPEN_BANKING_METADATA,
  POSTCODE_CLEAR_RESULT,
  OPEN_BANKING_TRANSACTIONS,
  OPEN_BANKING_TRANSACTIONS_CLEAR,
} from "../actions/types";
import {omit} from "underscore";

const initialState = {
  addresses: [],
};

export default (state = initialState, {type, values}) => {
  switch (type) {
    case POSTCODE_LOOKUP_RESULT:
      return {
        ...state,
        addresses: values && values.slice(0),
      };
    case LEASES_LOOKUP_RESULT:
      return {
        ...state,
        leases: values && values.slice(0),
      };
    case OPEN_BANKING_METADATA:
      return {
        ...state,
        openBankingRedirectUrl: values.redirectUrl,
      };
    case OPEN_BANKING_TRANSACTIONS:
      return {
        ...state,
        transactionsLookup: values,
      };
    case OPEN_BANKING_TRANSACTIONS_CLEAR:
      return omit(state, "transactionsLookup");
    case POSTCODE_CLEAR_RESULT:
      return omit(state, "addresses");
    default:
      return state;
  }
};
