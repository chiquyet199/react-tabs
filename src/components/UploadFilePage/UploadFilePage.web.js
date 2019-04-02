import React, {Component} from "react";
import _ from "underscore";
import {SubmissionError} from "redux-form";
import {withTheme} from "styled-components";
import {func, shape, string, number, object, oneOfType} from "prop-types";
import FileUpload from "../../components/FileUpload";
import Button from "../../components/Button";
import {
  PageContainer,
  PageTitle,
  TextParagraph,
  ButtonBar,
} from "../../components/common/layout";
import {validate} from "../../utils/validators/common";
import {redirectToBaseRoute} from "../../utils/common";

export class UploadFilePage extends Component {
  handleFormSubmit = async values => {
    const {schema, next} = this.props;
    const {next: nextLoc, properties} = schema;
    const errors = await validate(properties, values);
    if (!_.isEmpty(errors)) {
      throw new SubmissionError(errors);
    } else {
      next({values, nextLoc});
    }
  };

  componentWillMount = () => {
    const {go, location, form} = this.props;
    redirectToBaseRoute(go, form, location);
  };

  componentDidMount = () => {
    const {showTopbarCenterText, updateProgress, schema} = this.props;
    showTopbarCenterText(schema.pageTitle);
    updateProgress(schema.progress);
  };

  componentWillUnmount = () => {
    this.props.clearProgress();
  };

  render() {
    const {translations, submit, schema, theme, globaltheme} = this.props;
    const themeProps = {theme, globaltheme};

    return (
      <PageContainer layout={schema.layout}>
        <PageTitle {...themeProps} left="true">
          {schema.title}
        </PageTitle>
        <TextParagraph {...themeProps} left="true">
          {schema.description}
        </TextParagraph>
        <ButtonBar wrap="true">
          <FileUpload
            theme={theme}
            globaltheme={globaltheme}
            fieldName={schema.fieldName}
            btnText={schema.buttonText || translations.selectFile}
            btnType="secondary"
            onSubmit={this.handleFormSubmit}
          />
          <Button
            middle={schema.buttonConfirmText || translations.confirmFile}
            right="arrow-right"
            onClick={submit}
          />
        </ButtonBar>
      </PageContainer>
    );
  }
}

UploadFilePage.propTypes = {
  updateProgress: func.isRequired,
  clearProgress: func.isRequired,
  go: func.isRequired,
  next: func.isRequired,
  showTopbarCenterText: func.isRequired,
  submit: func.isRequired,
  schema: shape({
    layout: string,
    pageTitle: string,
    progress: number,
    next: string,
    title: string,
    description: oneOfType([object, string]),
    fieldName: string.isRequired,
    properties: object,
  }),
  translations: shape({
    selectFile: string,
    confirmFile: string,
  }),
  globaltheme: string,
  theme: object,
  location: object,
};

export default withTheme(UploadFilePage);
