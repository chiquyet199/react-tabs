import {arrayOf, shape, string, number, oneOf} from "prop-types";
import PropertySpec from "./PropertySpec";

export default shape({
  id: string.isRequired,
  branchId: string.isRequired,
  property: PropertySpec.isRequired,
  renters: arrayOf(
    shape({
      userId: string.isRequired,
      depositOptions: arrayOf(
        shape({
          type: string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  status: oneOf([
    "INVITED",
    "PART_ACCEPTED",
    "ACCEPTED",
    "PENDING",
    "ACTIVE",
    "COMPLETE",
    "CANCELLED",
    "BREACHED",
  ]),
  rentAmount: number.isRequired,
  rentFrequency: oneOf([
    "WEEKLY",
    "FORTNIGHTLY",
    "FOUR_WEEKLY",
    "MONTHLY",
    "YEARLY",
  ]),
  duration: shape({
    minimumMonths: number.isRequired,
    noticeMonths: number,
    durationMonths: number,
    startDate: string.isRequired,
  }),
  conditionsFreeText: string.isRequired,
  documents: arrayOf(
    shape({
      ref: string.isRequired,
      type: oneOf([
        "POLICY_SCHEDULE",
        "STATEMENT_OF_FACTS",
        "POLICY_WORDING",
        "INSURANCE_PRODUCT_INFORMATION_DOCUMENT",
        "INSURANCE_SERVICE_INFORMATION_DOCUMENT",
        "AST",
      ]).isRequired,
      createdAt: string.isRequired,
    }),
  ),
});
