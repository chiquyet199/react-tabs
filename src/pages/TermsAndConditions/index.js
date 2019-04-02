import React, {Component} from "react";
import {connect} from "react-redux";
import {
  PageTitle,
  TextParagraph,
  PageContainer,
} from "../../components/common/layout";
import Button from "../../components/Button";
import {MyButtonBar, PageScrollView} from "./TermsAndConditions";
import {registerUser} from "../../actions/form";
import {registerUserFacebook} from "../../actions/auth";
import {go} from "../../actions/navigation";
import {updateProgress} from "../../actions/progress";
import {withTheme} from "styled-components";

class TermsAndConditions extends Component {
  componentWillMount() {
    const {goTo, form, facebook} = this.props;
    const {DynamicForm} = form;

    if (!DynamicForm && !facebook) {
      goTo("/signup/name");
    }

    this.props.updateProgress(85);
  }

  handleSubmit = () => {
    const {form, facebook} = this.props;
    const {DynamicForm} = form;

    if (DynamicForm) {
      this.props.registerUser({
        values: DynamicForm.values,
        nextLoc: "/verify-email",
      });
    }

    if (facebook) {
      this.props.registerUserFacebook({
        value: facebook,
        nextLoc: "/verify-email",
      });
    }
  };

  render() {
    const {translations, goTo, theme, globaltheme} = this.props;

    return (
      <PageContainer>
        <PageTitle theme={theme} globaltheme={globaltheme}>
          {translations.terms_header}
        </PageTitle>
        <PageScrollView>
          <TextParagraph theme={theme} globaltheme={globaltheme}>
            {translations.terms}
          </TextParagraph>
        </PageScrollView>
        <MyButtonBar>
          <Button type="secondary" middle="Decline" onClick={() => goTo("/")} />
          <Button
            type="primary"
            middle="Accept"
            onClick={() => this.handleSubmit()}
          />
        </MyButtonBar>
      </PageContainer>
    );
  }
}

export const mapStateToProps = state => ({
  translations: {
    terms: state.locale.translations.terms,
    terms_header: state.locale.translations.terms_header,
  },
  form: state.form,
  facebook: state.auth.facebookAccessToken,
  globaltheme: state.globaltheme,
});

const mapDispatchToProps = {
  registerUser,
  registerUserFacebook,
  goTo: go,
  updateProgress,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(TermsAndConditions));
