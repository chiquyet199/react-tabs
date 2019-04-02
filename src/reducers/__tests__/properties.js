import propertiesReducer from "../properties";
import {
  GET_PROPERTY_LIST,
  GET_PROPERTY_PASSPORTS_GROUP,
  GET_PROPERTY,
  DELETE_PROPERTY,
  GET_PROPERTY_ACTIVE_LEASE,
} from "../../actions/types";

const fakeState = {test: "fakeState"};

describe("Properties Reducer", () => {
  it("throws an error without an action", () => {
    expect(() => propertiesReducer(fakeState)).toThrow();
  });

  it("will return the same state without a matching action.type", () => {
    const newState = propertiesReducer(fakeState, {type: "fakeAction"});
    expect(newState).toEqual(fakeState);
  });

  it("return the proper initialState when called without state", () => {
    const newState = propertiesReducer(undefined, {type: "fakeAction"});
    expect(newState).toEqual({
      values: {},
      sharedRentPassports: [],
      property: {},
      passportsInvitedToRent: [],
    });
  });

  it("returns the expected state for GET_PROPERTY_LIST action", () => {
    const data = getPropertyList();
    const newState = propertiesReducer(fakeState, {
      type: GET_PROPERTY_LIST,
      value: data,
    });
    expect(newState).toEqual({
      test: "fakeState",
      values: data,
    });
  });

  it("return the proper state for a GET_PROPERTY action type", () => {
    const property = {property: "test"};
    const newState = propertiesReducer(undefined, {
      type: GET_PROPERTY,
      property,
    });
    expect(newState).toEqual({
      property: property.property,
      sharedRentPassports: [],
      values: {},
      passportsInvitedToRent: [],
    });
  });

  it("return the proper state for a DELETE_PROPERTY action type", () => {
    const newState = propertiesReducer(undefined, {
      type: DELETE_PROPERTY,
    });
    expect(newState).toEqual({
      property: {},
      sharedRentPassports: [],
      values: {},
      passportsInvitedToRent: [],
    });
  });

  it("returns the expected state for GET_PROPERTY_PASSPORTS_GROUP action", () => {
    const data = getRentPassportsGroup();
    const newState = propertiesReducer(fakeState, {
      type: GET_PROPERTY_PASSPORTS_GROUP,
      rentPassportsGroup: data,
    });
    expect(newState).toEqual({
      test: "fakeState",
      property: {rentPassportsGroup: data},
    });
  });

  it("returns the expected state for GET_PROPERTY_ACTIVE_LEASE action", () => {
    const lease = getSampleLease();
    const newState = propertiesReducer(fakeState, {
      type: GET_PROPERTY_ACTIVE_LEASE,
      value: lease,
    });
    expect(newState).toEqual(
      expect.objectContaining({
        property: {
          lease,
        },
      }),
    );
  });

  const getSampleLease = (id = "abc-123") => ({
    id,
    branchId: "zyx-999",
    property: {},
    renters: [],
    agent: {},
    status: {},
    rentAmount: 999,
    rentFrequency: "MONTHLY",
    duration: {},
    conditionsFreeText: "",
    documents: [],
  });

  const getPropertyList = () => [
    {
      id: "abc-123",
      presentation: {},
      rentFrequency: "WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-456",
          url: "http://www.findyourcanopy.com/img123.jpeg",
          isPrimary: false,
        },
        {
          id: "def-457",
          url: "http://www.findyourcanopy.com/img124.jpeg",
          isPrimary: true,
        },
        {
          id: "def-458",
          url: "http://www.findyourcanopy.com/img125.jpeg",
          isPrimary: false,
        },
      ],
      landlord: {},
      address: {
        line1: "29 Acacia Road",
        town: "Beanotown",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-124",
      presentation: {},
      rentFrequency: "WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      landlord: {},
      address: {
        line1: "30 Acacia Road",
        line2: "Clifton",
        town: "Beanotown",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-125",
      presentation: {},
      rentFrequency: "WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img127.jpeg",
          isPrimary: true,
        },
        {
          id: "def-460",
          url: "http://www.findyourcanopy.com/img128.jpeg",
          isPrimary: false,
        },
        {
          id: "def-461",
          url: "http://www.findyourcanopy.com/img129.jpeg",
          isPrimary: false,
        },
      ],
      landlord: {},
      address: {
        line1: "31 Acacia Road",
        town: "Beanotown",
        postCode: "BE1 1BE",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-135",
      presentation: {},
      rentFrequency: "WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img144.jpeg",
        },
        {
          id: "def-460",
          url: "http://www.findyourcanopy.com/img145.jpeg",
          isPrimary: false,
        },
        {
          id: "def-461",
          url: "http://www.findyourcanopy.com/img146.jpeg",
        },
      ],
      landlord: {},
      address: {
        line1: "31 Acacia Road",
        town: "Beanotown",
        postCode: "BE1 1BE",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-126",
      presentation: {},
      rentFrequency: "WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-465",
          url: "http://www.findyourcanopy.com/img130.jpeg",
        },
        {
          id: "def-466",
          url: "http://www.findyourcanopy.com/img131.jpeg",
          isPrimary: false,
        },
        {
          id: "def-467",
          url: "http://www.findyourcanopy.com/img132.jpeg",
          isPrimary: false,
        },
        {
          id: "def-468",
          url: "http://www.findyourcanopy.com/img133.jpeg",
          isPrimary: true,
        },
        {
          id: "def-469",
          url: "http://www.findyourcanopy.com/img134.jpeg",
        },
        {
          id: "def-470",
          url: "http://www.findyourcanopy.com/img135.jpeg",
        },
      ],
      landlord: {},
      address: {
        line1: "32 Acacia Road",
        town: "Beanotown",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-127",
      presentation: {},
      rentFrequency: "WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img136.jpeg",
          isPrimary: true,
        },
      ],
      landlord: {},
      address: {
        line1: "32 Acacia Road",
        town: "Beanotown",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-128",
      presentation: {},
      rentFrequency: "WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img137.jpeg",
          isPrimary: true,
        },
      ],
      landlord: {},
      address: {
        line1: "32 Acacia Road",
        city: "Aberdeen",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-129",
      presentation: {},
      rentFrequency: "WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img138.jpeg",
          isPrimary: true,
        },
      ],
      landlord: {},
      address: {
        line1: "32 Acacia Road",
        town: "Beanotown",
        city: "Aberdeen",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-130",
      presentation: {},
      rentFrequency: "WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img139.jpeg",
          isPrimary: true,
        },
      ],
      landlord: {},
      address: {
        line1: "32 Acacia Road",
        town: "Beanotown",
        city: "Aberdeen",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-131",
      presentation: {},
      rentFrequency: "FORTNIGHTLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img140.jpeg",
          isPrimary: true,
        },
      ],
      landlord: {},
      address: {
        line1: "32 Acacia Road",
        town: "Beanotown",
        city: "Aberdeen",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-132",
      presentation: {},
      rentFrequency: "FOUR_WEEKLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img141.jpeg",
          isPrimary: true,
        },
      ],
      landlord: {},
      address: {
        line1: "32 Acacia Road",
        town: "Beanotown",
        city: "Aberdeen",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-133",
      presentation: {},
      rentFrequency: "MONTHLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img142.jpeg",
          isPrimary: true,
        },
      ],
      landlord: {},
      address: {
        line1: "32 Acacia Road",
        town: "Beanotown",
        city: "Aberdeen",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
    {
      id: "abc-134",
      presentation: {},
      rentFrequency: "YEARLY",
      rentAmount: 1234.99,
      depositAmount: 1000,
      depositFreeAvailable: true,
      propertyImages: [
        {
          id: "def-459",
          url: "http://www.findyourcanopy.com/img143.jpeg",
          isPrimary: true,
        },
      ],
      landlord: {},
      address: {
        line1: "32 Acacia Road",
        town: "Beanotown",
        city: "Aberdeen",
        state: "Aberdeenshire",
        postCode: "BE1 1BE",
        countryCode: "UK",
      },
      createdBy: "Homogenous cohorts",
      agencyId: "22",
      branchId: "44",
    },
  ];
});

