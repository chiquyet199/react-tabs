import {arrayOf, bool, number, oneOf, object, shape, string} from "prop-types";

export default shape({
  id: string.isRequired,
  presentation: shape({
    bathroomsCount: number.isRequired,
    bedroomsCount: number.isRequired,
    dateAvailable: string,
    description: string,
    furnishedType: oneOf(["NOT_FURNISHED", "PART_FURNISHED", "FULLY_FURNISHED"])
      .isRequired,
    hasOutsideSpace: bool.isRequired,
    hasParking: bool.isRequired,
    petsAllowed: bool.isRequired,
    propertyType: oneOf(["HOUSE", "APARTMENT"]).isRequired,
    smokingAllowed: bool.isRequired,
    summary: string,
  }),
  rentFrequency: oneOf([
    "WEEKLY",
    "FORTNIGHTLY",
    "FOUR_WEEKLY",
    "MONTHLY",
    "YEARLY",
  ]).isRequired,
  rentAmount: number.isRequired,
  depositAmount: number.isRequired,
  depositFreeAvailable: bool.isRequired,
  propertyImages: arrayOf(
    shape({
      id: string.isRequired,
      property: object,
      url: string.isRequired,
      isPrimary: bool,
      createdAt: string,
      updatedAt: string,
    }),
  ),
  landlord: object.isRequired,
  address: shape({
    line1: string,
    line2: string,
    town: string,
    state: string,
    postCode: string,
    countryCode: string,
  }),
  createdBy: string.isRequired,
  agencyId: string.isRequired,
  branchId: string.isRequired,
  createdAt: string,
  updatedAt: string,
});
