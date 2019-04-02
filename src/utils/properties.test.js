import {extractBranch} from "./properties";

const branches = [
  {
    id: "234-234-234-234",
    name: "Hounslow",
    address: "123 Shtreet",
    properties: "234",
    users: "53",
    added: "2018-06-29T21:43:53.184Z",
  },
  {
    id: "4545-4545-4545",
    name: "Croydon",
    address: "22 Alley",
    properties: "345",
    users: "44",
    added: "2018-06-29T21:43:53.184Z",
  },
  {
    id: "3",
    name: "Helsington",
    address: "69 Way",
    properties: "212",
    users: "22",
    added: "2018-06-29T21:43:53.184Z",
  },
];

const properties = [
  {
    id: 1,
    presentation: {},
    rentFrequency: "MONTHLY",
    rentAmount: 2352,
    depositAmount: 2000,
    depositFreeAvailable: true,
    status: "AVAILABLE",
    propertyImages: [
      {
        id: 1,
        property: {},
        url: "https://placeimg.com/200/200/arch",
        isPrimary: true,
        createdAt: new Date(),
        updateAt: new Date(),
      },
      {
        id: 2,
        property: {},
        url: "https://placeimg.com/200/200/arch",
        isPrimary: false,
        createdAt: new Date(),
        updateAt: new Date(),
      },
    ],
    landlord: {},
    address: {
      line1: "12 Durrrpa",
      line2: "Test",
      town: "Rochester",
      state: "Kent",
      postCode: "TE1 2ST",
      countryCode: "GB",
    },
    createdBy: "admin",
    agencyId: "424-23423-23423",
    branchId: "234-234-234-234",
    createdAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: 2,
    presentation: {},
    rentFrequency: "MONTHLY",
    rentAmount: 2352,
    depositAmount: 2000,
    depositFreeAvailable: true,
    status: "AVAILABLE",
    propertyImages: [
      {
        id: 1,
        property: {},
        url: "https://placeimg.com/200/200/arch",
        isPrimary: true,
        createdAt: new Date(),
        updateAt: new Date(),
      },
      {
        id: 2,
        property: {},
        url: "https://placeimg.com/200/200/arch",
        isPrimary: false,
        createdAt: new Date(),
        updateAt: new Date(),
      },
    ],
    landlord: {},
    address: {
      line1: "12 Durrrpa",
      line2: "Test",
      town: "Rochester",
      state: "Kent",
      postCode: "TE1 2ST",
      countryCode: "GB",
    },
    createdBy: "admin",
    agencyId: "424-23423-23423",
    branchId: "4545-4545-4545",
    createdAt: new Date(),
    updateAt: new Date(),
  },
];

describe("extractBranch - Extracts correct object for current branch", () => {
  it("filters the branches against properties to extract object containing one", () => {
    const result = extractBranch(branches, properties);
    expect(result).toEqual(branches[0]);
  });
});
