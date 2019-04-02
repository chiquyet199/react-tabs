import React, {Component} from "react";
import styled from "styled-components/native";
import Button from "../../components/Button";
import {withTheme} from "styled-components";
import {
  ButtonBar,
  PageContainer,
  PageTitle,
  TextParagraph,
} from "../../components/common/layout";

export const PageScrollView = styled.ScrollView`
  flex: 8;
`;

export const MyButtonBar = styled(ButtonBar)`
  flex: 1;
`;

export class CrainPage extends Component {
  handleSubmit = async () => {
    const {form, generateRentPassport} = this.props;
    const {DynamicForm} = form;

    if (DynamicForm) {
      await generateRentPassport({
        values: DynamicForm.values,
        nextLoc: "/generating-rent-passport",
      });
    }
  };

  render() {
    const {translations, goTo, globaltheme, theme} = this.props;

    return (
      <PageContainer>
        <PageTitle globaltheme={globaltheme} theme={theme} left="true">
          {translations.crain_header}
        </PageTitle>
        <PageScrollView>
          <TextParagraph globaltheme={globaltheme} theme={theme} left="true">
            {translations.crain_version}
          </TextParagraph>
          <TextParagraph
            globaltheme={globaltheme}
            theme={theme}
            bold="true"
            left="true"
          >
            {translations.crain_bold_text}
          </TextParagraph>
          <TextParagraph globaltheme={globaltheme} theme={theme} left="true">
            {translations.crain_text}
          </TextParagraph>
        </PageScrollView>
        <MyButtonBar>
          <Button
            type="secondary"
            middle={translations.decline}
            onClick={() => goTo("/rent-passport")}
          />
          <Button
            type="primary"
            middle={translations.accept}
            onClick={this.handleSubmit}
          />
        </MyButtonBar>
      </PageContainer>
    );
  }
}
export default withTheme(CrainPage);
