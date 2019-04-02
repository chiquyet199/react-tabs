import React, {Component, Fragment} from "react";
import {themed} from "../../utils/common";
import FormPage from "../../components/FormPage";
import Button from "../../components/Button";
import {bool, func, object, string} from "prop-types";

export class AccountLogin extends Component {
  async handleFormSubmit(values) {
    const {
      goTo,
      landingPath,
      login,
      loggedIn,
      schema,
      showBadCredentialsNotification,
      destroy,
    } = this.props;

    const response = await login(values);
    const {success, message} = response;
    if (!success) {
      return showBadCredentialsNotification(
        message || schema.defaultErrorMessage,
      );
    }

    loggedIn(response);
    destroy();

    return goTo(landingPath || schema.next);
  }

  componentWillMount() {
    const {restartForm, isLoggedIn, goTo, landingPath, schema} = this.props;
    restartForm();
    if (isLoggedIn) {
      goTo(landingPath || schema.next);
    }
  }

  componentDidMount() {
    const {
      checkLoggedIn,
      forgotPasswordText,
      goTo,
      updateTopbarButton,
      showTopbarButton,
    } = this.props;
    checkLoggedIn();
    const redirectAction = () => goTo("/forgotPassword");
    showTopbarButton();
    updateTopbarButton(
      true,
      forgotPasswordText,
      redirectAction,
      "transparent_green",
      null,
    );
  }

  componentWillUnmount() {
    const {hideTopbarButton, updateTopbarButton} = this.props;
    hideTopbarButton();
    updateTopbarButton(false, "", undefined, undefined, null);
  }

  componentDidUpdate() {
    const {isLoggedIn, landingPath, schema} = this.props;
    if (isLoggedIn) {
      this.props.goTo(landingPath || schema.next);
    }
  }

  render() {
    const {schema, goTo} = this.props;

    return (
      <Fragment>
        <FormPage
          schema={schema}
          extraButtons={extraButtons(goTo)}
          onSubmit={e => this.handleFormSubmit(e)}
          submitOnEnter
        />
        {this.props.children}
      </Fragment>
    );
  }
}

const extraButtons = goTo => {
  return (
    <Fragment>
      <Button
        type="secondary"
        middle="Forgot Password"
        onClick={() => goTo("/forgotPassword")}
      />
      <Button type="secondary" middle="Home" onClick={() => goTo("/welcome")} />
    </Fragment>
  );
};

AccountLogin.propTypes = {
  goTo: func.isRequired,
  forgotPasswordText: string.isRequired,
  hideTopbarButton: func.isRequired,
  isLoggedIn: bool.isRequired,
  loggedIn: func.isRequired,
  login: func.isRequired,
  restartForm: func.isRequired,
  destroy: func.isRequired,
  schema: object.isRequired,
  showTopbarButton: func.isRequired,
  updateTopbarButton: func.isRequired,
  checkLoggedIn: func.isRequired,
  landingPath: string,
};

export default themed(AccountLogin);
