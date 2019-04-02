import {getMockProperties} from "../../__mocks__/properties";
import {getPrimaryPropertyImage, getRentDueDate} from "./property";

describe("Property Image", () => {
  it("returns image marked as primary image", () => {
    const properties = getMockProperties();
    const testCases = [
      properties.hasPrimaryImageNotAtZero,
      properties.hasPrimaryImageAtZero,
      properties.hasMixOfImagesOneIsPrimaryRestMayNotHaveField,
    ];

    for (let x = 0; x < testCases.length; x += 1) {
      const property = testCases[x];
      expect(getPrimaryPropertyImage(property.propertyImages)).toBe(
        property.propertyImages.find(img => img.isPrimary).url,
      );
    }
  });

  it("returns null if there're no images", () => {
    const property = getMockProperties().hasNoImages;
    expect(getPrimaryPropertyImage(property.propertyImages)).toBeNull();
  });

  it("returns first image if there's no primary image", () => {
    const property = getMockProperties().hasNoPrimaryImage;
    expect(getPrimaryPropertyImage(property.propertyImages)).toBe(
      property.propertyImages[0].url,
    );
  });
});

describe("Rent due date", () => {
  it("calculates next rent due date, from lease start date and frequency", () => {
    const sampleLeaseData = getSampleLeases();
    for (let x = 0; x < sampleLeaseData.length; x += 1) {
      const {lease, dueDate, referenceDate} = sampleLeaseData[x];
      expect(getRentDueDate(lease, referenceDate)).toBe(dueDate);
    }
  });
});

const getSampleLeases = () => [
  {
    lease: {
      duration: {startDate: "2018-06-14T00:00:00"},
      rentFrequency: "MONTHLY",
    },
    referenceDate: "2018-12-07T09:00:00",
    dueDate: "2018-12-14",
  },
  {
    lease: {
      duration: {startDate: "2018-08-03T00:00:00"},
      rentFrequency: "MONTHLY",
    },
    referenceDate: "2018-12-07T09:00:00",
    dueDate: "2019-01-03",
  },
  {
    lease: {
      duration: {startDate: "2015-08-31T00:00:00"},
      rentFrequency: "MONTHLY",
    },
    referenceDate: "2016-02-07T09:00:00",
    dueDate: "2016-02-29",
  },
  {
    lease: {
      duration: {startDate: "2015-08-31T00:00:00"},
      rentFrequency: "MONTHLY",
    },
    referenceDate: "2016-02-29T09:00:00",
    dueDate: "2016-03-31",
  },
  {
    lease: {
      duration: {startDate: "2018-11-02T00:00:00"},
      rentFrequency: "MONTHLY",
    },
    referenceDate: "2018-12-01T09:00:00",
    dueDate: "2018-12-03",
  },
  {
    lease: {
      duration: {startDate: "2018-11-15T00:00:00"},
      rentFrequency: "MONTHLY",
    },
    referenceDate: "2018-12-01T09:00:00",
    dueDate: "2018-12-17",
  },
  {
    lease: {
      duration: {startDate: "2018-08-03T00:00:00"},
      rentFrequency: "WEEKLY",
    },
    referenceDate: "2018-12-06",
    dueDate: "2018-12-07",
  },
  {
    lease: {
      duration: {startDate: "2018-08-03T00:00:00"},
      rentFrequency: "FORTNIGHTLY",
    },
    referenceDate: "2018-12-06",
    dueDate: "2018-12-07",
  },
  {
    lease: {
      duration: {startDate: "2018-08-10T00:00:00"},
      rentFrequency: "FORTNIGHTLY",
    },
    referenceDate: "2018-12-06",
    dueDate: "2018-12-14",
  },
  {
    lease: {
      duration: {startDate: "2018-08-03T00:00:00"},
      rentFrequency: "FOUR_WEEKLY",
    },
    referenceDate: "2018-12-06",
    dueDate: "2018-12-21",
  },
  {
    lease: {
      duration: {startDate: "2018-08-02T00:00:00"},
      rentFrequency: "YEARLY",
    },
    referenceDate: "2018-12-06",
    dueDate: "2019-08-02",
  },
];