const getRentPassportsGroup = () => ({
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
    {
      id: "1",
      email: "james-wang@gmail.com",
      userId: "james_userId",
      passport: {
        aboutInfo: {
          email: "james-wang@gmail.com",
          firstName: "James",
          lastName: "Wang",
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
            contactFirstName: "James",
            contactLastName: "Wang",
            contactEmailAddress: "james-wang@gmail.com",
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
            contactFirstName: "James",
            contactLastName: "Wang",
            contactEmailAddress: "james-wang@gmail.com",
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
      status: "EXPIRED",
    },
    {
      id: "2",
      email: "joshua_yates99@gmail.com",
      userId: "joshua_yates99",
      passport: {
        aboutInfo: {
          email: "joshua_yates99@gmail.com",
          firstName: "Joshua",
          lastName: "Yates",
          middleName: "Yates",
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
            contactFirstName: "James",
            contactLastName: "Wang",
            contactEmailAddress: "james-wang@gmail.com",
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
            contactFirstName: "James",
            contactLastName: "Wang",
            contactEmailAddress: "james-wang@gmail.com",
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
      status: "PENDING",
    },
    {
      id: "3",
      email: "jennifer-jones@gmail.com",
      userId: "jennifer-jones_id",
      passport: {
        aboutInfo: {
          email: "jennifer-jones@gmail.com",
          firstName: "Jennifer",
          lastName: "Jones",
          middleName: "Charles",
          gender: "FEMALE",
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
            contactFirstName: "James",
            contactLastName: "Wang",
            contactEmailAddress: "james-wang@gmail.com",
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
            contactFirstName: "James",
            contactLastName: "Wang",
            contactEmailAddress: "james-wang@gmail.com",
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
      expiresAt: "01-01-2019",
      status: "CANCELLED",
    },
  ],
});
