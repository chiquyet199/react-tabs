import React, {Component} from "react";
import {withTheme} from "styled-components";
import {CenterIconImage} from "../common/images";
import {
  PageContainer,
  PaddedContent,
  SubTitle,
  PageTitle,
  TextParagraph,
  ButtonBar,
} from "../common/layout";
import Button from "../Button";
import {object, string, func, shape} from "prop-types";

export class SuccessPage extends Component {
  componentWillMount = () => {
    this.props.clearProgress();
    this.props.hideTopbar();
  };

  componentWillUnmount = () => {
    this.props.showTopbar();
  };

  render() {
    const {
      subTitle,
      go,
      next,
      translations,
      globaltheme,
      theme,
      image,
      body,
      buttonType,
    } = this.props;

    const buildBodyText = (fragment1, fragment2 = "", fragment3 = "") => {
      return `${fragment1} ${fragment2} ${fragment3}`;
    };

    return (
      <PageContainer layout="hq">
        <PaddedContent>
          <CenterIconImage source={image} />
          <PageTitle globaltheme={globaltheme} theme={theme}>
            {translations.title}
          </PageTitle>
          <SubTitle globaltheme={globaltheme} theme={theme}>
            {subTitle && subTitle.text}
          </SubTitle>
          <TextParagraph globaltheme={globaltheme} theme={theme} mb={40}>
            {buildBodyText(
              translations.body,
              body && body.textFragment,
              translations.bodyFragment,
            )}
          </TextParagraph>
          <ButtonBar>
            <Button
              type={buttonType || "primary"}
              middle={translations.button}
              onClick={() => go(next)}
            />
          </ButtonBar>
        </PaddedContent>
      </PageContainer>
    );
  }
}

SuccessPage.propTypes = {
  go: func,
  clearProgress: func,
  hideTopbar: func,
  showTopbar: func,
  next: string,
  globaltheme: string,
  image: string,
  theme: object,
  subTitle: object,
  translations: shape({
    title: string,
    body: string,
    bodyFragment: string,
    button: string,
  }),
  body: shape({
    textFragment: string,
  }),
};

export default withTheme(SuccessPage);
