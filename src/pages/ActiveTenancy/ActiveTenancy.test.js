import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";
import {ActiveTenancy} from "./ActiveTenancy";
import {DepositFree, Housemates} from "../../components/ActiveTenancy";
import Spinner from "../../components/Spinner";

describe("ActiveTenancy page tests", () => {
  it(`matches snapshot on ${Platform.OS}`, () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it("sets spinner isLoading to true when lease not provided", () => {
    expect(getComponent({lease: undefined}).find(Spinner)).toHaveProp(
      "visible",
      true,
    );
  });

  it("sets topbar text to be first line of property address", () => {
    const property = getMockProperty();
    property.address = {
      line1: "10 Downing Street",
      town: "London",
      postCode: "SW1A 2AA",
    };
    const showTopbarCenterText = jest.fn();
    getComponent({lease: getMockLease(property), showTopbarCenterText});
    expect(showTopbarCenterText).toHaveBeenCalledWith(property.address.line1);
  });

  it("doesn't set topbar text when lease not provided", () => {
    const showTopbarCenterText = jest.fn();
    getComponent({lease: undefined, showTopbarCenterText});
    expect(showTopbarCenterText).not.toHaveBeenCalled();
  });

  it("omits deposit free section if lease has no documents", () => {
    const lease = getMockLease();
    lease.documents = [];
    const component = getComponent({lease});
    expect(component.find(DepositFree)).not.toExist();
  });

  it("doesn't display housemates section if there's only one tenant", () => {
    const lease = getMockLease();
    lease.renters.length = 1;
    const component = getComponent({lease});
    expect(component.find(Housemates)).not.toExist();
  });

  it("requests lease by property id on mount", () => {
    const findLeaseByProperty = jest.fn();
    const match = {params: {id: "abc-123"}};
    getComponent({findLeaseByProperty, match});
    expect(findLeaseByProperty).toHaveBeenCalledWith(match.params.id);
  });

  const getComponent = props => {
    const parsedProps = {
      findLeaseByProperty: () => {},
      lease: getMockLease(),
      match: {
        params: {
          id: "",
        },
      },
      showTopbarCenterText: () => {},
      ...props,
    };

    return shallow(<ActiveTenancy {...parsedProps} />);
  };
});

const getMockLease = property => ({
  id: "abc-123",
  branchId: "def-456",
  property: property || getMockProperty(),
  renters: [
    {
      userId: "ghi-789",
      depositOptions: [{type: "DEPOSIT_FREE"}],
      firstName: "Bill",
      lastName: "Oddy",
    },
    {
      userId: "ghi-987",
      depositOptions: [{type: "DEPOSIT_FREE"}],
      firstName: "Damon",
      lastName: "Albarn",
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
  documents: [
    {
      type: "POLICY_SCHEDULE",
      ref: "ghi-998",
      createdAt: "2018-06-01T15:32:48",
    },
    {
      type: "STATEMENT_OF_FACTS",
      ref: "ghi-712",
      createdAt: "2018-06-01T15:48:48",
    },
  ],
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
