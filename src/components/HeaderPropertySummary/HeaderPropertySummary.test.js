import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";
import {HeaderPropertySummary} from "./HeaderPropertySummary";
import {FullDetailsLink} from "./HeaderPropertySummary.style";
import {
  getRentDueDate,
  getPrimaryPropertyImage,
} from "../../utils/helpers/property";

jest.mock("../../utils/helpers/property");

describe("HeaderPropertySummary test", () => {
  beforeAll(() => {
    getRentDueDate.mockReturnValue("2019-01-07");
    getPrimaryPropertyImage.mockReturnValue(
      "https://media.rightmove.co.uk/dir/152k/151109/61705537/151109_344038-1_IMG_19_0002_max_656x437.jpg",
    );
  });

  beforeEach(() => {
    getRentDueDate.mockClear();
    getPrimaryPropertyImage.mockClear();
  });

  it(`HeaderPropertySummary snapshot test on - ${Platform.OS}`, () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it("should pass lease to getRentDueDate", () => {
    const lease = getMockLease();
    getComponent({lease});
    expect(getRentDueDate).toHaveBeenCalledWith(lease);
  });

  it("should pass property images to getPrimaryPropertyImage", () => {
    const property = getMockProperty();
    getComponent({lease: getMockLease(property)});
    expect(getPrimaryPropertyImage).toHaveBeenCalledWith(
      property.propertyImages,
    );
  });

  it("calls goTo with '/property-listing/{id}' when FullDetailsLink pressed", () => {
    const propertyId = "abc-123-def-456";
    const lease = getMockLease();
    lease.property.id = propertyId;
    const goTo = jest.fn();
    const component = getComponent({goTo, lease});
    component.find(FullDetailsLink).simulate("press");
    expect(goTo).toHaveBeenCalledWith(`/property-listing/${propertyId}`);
  });

  const getComponent = props => {
    const parsedProps = {
      goTo: () => {},
      lease: getMockLease(),
      translations: {
        currency_symbol: "currency_symbol",
        rentDueDate: "rentDueDate",
      },
      ...props,
    };

    return shallow(<HeaderPropertySummary {...parsedProps} />);
  };
});

const getMockLease = (property = getMockProperty()) => ({
  id: "abc-123",
  branchId: "def-456",
  property,
  renters: [
    {
      userId: "ghi-789",
      depositOptions: [{type: "DEPOSIT_FREE"}],
    },
  ],
  status: "ACTIVE",
  rentAmount: 1234,
  rentFrequency: "MONTHLY",
  duration: {
    minimumMonths: 6,
    startDate: "2018-11-06T00:00:00",
  },
  conditionsFreeText: "",
  documents: [],
});

const getMockProperty = () => ({
  id: "abc-123",
  presentation: {
    bathroomsCount: 1,
    bedroomsCount: 2,
    furnishedType: "PART_FURNISHED",
    hasOutsideSpace: true,
    hasParking: true,
    petsAllowed: false,
    propertyType: "HOUSE",
    smokingAllowed: false,
  },
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
      url:
        "https://media.rightmove.co.uk/dir/152k/151109/61705537/151109_344038-1_IMG_19_0002_max_656x437.jpg",
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
});
