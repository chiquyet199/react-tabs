import React from "react";
import {Platform, TouchableOpacity} from "react-native";
import {
  PropertyImage,
  PropertyItemWrapper,
  PropertyAddressLine,
  StyledDefaultPropertyThumbnail,
  PropertyRent,
} from "./PropertyItem.styles.js";
import {shallow} from "enzyme";
import {extend} from "underscore";
import {
  getMockProperties,
  getMockTranslations,
  getMockPropertiesAsArray,
} from "../../__mocks__/properties";
import {PropertyItem} from "./PropertyItem";
import {getPrimaryPropertyImage} from "../../utils/helpers/property";

jest.mock("../../utils/helpers/property");

describe("Property item tests", () => {
  beforeEach(() => {
    getPrimaryPropertyImage.mockClear();
    getPrimaryPropertyImage.mockImplementation(
      () => "http://www.findyourcanopy.com/img124.jpeg",
    );
  });

  it("PropertyItem snapshot test on - " + Platform.OS, () => {
    expect(getComponent()).toMatchSnapshot();
  });

  describe("Property Image", () => {
    it("displays image source passed from getPrimaryPropertyImage", () => {
      const properties = getMockProperties();
      const testCases = [
        [
          properties.hasPrimaryImageNotAtZero,
          "http://www.findyourcanopy.com/image101.jpeg",
        ],
        [
          properties.hasPrimaryImageAtZero,
          "http://www.findyourcanopy.com/image202.jpeg",
        ],
        [
          properties.hasMixOfImagesOneIsPrimaryRestMayNotHaveField,
          "http://www.findyourcanopy.com/image303.jpeg",
        ],
      ];

      for (let x = 0; x < testCases.length; x += 1) {
        const [data, image] = testCases[x];
        getPrimaryPropertyImage.mockImplementation(() => image);

        const propertyImage = getComponent({data}).find(PropertyImage);

        expect(getPrimaryPropertyImage).toHaveBeenCalledWith(
          data.propertyImages,
        );
        expect(propertyImage).toHaveProp(
          "source",
          expect.objectContaining({
            uri: image,
          }),
        );
      }
    });

    it("displays a default image if there're no images", () => {
      const data = getMockProperties().hasNoImages;
      getPrimaryPropertyImage.mockImplementation(() => null);
      expect(
        getComponent({data}).find(StyledDefaultPropertyThumbnail),
      ).toExist();
    });
  });

  describe("Property Settlement", () => {
    it("displays town when there's no city", () => {
      const data = getMockProperties().hasTownNoCity;
      const secondAddressLine = getComponent({data})
        .find(PropertyAddressLine)
        .at(1);
      expect(secondAddressLine).toHaveProp("children", data.address.town);
    });

    it("displays city when there's no town", () => {
      const data = getMockProperties().hasCityNoTown;
      const secondAddressLine = getComponent({data})
        .find(PropertyAddressLine)
        .at(1);
      expect(secondAddressLine).toHaveProp("children", data.address.city);
    });

    it("displays city when there's both city and town", () => {
      const data = getMockProperties().hasCityAndTown;
      const secondAddressLine = getComponent({data})
        .find(PropertyAddressLine)
        .at(1);
      expect(secondAddressLine).toHaveProp("children", data.address.city);
    });
  });

  describe("Property Rental Period", () => {
    it("displays weekly rental period abbreviation", () => {
      const data = getMockProperties().hasWeeklyRent;
      const translations = getMockTranslations({
        rental_period_abbreviations: {weekly: "weekly"},
      });
      const rent = getComponent({data, translations}).find(PropertyRent);
      expect(rent.prop("children")).toEqual(
        expect.stringContaining(
          translations.rental_period_abbreviations.weekly,
        ),
      );
    });

    it("displays fortnightly rental period abbreviation", () => {
      const data = getMockProperties().hasFortnightlyRent;
      const translations = getMockTranslations({
        rental_period_abbreviations: {fortnightly: "fortnightly"},
      });
      const rent = getComponent({data, translations}).find(PropertyRent);
      expect(
        rent
          .prop("children")
          .endsWith(translations.rental_period_abbreviations.fortnightly),
      ).toBeTruthy();
    });

    it("displays four weekly rental period abbreviation", () => {
      const data = getMockProperties().hasFourWeeklyRent;
      const translations = getMockTranslations({
        rental_period_abbreviations: {four_weekly: "four_weekly"},
      });
      const rent = getComponent({data, translations}).find(PropertyRent);
      expect(
        rent
          .prop("children")
          .endsWith(translations.rental_period_abbreviations.four_weekly),
      ).toBeTruthy();
    });

    it("displays monthly rental period abbreviation", () => {
      const data = getMockProperties().hasMonthlyRent;
      const translations = getMockTranslations({
        rental_period_abbreviations: {monthly: "monthly"},
      });
      const rent = getComponent({data, translations}).find(PropertyRent);
      expect(
        rent
          .prop("children")
          .endsWith(translations.rental_period_abbreviations.monthly),
      ).toBeTruthy();
    });

    it("displays yearly rental period abbreviation", () => {
      const data = getMockProperties().hasYearlyRent;
      const translations = getMockTranslations({yearly: "yearly"});
      const rent = getComponent({data, translations}).find(PropertyRent);
      expect(
        rent
          .prop("children")
          .endsWith(translations.rental_period_abbreviations.yearly),
      ).toBeTruthy();
    });
  });

  describe("Item click", () => {
    it("fires click handler on item click", () => {
      const properties = getMockPropertiesAsArray();
      for (let x = 0; x < properties.length; x += 1) {
        const data = properties[x];
        const itemClick = jest.fn();
        const wrapper = getComponent({data, itemClick});
        wrapper.simulate("press");
        expect(itemClick).toHaveBeenCalledWith(data.id);
      }
    });

    it("doesn't crash if no itemClick provided", () => {
      const properties = getMockPropertiesAsArray();
      for (let x = 0; x < properties.length; x += 1) {
        const data = properties[x];
        const wrapper = getComponent({data, itemClick: undefined});
        expect(() => wrapper.simulate("press")).not.toThrow();
      }
    });

    it("wraps component in TouchableOpacity if itemClick provided", () => {
      expect(getComponent().type()).toBe(TouchableOpacity);
    });

    it("doesn't wrap component in TouchableOpacity if no itemClick provided", () => {
      expect(getComponent({itemClick: undefined}).type()).toBe(
        PropertyItemWrapper,
      );
    });
  });

  const getComponent = props => {
    const parsedProps = extend(
      {
        data: getMockPropertiesAsArray()[0],
        translations: getMockTranslations(),
        itemClick: () => {},
      },
      props,
    );

    return shallow(<PropertyItem {...parsedProps} />);
  };
});
