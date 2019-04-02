import generateCountrySubSchema from "./subschemas/country";

const country = generateCountrySubSchema("Country");
/* const country = {
  options: [
    {value: "GB", label: "United Kingdom"},
    {value: "AF", label: "Afghanistan"},
  ],
  type: "string",
  title: "country",
  uiComponent: "select",
}; */

const residenceType = {
  options: [
    {label: "Renting from agent", value: "rentFromAgent"},
    {label: "Renting from private landlord", value: "rentFromLandlord"},
    {label: "I own this property", value: "ownProp"},
    {label: "Living with parents", value: "liveWithRents"},
  ],
  type: "string",
  title: "Residence Type",
  uiComponent: "select",
};

export default {
  ukPostcodeEntry: {
    type: "object",
    properties: {
      country,
      postcode: {
        type: "string",
        title: "Postcode",
        uiComponent: "postcode",
      },
    },
  },

  ukManualEntry: {
    type: "object",
    properties: {
      country,
      addressLine1: {
        type: "string",
        title: "Address Line 1",
        autoFocus: true,
      },
      addressLine2: {
        type: "string",
        title: "Address Line 2",
      },
      settlement: {
        type: "string",
        title: "City / Town",
      },
      postcode: {
        type: "string",
        title: "Postcode",
      },
    },
  },

  internationalEntry: {
    type: "object",
    properties: {
      country,
      addressLine1: {
        type: "string",
        title: "Address Line 1",
      },
      addressLine2: {
        type: "string",
        title: "Address Line 2",
      },
      settlement: {
        type: "string",
        title: "State / Province",
      },
      postcode: {
        type: "string",
        title: "Postcode",
      },
    },
  },

  livingSituationCurrent: {
    type: "object",
    properties: {
      residenceType,
      livedHereSince: {
        type: "string",
        title: "Lived here since",
        uiComponent: "datePicker",
      },
    },
  },

  livingSituationPast: {
    type: "object",
    properties: {
      residenceType,
      livedHereSince: {
        type: "string",
        title: "Lived here since",
        uiComponent: "datePicker",
      },
      livedHereTo: {
        type: "string",
        title: "Lived here to",
        uiComponent: "datePicker",
      },
    },
  },
};
