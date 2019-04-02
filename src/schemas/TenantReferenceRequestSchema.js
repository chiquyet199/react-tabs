import {isRequired} from "../utils/validators/common";
import {isDecimal} from "../utils/validators/number";
import {numberMonth, generalQuestion} from "../constants/options";

export const tenantReferenceRequestSchema = ({firstName}) => ({
  payments: {
    progress: 20,
    next: "personal",
    type: "object",
    title: "payments",
    showTopbarButton: false,
    properties: {
      notice: {
        type: "string",
        title: "Did the tenant give proper notice?",
        uiComponent: "radio",
        layout: "row",
        validations: [isRequired],
        options: generalQuestion,
      },
      chargePerMonth: {
        type: "number",
        heading: "How much rent was the tenant charged per month?",
        prefix: "£",
        validations: [isRequired, isDecimal],
      },
      owed: {
        type: "string",
        title: "Back rent owed?",
        uiComponent: "radio",
        layout: "row",
        validations: [isRequired],
        options: generalQuestion,
      },
      howMuch: {
        type: "string",
        heading: "How much?",
        prefix: "£",
        validations: [isRequired, isDecimal],
      },
      textDivider: {
        type: "string",
        title:
          "How many times in the last 12 months of tenancy has the following occurred?",
        uiComponent: "text",
        align: "left",
      },
      latePayment: {
        type: "select",
        heading: "Late payment",
        options: numberMonth,
        uiComponent: "select",
      },
      demandsForRent: {
        type: "select",
        heading: "Demand for rent notice",
        options: numberMonth,
        uiComponent: "select",
      },
      evictionNotice: {
        type: "select",
        heading: "Eviction notice",
        options: numberMonth,
        uiComponent: "select",
      },
    },
  },
  personal: {
    progress: 40,
    next: "housekeeping",
    type: "object",
    title: "personal",
    showTopbarButton: false,
    properties: {
      unauthorisedPeople: {
        type: "string",
        title:
          "[Did/does] the tenant have unauthorised people living in the unit?",
        uiComponent: "radio",
        layout: "row",
        validations: [isRequired],
        options: generalQuestion,
      },
      unauthorisedPeopleDescribe: {
        type: "string",
        heading: "Describe",
        multiline: true,
        validations: [],
      },
      neighbourComplaints: {
        type: "string",
        title: "Have there been any neighbour complaints about the tenant?",
        uiComponent: "radio",
        layout: "row",
        validations: [isRequired],
        options: generalQuestion,
      },
      neighbourComplaintsDescribe: {
        type: "string",
        heading: "Describe",
        multiline: true,
        validations: [],
      },
      depositReturned: {
        type: "string",
        title: "Was the security deposit returned to the tenant?",
        uiComponent: "radio",
        layout: "row",
        validations: [isRequired],
        options: generalQuestion,
      },
      depositReturnedDescribe: {
        type: "string",
        heading: "Describe",
        multiline: true,
        validations: [],
      },
      pets: {
        type: "string",
        title: "[Did/does] the tenant live with animals?",
        uiComponent: "radio",
        layout: "row",
        validations: [isRequired],
        options: generalQuestion,
      },
      petsDescribe: {
        type: "string",
        heading: "Describe",
        multiline: true,
        validations: [],
      },
      rentAgain: {
        type: "string",
        title: `Would you rent to ${firstName} again?`,
        uiComponent: "radio",
        layout: "row",
        validations: [isRequired],
        options: generalQuestion,
      },
      rentAgainDescribe: {
        type: "string",
        heading: "Describe",
        multiline: true,
        validations: [],
      },
    },
  },
  housekeeping: {
    progress: 60,
    next: "relations",
    type: "object",
    title: "housekeeping",
    showTopbarButton: true,
    properties: {
      housekeeping: {
        type: "string",
        title: "How [is/was] the tenant's housekeeping:",
        validations: [isRequired],
        uiComponent: "radio",
        options: [
          {
            subTitle: "Clean and tidy",
            label: "Excellent",
            value: "excellent",
          },
          {
            subTitle: "Clean, not always tidy",
            label: "Good",
            value: "good",
          },
          {
            subTitle: "Needs reminders for clean, give up on tidy",
            label: "Fair",
            value: "fair",
          },
          {
            subTitle: "Unclean and untidy",
            label: "Poor",
            value: "poor",
          },
        ],
      },
    },
  },
  relations: {
    progress: 80,
    next: "additional",
    type: "object",
    title: "relations",
    showTopbarButton: true,
    properties: {
      relations: {
        type: "string",
        title: "How [is/was] the tenant's neighbour/landlord relations:",
        uiComponent: "radio",
        validations: [isRequired],
        options: [
          {
            subTitle:
              "Co-operative, honest, tactful, good communication skills with everyone",
            label: "Excellent",
            value: "excellent",
          },
          {
            subTitle:
              "Talks to neighbours/landlord for resolutions, tries to work things out fair in conflicts",
            label: "Good",
            value: "good",
          },
          {
            subTitle:
              "Tried to talk to neighbours, but gives up, avoids issues",
            label: "Fair",
            value: "fair",
          },
          {
            subTitle:
              "Doesn’t try to talk; complains instead; spiteful; creates or maintains feuds",
            label: "Poor",
            value: "poor",
          },
        ],
      },
    },
  },
  additional: {
    progress: 100,
    next: "complete",
    type: "object",
    title: "additional",
    showTopbarButton: false,
    properties: {
      additionalInfo: {
        type: "string",
        heading: "Do you have any additional information you'd like to add?",
        multiline: true,
        validations: [],
      },
      confirm: {
        type: "boolean",
        title:
          "I confirm that the information I am submitting is accurate to the best of my knowledge",
        uiComponent: "switch",
        validations: [isRequired],
      },
    },
  },
});
