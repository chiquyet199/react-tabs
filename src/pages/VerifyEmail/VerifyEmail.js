import React, {Component} from "react";
import {AsyncStorage} from "react-native";
import {themed} from "../../utils/common";
import Button from "../../components/Button";
import verifyEmailImage from "../../resources/images/verify-email.png";
import {
  CenteredContainer,
  PageTitle,
  TextParagraph,
  SubTitle,
} from "../../components/common/layout";
import {CenterIconImage} from "../../components/common/images";
import {shape, func, string} from "prop-types";

export class VerifyEmail extends Component {
  async componentDidMount() {
    await AsyncStorage.getItem("preActivationData");
    const {
      showTopbarCenterText,
      translations: {header},
    } = this.props;
    showTopbarCenterText(header);
  }

  componentWillMount() {
    const {email, usersId, checkPreVerificationLogin} = this.props;
    if (!email || !usersId) {
      checkPreVerificationLogin();
    }
  }

  componentWillUnmount() {
    const {hideTopbarCenterText} = this.props;
    hideTopbarCenterText();
  }

  render() {
    const {translations, requestVerifyEmail, email, go, userId} = this.props;

    return (
      <CenteredContainer>
        <CenterIconImage source={verifyEmailImage} />
        <PageTitle>{translations.verify__email__title__text}</PageTitle>
        <SubTitle>{email}</SubTitle>
        <TextParagraph>{translations.verify__email__text}</TextParagraph>
        <TextParagraph>{translations.not__received__an__email}</TextParagraph>
        <Button
          type="secondary"
          middle={translations.resend__verification__email}
          onClick={() => requestVerifyEmail({userId, email})}
        />
        <Button type="primary" middle="Home" onClick={() => go("/welcome")} />
      </CenteredContainer>
    );
  }
}

VerifyEmail.propTypes = {
  translations: shape({
    resend__verification__email: string.isRequired,
    verify__email__text: string.isRequired,
    verify__email__title__text: string.isRequired,
    not__received__an__email: string.isRequired,
    header: string.isRequired,
  }).isRequired,
  go: func.isRequired,
  email: string.isRequired,
  userId: string.isRequired,
  requestVerifyEmail: func.isRequired,
  showTopbarCenterText: func.isRequired,
  hideTopbarCenterText: func.isRequired,
  checkPreVerificationLogin: func.isRequired,
};

export default themed(VerifyEmail);
