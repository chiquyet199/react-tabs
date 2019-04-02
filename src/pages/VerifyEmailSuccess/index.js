import React from "react";
import {withTheme} from "styled-components";
import Button from "../../components/Button/index";
import verifiedEmailImage from "../../assets/verified-email.png";
import {
  PageContainer,
  PageTitle,
  ButtonBar,
  TextParagraph,
  SubTitle,
} from "../../components/common/layout";
import {CenterIconImage} from "../../components/common/images";
import {oneOf, string, shape, func} from "prop-types";

export const VerifyEmailSuccess = ({
  user,
  go,
  translations,
  globaltheme,
  theme,
  layout,
  redirectTo,
}) => (
  <PageContainer layout={layout}>
    <CenterIconImage source={verifiedEmailImage} />
    <PageTitle globaltheme={globaltheme} theme={theme}>
      {translations.email_successfully__verified}
    </PageTitle>
    <SubTitle globaltheme={globaltheme} theme={theme}>
      {user.email}
    </SubTitle>
    <TextParagraph globaltheme={globaltheme} theme={theme}>
      {translations.thanks__for__verifying}
    </TextParagraph>
    <ButtonBar>
      <Button
        type="primary"
        middle={translations.go__to}
        onClick={() => go(redirectTo)}
        right="arrow-right"
      />
    </ButtonBar>
  </PageContainer>
);

VerifyEmailSuccess.propTypes = {
  translations: shape({
    email_successfully__verified: string.isRequired,
    thanks__for__verifying: string.isRequired,
    go__to: string.isRequired,
  }),
  globaltheme: oneOf(["light", "dark"]),
  user: shape({
    email: string.isRequired,
  }),
  go: func.isRequired,
  redirectTo: string.isRequired,
};

export default withTheme(VerifyEmailSuccess);
