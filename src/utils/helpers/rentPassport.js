import React, {Component, Fragment} from "react";
import styled from "styled-components/native";
import {extend, flatten} from "underscore";
import {colors} from "../../constants/theme";
import {RENT_PASSPORT_STATUSES} from "../../constants/statuses";
import Icon from "../../components/Icon";

export const TextWrapper = styled.View`
  flex-grow: 3;
  padding-left: 15px;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

export const StyledText = styled.Text`
  color: ${({color}) => color || colors.canopySteel};
  flex-basis: 100%;
  font-weight: normal;
  margin-bottom: 0;
`;

export const StyledLink = styled.Text`
  color: ${({color}) => color || colors.canopyGreen};
  flex-basis: 100%;
  font-weight: bold;
  margin-bottom: 0;
`;

export const generateNotificationType = (type, iconName, color) => {
  return {
    type,
    iconName,
    textColor: color,
    iconColor: color,
  };
};

export const generateNotificationProps = spec => {
  return extend(
    {
      textColor: null,
      linkColor: null,
      action: () => {},
      iconNameOverride: null,
      keys: [],
    },
    spec,
  );
};

export const calculateAffordability = rentPassport => {
  let affordabilityFromAnnualIncome = 0;
  let affordabilityFromDisposableIncomeAndRent = 0;
  if (rentPassport && rentPassport.financial) {
    const {financial} = rentPassport;
    if (financial.grossAnnualIncome) {
      const {grossAnnualIncome} = financial;

      affordabilityFromAnnualIncome = Math.round(
        (grossAnnualIncome * 0.4) / 12,
      );
    }

    if (financial.disposableIncome && financial.monthlyRentPayment) {
      const {disposableIncome, monthlyRentPayment} = financial;

      affordabilityFromDisposableIncomeAndRent = Math.round(
        disposableIncome + monthlyRentPayment,
      );
    }
  }

  return Math.max(
    affordabilityFromAnnualIncome,
    affordabilityFromDisposableIncomeAndRent,
  );
};

export default class RentPassportHelpers extends Component {
  static getStatusFromMultipleStatuses(component) {
    const flat = comp =>
      [].concat(...Object.values(comp).map(el => el.map(obj => obj.status)));
    const statuses = flatten(flat(component.check || component));
    const validStatuses = ["RED", "YELLOW", "GREEN"];
    for (let i = 0; i < validStatuses.length; i += 1) {
      if (statuses.includes(validStatuses[i])) {
        return validStatuses[i];
      }
    }

    return RENT_PASSPORT_STATUSES.none;
  }

  static getMultipleStatuses(component) {
    const flat = comp =>
      [].concat(
        ...Object.values(comp).map(el =>
          el.map(obj => [{status: obj.status, errors: obj.messages}]),
        ),
      );

    return flatten(flat(component.check || component.component || component));
  }

  static NotificationTypes = {
    GREEN: generateNotificationType(
      "rent_passport_info",
      "tick-circle",
      colors.canopyGreen,
    ),
    YELLOW: generateNotificationType(
      "rent_passport_warning",
      "warning",
      colors.orange,
    ),
    RED: generateNotificationType(
      "rent_passport_error",
      "close-circle",
      colors.alertRed,
    ),
  };
  static NotificationProps = actions => [
    generateNotificationProps({
      textColor: colors.orange,
      linkColor: colors.orange,
      keys: [
        "pendingReference",
        "pendingEmployerReference",
        "pendingSourcesOfIncome",
        "previousInsolvencies_warning",
        "previousCCJs_warning",
      ],
    }),
    generateNotificationProps({
      textColor: colors.orange,
      linkColor: colors.canopyGreen,
      action: () => {
        actions.goTo("/help");
      },
      keys: [
        "unverified",
        "dateOfBirth_unverified",
        "nationality_unverified",
        "name_unverified",
        "location_currentAddress_pendingManualVerification",
      ],
    }),
    generateNotificationProps({
      textColor: colors.alertRed,
      linkColor: colors.canopyGreen,
      action: () => actions.goTo("/help"),
      keys: [
        "watchList_politicallyExposedPerson_failed",
        "identity_mortality_failed",
        "watchList_legalAndRegulatoryWarnings_failed",
        "watchList_sanction_failed",
      ],
    }),
    generateNotificationProps({
      textColor: colors.orange,
      linkColor: colors.canopyGreen,
      action: () => actions.goTo("/request-reference"),
      keys: ["requestReference"],
    }),
    generateNotificationProps({
      textColor: colors.orange,
      linkColor: colors.canopyGreen,
      action: () => actions.goTo("/upload-documents/verify-income"),
      keys: [
        "finance_grossAnnualIncome_pendingManualVerification",
        "sourcesOfIncome_unverified",
        "grossAnnualIncome_unverified",
      ],
    }),
    generateNotificationProps({
      textColor: colors.orange,
      linkColor: colors.canopyGreen,
      action: () => actions.goTo("/renting-with-guarantor"),
      iconNameOverride: "close-circle",
      keys: ["paidWork_unverified"],
    }),
    generateNotificationProps({
      textColor: colors.alertRed,
      linkColor: colors.canopyGreen,
      action: () => actions.goTo("/renting-with-guarantor"),
      iconNameOverride: "close-circle",
      keys: [
        "credit_insolvency_status_failed",
        "credit_countyCourtJudgments_failed",
        "credit_insolvency_failed",
        "credit_numberOfBankruptcies_failed",
        "creditScore_failed",
      ],
    }),
    generateNotificationProps({
      textColor: colors.orange,
      linkColor: colors.canopyGreen,
      iconNameOverride: "warning",
      keys: [
        "Tenant_has_less_eligible_",
        "Tenant_is_smoker_",
        "Tenant_has_pets_",
      ],
    }),
  ];

  static defaultNotificationProp = generateNotificationProps(
    colors.canopySteel,
    colors.canopySteel,
  );

  static getNotificationType(status) {
    const validTypes = Object.keys(this.NotificationTypes);

    if (validTypes.includes(status)) {
      return this.NotificationTypes[status];
    }

    return generateNotificationType(
      "rent_passport_error",
      "help",
      colors.canopySteel,
    );
  }

  static getNotificationProps(messageKey, actions) {
    const propsList = this.NotificationProps(actions);

    return (
      propsList.find(prop => prop.keys.includes(messageKey)) ||
      this.defaultNotificationProp
    );
  }

  static renderContent(status, message, errorsText, actions) {
    if (errorsText) {
      const messageKey = message.replace(/[.!\s]/gi, "_");
      const {
        iconNameOverride,
        textColor,
        linkColor,
        action,
      } = this.getNotificationProps(messageKey, actions);

      const {iconName, iconColor} = this.getNotificationType(status);
      const texts =
        errorsText && errorsText[messageKey]
          ? errorsText[messageKey]
          : messageKey;

      return (
        <Fragment>
          <Icon
            name={iconNameOverride || iconName}
            color={textColor || iconColor}
            size={26}
          />
          <TextWrapper>
            <StyledText color={textColor || iconColor}>{texts.text}</StyledText>
            {texts.action && (
              <StyledLink color={linkColor} onPress={action}>
                {texts.action}
              </StyledLink>
            )}
          </TextWrapper>
        </Fragment>
      );
    }

    return null;
  }
}
