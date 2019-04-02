export default {
  ukPostcodeEntry: (fieldName = "postcode") => {
    return {
      type: "object",
      properties: {
        [`${fieldName}`]: {
          type: "string",
          title: "Postcode",
          uiComponent: "postcode",
        },
      },
    };
  },

  ukManualEntry: () => {
    return {
      type: "object",
      properties: {
        [`line1`]: {
          type: "string",
          title: "Address Line 1",
        },
        [`line2`]: {
          type: "string",
          title: "Address Line 2",
        },
        [`town`]: {
          type: "string",
          title: "City / Town",
        },
        [`postcode`]: {
          type: "string",
          title: "Postcode",
        },
      },
    };
  },
};
