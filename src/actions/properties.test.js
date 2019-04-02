import {
  getProperty,
  deleteProperty,
  setPassportsGroup,
} from "../actions/properties";
import {
  GET_PROPERTY,
  DELETE_PROPERTY,
  GET_PROPERTY_PASSPORTS_GROUP,
} from "./types";

const mockProperty = {
  id: 1,
  slides: [{thumbnail: "test.jpg"}],
  name: "Test property",
};

const mockPropertyRentPassportGroup = {
  id: "1bc9925d-6a112e6-4448-9523-05912cdce917",
  branchId: "branch-id-passed-to-rent-passport-view",
  status: "PENDING",
  agents: ["agent-uuid"],
  properties: [{propertyId: "property-id", createdBy: "agent-uuid"}],
  passports: [
    {
      id: "0",
      email: "jonathan@gmail.com",
      userId: "jonathan_userId",
      passport: {
        aboutInfo: {
          email: "jonathan@gmail.com",
          firstName: "Jonathan",
          lastName: "Beaumont",
          middleName: "Charles",
          gender: "MALE",
          dayOfBirth: 1,
          monthOfBirth: 1,
          yearOfBirth: 1970,
          maritalStatus: "MARRIED",
          phoneNumber: "01123456789",
          nationality: "UK",
          isSmoker: true,
          hasPets: true,
          hasChildren: true,
        },
        residenceInfo: {
          residenceType: "RENTING_FROM_AGENT",
          livedSinceMonth: 1,
          livedSinceYear: 1,
          livedToMonth: null,
          livedToYear: null,
          reference: {
            contactFirstName: "Jonathan",
            contactLastName: "Beaumont",
            contactEmailAddress: "jonathan@gmail.com",
            referredAt: "01-01-2018",
          },
        },
        workInfo: {
          residenceType: "RENTING_FROM_AGENT",
          livedSinceMonth: 1,
          livedSinceYear: 1,
          livedToMonth: null,
          livedToYear: null,
          reference: {
            contactFirstName: "Jonathan",
            contactLastName: "Beaumont",
            contactEmailAddress: "jonathan@gmail.com",
            referredAt: "01-01-2018",
          },
        },
        annualIncomeInfo: {
          salary: 11,
          pension: 11,
          interest: 11,
          benefits: 11,
          rentals: 11,
          other: 11,
        },
      },
      expiresAt: "01-01-2018",
      status: "SHARED",
    },
  ],
};

describe("getProperty actions tests", () => {
  it("has type of GET_PROPERTY", () => {
    expect(getProperty()).toEqual(
      expect.objectContaining({type: GET_PROPERTY}),
    );
  });
  it("has property data", () => {
    const property = mockProperty;
    expect(getProperty(property)).toEqual(
      expect.objectContaining({
        type: "GET_PROPERTY",
        property,
      }),
    );
  });
});
describe("deleteProperty tests", () => {
  it("has type of DELETE_PROPERTY", () => {
    expect(deleteProperty()).toEqual(
      expect.objectContaining({type: DELETE_PROPERTY}),
    );
  });
});

describe("setPassportsGroup tests", () => {
  it("has type of GET_PROPERTY_PASSPORTS_GROUP", () => {
    expect(setPassportsGroup()).toEqual(
      expect.objectContaining({
        type: GET_PROPERTY_PASSPORTS_GROUP,
      }),
    );
  });

  it("has a set of rent passports", () => {
    expect(setPassportsGroup(mockPropertyRentPassportGroup)).toEqual(
      expect.objectContaining({
        type: GET_PROPERTY_PASSPORTS_GROUP,
        rentPassportsGroup: mockPropertyRentPassportGroup,
      }),
    );
  });
});
