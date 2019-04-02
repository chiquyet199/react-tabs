import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";
import {TenancyTerms} from "./TenancyTerms";
import {Accordion} from "../Accordion";
import {SectionText} from "./ActiveTenancy.styles";
import {DepositFree} from "./DepositFree";
import {Housemates} from "./Housemates";

describe("Active tenancy component tests", () => {
  describe("TenancyTerms tests", () => {
    it(`matches snapshot on ${Platform.OS}`, () => {
      expect(getComponent()).toMatchSnapshot();
    });

    it("displays end date when it's provided", () => {
      const lease = getMockLease();
      lease.duration.startDate = "2018-12-12";
      lease.duration.durationMonths = 12;
      const children = getAccordionChildren({lease});
      expect(children.find(SectionText).at(1)).toHaveProp(
        "children",
        "12.12.2018 - 12.12.2019",
      );
    });

    it("displays ongoing when end date isn't provided", () => {
      const lease = getMockLease();
      const ongoing = "lorem ipsum";
      lease.duration.startDate = "2018-12-12";
      const children = getAccordionChildren({
        lease,
        translations: getTranslations({ongoing}),
      });
      expect(children.find(SectionText).at(1)).toHaveProp(
        "children",
        `12.12.2018 - ${ongoing}`,
      );
    });

    const getAccordionChildren = props => {
      const component = getComponent(props);

      return component.find(Accordion).dive();
    };

    const getComponent = props => {
      const parsedProps = {
        lease: getMockLease(),
        translations: getTranslations(),
        ...props,
      };

      return shallow(<TenancyTerms {...parsedProps} />);
    };

    const getTranslations = translations => ({
      additionalInfoTitle: "additionalInfoTitle",
      currency_symbol: "currency_symbol",
      ongoing: "ongoing",
      subTitle: "subTitle",
      termTitle: "termTitle",
      title: "title",
      totalRentTitle: "totalRentTitle",
      tenancyPeriodAbbreviations: {
        WEEKLY: "WEEKLY",
        FORTNIGHTLY: "FORTNIGHTLY",
        FOUR_WEEKLY: "FOUR_WEEKLY",
        MONTHLY: "MONTHLY",
        YEARLY: "YEARLY",
      },
      ...translations,
    });
  });

  describe("DepositFree tests", () => {
    it(`matches snapshot on ${Platform.OS}`, () => {
      expect(getComponent()).toMatchSnapshot();
    });

    const getComponent = props => {
      const parsedProps = {
        lease: getMockLease(),
        translations: getTranslations(),
        ...props,
      };

      return shallow(<DepositFree {...parsedProps} />);
    };

    const getTranslations = translations => ({
      subTitle: "depositFreeSubTitle",
      title: "depositFreeTitle",
      documentTypes: {
        POLICY_SCHEDULE: "POLICY_SCHEDULE",
        STATEMENT_OF_FACTS: "STATEMENT_OF_FACTS",
        POLICY_WORDING: "POLICY_WORDING",
        INSURANCE_PRODUCT_INFORMATION_DOCUMENT:
          "INSURANCE_PRODUCT_INFORMATION_DOCUMENT",
        INSURANCE_SERVICE_INFORMATION_DOCUMENT:
          "INSURANCE_SERVICE_INFORMATION_DOCUMENT",
        AST: "AST",
      },
      ...translations,
    });
  });

  describe("Housemates tests", () => {
    it(`matches snapshot on ${Platform.OS}`, () => {
      expect(getComponent()).toMatchSnapshot();
    });

    const getComponent = props => {
      const parsedProps = {
        lease: getMockLease(),
        translations: {
          title: "title",
          subTitle: "subtitle",
        },
        ...props,
      };

      return shallow(<Housemates {...parsedProps} />);
    };
  });
});

const getMockLease = () => ({
  id: "abc-123",
  branchId: "def-456",
  property: getMockProperty(),
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
