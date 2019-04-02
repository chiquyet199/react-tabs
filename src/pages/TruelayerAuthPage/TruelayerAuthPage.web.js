import React, {Component} from "react";
import {
  PageContainer,
  PageTitle,
  ButtonBar,
} from "../../components/common/layout";
import styled, {withTheme} from "styled-components/native";
import Button from "../../components/Button";

export const StyledButtonBar = styled(ButtonBar)`
  margin-top: 40px;
`;

export class TruelayerAuth extends Component {
  saveUserToken = async () => {
    // FIXME add functionalitty later depending on implementation
  };

  handleIncomeMessage = () => {
    // FIXME add functionalitty later depending on implementation
  };

  render() {
    const {translations, openAuthWindow, globaltheme, theme} = this.props;

    return (
      <PageContainer>
        <PageTitle globaltheme={globaltheme} theme={theme}>
          {translations.truelayer_auth_title}
        </PageTitle>
        <StyledButtonBar>
          <Button
            type="primary"
            middle={translations.authorize}
            onClick={openAuthWindow}
          />
        </StyledButtonBar>
      </PageContainer>
    );
  }
}

export default withTheme(TruelayerAuth);
