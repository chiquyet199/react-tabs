export const addressSchema = {
  type: "object",
  title: "Address",
  properties: {
    flatNumber: {
      type: "string",
      title: "Flat / Apartment Number",
      description: "The number for a flat, only used for flats / apartments.",
      autoFocus: true,
    },
    buildingName: {
      type: "string",
      title: "Building Name",
    },
    buildingNumber: {
      type: "string",
      title: "Building Number",
      description: "The building / house number in the street.",
    },
    street: {
      type: "string",
      title: "Street",
    },
    subStreet: {
      type: "string",
      title: "Sub Street",
    },
    postCode: {
      type: "string",
      title: "Post Code",
    },
    countryCode: {
      type: "string",
      pattern: "^[A-Z]{2}$",
      title: "Password",
      uiComponent: "password",
    },
  },
  required: ["flatNumber", "buildingName", "street", "postCode", "countryCode"],
};
