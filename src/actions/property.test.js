import API from "../utils/api";
import {getPropertyList} from "./property";
import {errorNotification} from "./notifications";

jest.mock("../utils/api/properties");
jest.mock("./notifications");

describe("Property action tests", () => {
  beforeEach(() => {
    API.getProperties.mockClear();
    errorNotification.mockClear();
  });

  describe("getPropertyList tests", () => {
    it("calls getProperties on API", () => {
      invokeGetPropertyList();
      expect(API.getProperties).toHaveBeenCalled();
    });

    it("passes agencyId to getProperties API call", () => {
      const agencyId = 123;
      invokeGetPropertyList(agencyId);
      expect(API.getProperties).toHaveBeenCalledWith({
        agencyId,
        branchId: undefined,
        searchParams: undefined,
      });
    });

    it("passes branchId to getProperties API call", () => {
      const branchId = 321;
      invokeGetPropertyList(undefined, branchId);
      expect(API.getProperties).toHaveBeenCalledWith({
        agencyId: undefined,
        branchId,
        searchParams: undefined,
      });
    });

    it("passes searchParams", () => {
      const searchParams = {
        order: "desc",
        orderBy: "name",
        search: "",
      };
      invokeGetPropertyList(undefined, undefined, searchParams);
      expect(API.getProperties).toHaveBeenCalledWith({
        agencyId: undefined,
        branchId: undefined,
        searchParams,
      });
    });

    it("dispatches error notification on service failure", async () => {
      const error = new Error("Unable to contact API service");
      const en = {type: "FAKE_ERROR", message: error};
      API.getProperties.mockImplementation(async () => {
        throw error;
      });
      errorNotification.mockImplementation(() => {
        return en;
      });
      const {dispatchFake} = await invokeGetPropertyList();
      expect(errorNotification).toHaveBeenCalled();
      expect(dispatchFake).toHaveBeenCalledWith(en);
    });

    it("returns properties from API call", async () => {
      const getPropertiesServiceReponse = getMockPropertyData();
      API.getProperties.mockImplementation(async () => {
        return getPropertiesServiceReponse;
      });
      const {result} = await invokeGetPropertyList();
      expect(result).toEqual(
        expect.objectContaining(getPropertiesServiceReponse),
      );
    });

    it("returns empty array on service failure", async () => {
      const error = new Error("Unable to contact API service");
      API.getProperties.mockImplementation(async () => {
        throw error;
      });
      const {result} = await invokeGetPropertyList();
      expect(result).toEqual([]);
    });

    const invokeGetPropertyList = async (agencyId, branchId, searchParams) => {
      const dispatchFake = jest.fn();
      const result = await getPropertyList({agencyId, branchId, searchParams})(
        dispatchFake,
        getState,
      );

      return {dispatchFake, result};
    };

    const getState = () => ({
      agencyBranches: {
        isFetching: false,
        items: [
          {
            id: "234-234-234-234",
            name: "Houslow",
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
            id: "44",
            name: "Helsington",
            address: "69 Way",
            properties: "212",
            users: "22",
            added: "2018-06-29T21:43:53.184Z",
          },
        ],
      },
    });

    const getMockPropertyData = () => [
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
});
