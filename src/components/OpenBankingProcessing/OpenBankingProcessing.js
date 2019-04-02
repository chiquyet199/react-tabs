import React from "react";
import {
  PageContainer,
  HeadlineText,
  TextParagraph,
  TextLink,
  FlexColumn,
} from "../common/layout";
import Button from "../Button";
import bank from "../../assets/bank/bank.png";
import {BankPicture, HeadlineTextError} from "./OpenBanking.style";
import {withTheme} from "styled-components";

export const RentPassportPopulating = ({
  translations,
  openBankingNotUpdating,
  globaltheme,
  theme,
}) => (
  <FlexColumn>
    <HeadlineText>{translations.populating_rent_passport}</HeadlineText>
    <TextParagraph theme={theme} globaltheme={globaltheme}>
      {translations.rent_passport_benefits_description}
    </TextParagraph>
    <TextLink onClick={openBankingNotUpdating}>
      {translations.open_banking_not_updating}
    </TextLink>
  </FlexColumn>
);
export const RentPassportPopulated = ({
  translations,
  continueToRentPassport,
  globaltheme,
  theme,
}) => (
  <FlexColumn>
    <HeadlineText>{translations.rent_passport_populated}</HeadlineText>
    <TextParagraph theme={theme} globaltheme={globaltheme}>
      {translations.rent_passport_populated_description}
    </TextParagraph>
    <Button
      middle={translations.continue_to_rent_passport}
      right="arrow-right"
      onClick={continueToRentPassport}
    />
  </FlexColumn>
);
export const RentPassportFailed = ({
  translations,
  startRentPassport,
  rentPassportNotNow,
  globaltheme,
  theme,
}) => (
  <FlexColumn>
    <HeadlineTextError theme={theme} globaltheme={globaltheme}>
      {translations.open_banking_failed}
    </HeadlineTextError>
    <TextParagraph theme={theme} globaltheme={globaltheme}>
      {translations.open_banking_failed_description}
    </TextParagraph>
    <Button
      middle={translations.start_my_rent_passport}
      right="arrow-right"
      onClick={startRentPassport}
    />
    <Button middle={translations.not_now} onClick={rentPassportNotNow} />
  </FlexColumn>
);

const switchContent = ({
  translations,
  status,
  continueToRentPassport,
  startRentPassport,
  rentPassportNotNow,
  openBankingNotUpdating,
  globaltheme = "light",
  theme,
}) => {
  switch (status) {
    case "populating":
      return (
        <RentPassportPopulating
          translations={translations}
          openBankingNotUpdating={openBankingNotUpdating}
          globaltheme={globaltheme}
          theme={theme}
        />
      );
    case "success":
      return (
        <RentPassportPopulated
          translations={translations}
          continueToRentPassport={continueToRentPassport}
          globaltheme={globaltheme}
          theme={theme}
        />
      );
    case "fail":
      return (
        <RentPassportFailed
          translations={translations}
          startRentPassport={startRentPassport}
          rentPassportNotNow={rentPassportNotNow}
          globaltheme={globaltheme}
          theme={theme}
        />
      );
    default:
      return null;
  }
};

export const OpenBankingProcessing = ({...props}) => {
  return (
    <PageContainer full>
      <BankPicture source={bank} />
      {switchContent(props)}
    </PageContainer>
  );
};

export default withTheme(OpenBankingProcessing);
