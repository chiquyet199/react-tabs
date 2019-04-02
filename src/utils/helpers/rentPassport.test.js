import RentPassportHelpers, {
  StyledLink,
  StyledText,
  TextWrapper,
  calculateAffordability,
} from "./rentPassport";
import React, {Fragment} from "react";
import {shallow} from "enzyme";
import translations from "../locales/en-US";
import Icon from "../../components/Icon";

const compTranslations = translations.rent_passport_complete;
const colors = {
  lightSteel: "#e3eaf2",
  canopySteel: "#6b7c93",
  canopyGreen: "#5ab88e",
  alertRed: "#f16651",
  warning: "#fffcf3",
  orange: "#f1bf51",
  white: "#ffffff",
  successGreen: "#5dc471",
  rentPassportErrorBg: "#fff5f5",
  rentPassportWarningBg: "#fffcf3",
};

const mockProps = {
  errorsText: compTranslations.errors,
  status: "RED",
  messages: ["credit.countyCourtJudgments.failed"],
  goTo: () => {},
  showModal: () => {},
};

describe("Rent Passport helpers", () => {
  it("extracts status from array property", () => {
    const component = {
      check: {
        residenceInfo: [
          {
            residenceType: "RENTING_FROM_AGENT",
            livedSinceMonth: 1,
            livedSinceYear: 2017,
            livedToMonth: null,
            livedToYear: null,
            reference: {
              contactFirstName: "Dave",
              contactLastName: "Dozy",
              contactEmailAddress: "dozy.dave@mailinator.com",
            },
            status: "YELLOW",
            messages: [
              "location.currentAddress.pendingManualVerification",
              "pendingReference",
            ],
          },
          {
            line1: "3 Horrifying Way",
            town: "HULL",
            postCode: "BA99 9BA",
            countryCode: "GB",
            residenceType: "RENTING_FROM_AGENT",
            livedSinceMonth: 1,
            livedSinceYear: 2017,
            livedToMonth: 1,
            livedToYear: 2009,
            reference: {
              contactFirstName: "G",
              contactLastName: "G",
              contactEmailAddress: "dozy.dave@mailinator.com",
            },
            status: "YELLOW",
            messages: ["pendingReference"],
          },
        ],
      },
    };

    expect(RentPassportHelpers.getMultipleStatuses(component)).toEqual([
      {
        status: "YELLOW",
        errors: [
          "location.currentAddress.pendingManualVerification",
          "pendingReference",
        ],
      },
      {
        status: "YELLOW",
        errors: ["pendingReference"],
      },
    ]);
  });

  it("Extract most important status from multiply statuses with getStatusFromMultipleStatuses function", () => {
    const component = {
      workInfo: [
        {
          status: "RED",
        },
        {
          status: "YELLOW",
        },
        {
          status: "GREEN",
        },
      ],
    };
    expect(
      RentPassportHelpers.getStatusFromMultipleStatuses(component),
    ).toEqual("RED");
    const component2 = {
      workInfo: [
        {
          status: "YELLOW",
        },
        {
          status: "GREEN",
        },
      ],
    };
    expect(
      RentPassportHelpers.getStatusFromMultipleStatuses(component2),
    ).toEqual("YELLOW");
  });

  it("Extract multiple statuses from array of objects with getMultipleStatuses function", () => {
    const component = {
      workInfo: [
        {
          status: "RED",
          messages: ["error1", "error2"],
        },
        {
          status: "YELLOW",
          messages: ["warning"],
        },
      ],
    };
    const multipleMessages = RentPassportHelpers.getMultipleStatuses(component);

    expect(multipleMessages).toEqual([
      {status: "RED", errors: ["error1", "error2"]},
      {status: "YELLOW", errors: ["warning"]},
    ]);
  });

  it("check return result  called function getNotificationType", () => {
    const warningPropsExpected = {
      type: "rent_passport_warning",
      iconName: "warning",
      textColor: colors.orange,
      iconColor: colors.orange,
    };
    const defaultPropsExpected = {
      type: "rent_passport_error",
      iconName: "help",
      textColor: colors.canopySteel,
      iconColor: colors.canopySteel,
    };

    expect(RentPassportHelpers.getNotificationType("YELLOW")).toEqual(
      warningPropsExpected,
    );
    expect(RentPassportHelpers.getNotificationType("")).toEqual(
      defaultPropsExpected,
    );
  });

  it("check return result  called function renderContent", () => {
    const actions = {goTo: mockProps.goTo, showModal: mockProps.showModal};
    const content = RentPassportHelpers.renderContent(
      mockProps.status,
      mockProps.messages[0],
      mockProps.errorsText,
      actions,
    );
    const action = () => actions.goTo("/renting-with-guarantor");

    const styledContent = (
      <Fragment>
        <Icon name="close-circle" color={colors.alertRed} size={26} />
        <TextWrapper>
          <StyledText color={colors.alertRed}>
            {mockProps.errorsText.credit_countyCourtJudgments_failed.text}
          </StyledText>
          <StyledLink color={colors.canopyGreen} onPress={action}>
            {mockProps.errorsText.credit_countyCourtJudgments_failed.action}
          </StyledLink>
        </TextWrapper>
      </Fragment>
    );

    expect(JSON.stringify(content)).toEqual(JSON.stringify(styledContent));
  });

  it("should have correct colour and action", () => {
    const testCases = [
      {
        message: "unverified",
        textColor: colors.orange,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/help",
        },
      },
      {
        message: "dateOfBirth.unverified",
        textColor: colors.orange,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/help",
        },
      },
      {
        message: "nationality.unverified",
        textColor: colors.orange,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/help",
        },
      },
      {
        message: "name.unverified",
        textColor: colors.orange,
        linkColor: colors.canopyGreen,

        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/help",
        },
      },
      {
        message: "pendingReference",
        textColor: colors.orange,
        linkColor: colors.orange,
        action: null,
      },
      {
        message: "requestReference",
        textColor: colors.orange,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/request-reference",
        },
      },
      {
        message: "sourcesOfIncome.unverified",
        textColor: colors.orange,
        linkColor: colors.orange,
        actions: null,
      },
      {
        message: "grossAnnualIncome.unverified",
        textColor: colors.orange,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/verify-income",
        },
      },
      {
        message: "watchList.politicallyExposedPerson.failed",
        textColor: colors.alertRed,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/help",
        },
      },
      {
        message: "identity.mortality.failed",
        textColor: colors.alertRed,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/help",
        },
      },
      {
        message: "watchList.legalAndRegulatoryWarnings.failed",
        textColor: colors.alertRed,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/help",
        },
      },
      {
        message: "watchList.sanction.failed",
        textColor: colors.alertRed,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/help",
        },
      },
      {
        message: "credit.countyCourtJudgments.failed",
        textColor: colors.orange,
        linkColor: colors.canopyGreen,
        iconNameOverride: "close-circle",
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/renting-with-guarantor",
        },
      },
      {
        message: "credit.insolvency.failed",
        textColor: colors.alertRed,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/renting-with-guarantor",
        },
      },
      {
        message: "credit.numberOfBankruptcies.failed",
        textColor: colors.alertRed,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/renting-with-guarantor",
        },
      },
      {
        message: "creditScore.failed",
        textColor: colors.alertRed,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/renting-with-guarantor",
        },
      },
      {
        message: "paidWork.unverified",
        textColor: colors.orange,
        linkColor: colors.canopyGreen,
        actions: {
          actionCall: "goTo",
          goTo: jest.fn(),
          argument: "/renting-with-guarantor",
        },
      },
      {
        message: "pendingSourcesOfIncome",
        textColor: colors.orange,
        linkColor: colors.orange,
        actions: null,
      },
      {
        message: "previousInsolvencies.warning",
        textColor: colors.orange,
        linkColor: colors.orange,
        actions: null,
      },
      {
        message: "previousCCJs.warning",
        textColor: colors.orange,
        linkColor: colors.orange,
        actions: null,
      },
      {
        message: "pendingEmployerReference",
        textColor: colors.orange,
        linkColor: colors.orange,
        actions: null,
      },
      {
        message: "Tenant has less eligible!",
        textColor: colors.orange,
        iconNameOverride: "warning",
        actions: null,
      },
      {
        message: "Tenant is smoker!",
        textColor: colors.orange,
        iconNameOverride: "warning",
        actions: null,
      },
      {
        message: "Tenant has pets!",
        textColor: colors.orange,
        iconNameOverride: "warning",
        actions: null,
      },
    ];

    const {iconName, iconColor} = RentPassportHelpers.getNotificationType(
      mockProps.status,
    );

    testCases.forEach(async testCase => {
      const actions = {goTo: mockProps.goTo, showModal: mockProps.showModal};
      const content = RentPassportHelpers.renderContent(
        mockProps.status,
        testCase.message,
        mockProps.errorsText,
        actions,
      );
      const messageKey = testCase.message.split(".").join("_");
      const texts = mockProps.errorsText[messageKey]
        ? mockProps.errorsText[messageKey]
        : messageKey;
      const view = shallow(content);
      const linkEl = view.find(StyledLink);
      const textEl = view.find(StyledText);
      const iconEl = view.find(Icon);
      expect(iconEl.prop("color")).toBe(testCase.textColor || iconColor);
      expect(iconEl.prop("name")).toBe(testCase.iconNameOverride || iconName);
      expect(textEl.prop("children")).toBe(texts.text);
      expect(textEl.prop("color")).toBe(testCase.textColor || iconColor);
      expect(linkEl.prop("children")).toBe(texts.action);
      expect(linkEl.prop("color")).toBe(testCase.linkColor);
      if (texts.action) {
        expect(linkEl.prop("children")).toBe(texts.action);
      }
      linkEl.simulate("press");
      if (testCase.actions === null) {
        expect(testCase.actions).toEqual(testCase.actions);
      } else {
        expect(
          testCase.actions[testCase.actions.actionCall],
        ).toHaveBeenCalledWith(testCase.actions.argument);
      }
    });
  });

  it("handles objects with no status", () => {
    expect(
      RentPassportHelpers.getStatusFromMultipleStatuses({test: [{}, {}]}),
    ).toBe("NONE");
  });

  describe("Calculate Affordability", () => {
    it("returns 0 for invalid object", () => {
      const testCases = [null, {}, {financial: {}}];
      for (let x = 0; x < testCases.length; x += 1) {
        expect(calculateAffordability(testCases[x])).toBe(0);
      }
    });

    it("calculates affordable rent to be 40% of monthly income", () => {
      const testCases = [
        {
          rentPassport: {
            financial: {grossAnnualIncome: 10000},
          },
          affordability: 333,
        },
        {
          rentPassport: {
            financial: {grossAnnualIncome: 30000},
          },
          affordability: 1000,
        },
        {
          rentPassport: {
            financial: {grossAnnualIncome: 45432},
          },
          affordability: 1514,
        },
        {
          rentPassport: {
            financial: {grossAnnualIncome: 45435},
          },
          affordability: 1515,
        },
      ];
      for (let x = 0; x < testCases.length; x += 1) {
        const {rentPassport, affordability} = testCases[x];
        expect(calculateAffordability(rentPassport)).toBe(affordability);
      }
    });
  });

  it("calculates affordable rent from disposable income and monthly rent if provided and more than gross income", () => {
    const testCases = [
      {
        rentPassport: {
          financial: {
            grossAnnualIncome: 20000,
            disposableIncome: 1000,
            monthlyRentPayment: 800,
          },
        },
        affordability: 1800,
      },
      {
        rentPassport: {
          financial: {
            grossAnnualIncome: 30000,
            disposableIncome: 200,
            monthlyRentPayment: 500,
          },
        },
        affordability: 1000,
      },
    ];
    for (let x = 0; x < testCases.length; x += 1) {
      const {rentPassport, affordability} = testCases[x];
      expect(calculateAffordability(rentPassport)).toBe(affordability);
    }
  });
});
