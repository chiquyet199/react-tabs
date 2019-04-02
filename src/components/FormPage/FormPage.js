import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import DynamicForm from "../DynamicForm";
import Button from "../Button";
import {
  PageTitle,
  PageContainer,
  TextParagraph,
  ErrorMessage,
  ScrollContentContainer,
  ScrollButtonBar,
  ScrollScrollView,
} from "../common/layout";
import {SubmissionError} from "redux-form";
import {isEmpty} from "underscore";
import {validate} from "../../utils/validators/common";
import {isWeb} from "../../utils/common";
import {object, bool, string, shape} from "prop-types";

export class BaseFormPage extends Component {
  state = {
    displayMultiSwitchError: false,
  };

  withValidation = parentSubmit => async values => {
    const {schema, userType = "admin", inviteUser, translations} = this.props;
    const errors = await validate(schema.properties, values);
    if (!isEmpty(errors)) {
      /*
        `branch_` indicates multiple switches
        check if user selected at least one of them
      */
      if (Object.keys(errors).some(item => item.includes("branch_"))) {
        await this.setState({
          displayMultiSwitchError: true,
        });
      }

      Object.keys(errors).forEach(error => {
        errors[error] = translations.validationErrors[errors[error]];
      });

      throw new SubmissionError(errors);
    }

    if (schema.customInviteUserValidation && userType !== "user") {
      await inviteUser(values);
    }

    return parentSubmit(values);
  };

  renderHeaderAndInfo(schema) {
    const headerAndInfo = [];

    if (schema.header) {
      headerAndInfo.push(
        <PageTitle
          left="true"
          key={`page_header_${schema.header.toLowerCase().replace(" ", "_")}`}
        >
          {schema.header}
        </PageTitle>,
      );
    }
    if (schema.info) {
      headerAndInfo.push(
        <TextParagraph
          left="true"
          key={`page_info_${schema.info.toLowerCase().replace(" ", "_")}`}
        >
          {schema.info}
        </TextParagraph>,
      );
    }

    return headerAndInfo;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hasErrors !== this.props.hasErrors && this.props.hasErrors) {
      this.props.submit();
    }
  }

  render() {
    const {displayMultiSwitchError} = this.state;
    const {
      schema,
      components,
      omitSubmit,
      submit,
      onSubmit,
      submitOnEnter,
      screenSize,
      multiSwitchErrorText,
      extraButtons,
      extraButtonBarButtons,
    } = this.props;

    if (schema) {
      const initialValues = this.props.initialValues || schema.initialValues;
      const {
        buttonStyles,
        buttonIcon = "arrow-right",
        buttonText = "Next",
        buttonType = "primary",
        layout,
        marginTop,
      } = schema;

      let multiSwitchError = null;

      if (displayMultiSwitchError) {
        multiSwitchError = <ErrorMessage>{multiSwitchErrorText}</ErrorMessage>;
      }

      return (
        <ScrollContentContainer size={screenSize}>
          <ScrollScrollView>
            <PageContainer layout={layout} margintop={marginTop}>
              {this.renderHeaderAndInfo(schema)}
            </PageContainer>
            <PageContainer id="dynamicFormWrapper">
              <DynamicForm
                initialValues={initialValues}
                schema={schema}
                components={components}
                onSubmit={this.withValidation(onSubmit)}
                submit={submit}
                submitOnEnter={submitOnEnter}
              />
            </PageContainer>
          </ScrollScrollView>
          {multiSwitchError}
          {!omitSubmit && (
            <Fragment>
              <ScrollButtonBar style={buttonStyles}>
                <Button
                  type={buttonType}
                  right={buttonIcon}
                  middle={buttonText}
                  onClick={submit}
                />
                {extraButtonBarButtons && extraButtonBarButtons}
              </ScrollButtonBar>
              <ScrollButtonBar style={buttonStyles}>
                {extraButtons && extraButtons}
              </ScrollButtonBar>
            </Fragment>
          )}
        </ScrollContentContainer>
      );
    }

    return null;
  }
}

export const FormPage = props => (
  <BaseFormPage {...props}>
    {isWeb ? (
      <form>{props.children}</form>
    ) : (
      <Fragment>{props.children}</Fragment>
    )}
  </BaseFormPage>
);

FormPage.defaultProps = {
  omitSubmit: false,
};

FormPage.propTypes = {
  hasErrors: bool,
  schema: object.isRequired,
  omitSubmit: bool,
  userType: string,
  multiSwitchErrorText: string,
  extraButtonBarButtons: object,
  extraButtons: object,
  submitOnEnter: bool,
  translations: shape({
    validationErrors: shape({
      onlyLetters: string.isRequired,
      required: string.isRequired,
      selectAtLeastOne: string.isRequired,
      invalidEmail: string.isRequired,
      emailTaken: string.isRequired,
      onlyNumbers: string.isRequired,
      invalidNumber: string.isRequired,
      invalidPassword: string.isRequired,
      passwordsDontMatch: string.isRequired,
      invalidPhoneNumber: string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  multiSwitchErrorText: state.locale.translations.common.multiSwitchError,
  translations: {
    validationErrors: state.locale.translations.common.validationErrors,
  },
});

export default connect(
  mapStateToProps,
  null,
)(FormPage);
