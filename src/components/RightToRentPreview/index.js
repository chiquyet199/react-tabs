import React, {Component} from "react";
import {themed} from "../../utils/common";
import {connect} from "react-redux";
import {
  Container,
  StyledText,
  ScanningMetadata,
} from "./RightToRentPreview.styles";
import {arrayOf, func, oneOf, shape, string} from "prop-types";
import moment from "moment";
import {fetchUserById} from "../../actions/users";

export class RightToRentPreview extends Component {
  componentDidMount() {
    const {
      getUser,
      passport: {
        data: {seenBy},
      },
    } = this.props;
    getUser(seenBy);
  }

  getScanningMetadata() {
    const {
      passport: {
        data: {seenAt},
        translations: {seenBy},
      },
      scannedByName,
    } = this.props;

    return `${seenBy}${scannedByName}, ${moment(seenAt).format("DD.MM.YYYY")}`;
  }

  render() {
    const {passport, theme, globaltheme, scannedByName} = this.props;
    const hasRightToRent = passport.data.documents.length > 0;
    const {
      translations,
      data: {documentStatus: status},
    } = passport;

    const textProps = {
      italic: status === "PENDING",
      alert: status === "FAIL",
      theme: theme[globaltheme],
    };

    return (
      <Container>
        <StyledText {...textProps}>
          {hasRightToRent
            ? `${translations.rightToRent}${translations[status.toLowerCase()]}`
            : translations.uploadRight}
        </StyledText>
        {scannedByName && (
          <ScanningMetadata theme={theme[globaltheme]}>
            {this.getScanningMetadata()}
          </ScanningMetadata>
        )}
      </Container>
    );
  }
}

RightToRentPreview.propTypes = {
  passport: shape({
    data: shape({
      id: string,
      provider: oneOf(["TRUST_ID"]).isRequired,
      tenantId: string,
      documentStatus: oneOf(["PENDING", "SUBMITTED", "PASS", "FAIL"])
        .isRequired,
      seenBy: string.isRequired,
      seenAt: string.isRequired,
      status: oneOf(["GREEN", "YELLOW", "RED", "NONE"]).isRequired,
      documents: arrayOf(
        shape({
          id: string,
          type: oneOf(["PASSPORT", "BIOMETRIC_RESIDENCE_PERMIT"]),
          images: arrayOf(string).isRequired, // document refs
          expires: string,
        }),
      ).isRequired,
    }).isRequired,
    scannedByName: string,
    translations: shape({
      rightToRent: string.isRequired,
      uploadRight: string.isRequired,
      pending: string.isRequired,
      submitted: string.isRequired,
      pass: string.isRequired,
      fail: string.isRequired,
      seenBy: string.isRequired,
    }).isRequired,
  }).isRequired,
  theme: shape({
    textColor: string,
    errorColor: string,
  }).isRequired,
  getUser: func.isRequired,
  scannedByName: string,
  globaltheme: oneOf(["dark", "light"]),
};

const mapStateToProps = ({state: profile}) => ({
  scannedByName: profile && `${profile.firstName} ${profile.lastName}`,
});

const mapDispatchToProps = {
  getUser: fetchUserById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(themed(RightToRentPreview));
