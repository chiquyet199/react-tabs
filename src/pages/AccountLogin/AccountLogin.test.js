import React from "react";
import {AccountLogin} from "./AccountLogin";
import {shallow} from "enzyme";
import SigninSchema from "../../schemas/SigninSchema";
import {extend} from "underscore";
import FormPage from "../../components/FormPage";

describe("Login Page", () => {
  it("renders to correct snapshot", () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it("calls restart form ", async () => {
    const restartForm = jest.fn();
    await getComponent({restartForm});
    await expect(restartForm).toHaveBeenCalled();
  });

  it("goes to next page if user already logged in", () => {
    const goTo = jest.fn();
    const next = "/any/old/where";
    getComponent({goTo, isLoggedIn: true, schema: {next}});
    expect(goTo).toHaveBeenCalledWith(next);
  });

  it("shows and updates Topbar action button on mount ", async () => {
    const showTopbarButton = jest.fn();
    const updateTopbarButton = jest.fn();
    const redirectAction = () => getMockProps().goTo("/forgotPassword");
    await getComponent({showTopbarButton, updateTopbarButton});
    await expect(showTopbarButton).toHaveBeenCalled();
    await expect(JSON.stringify(updateTopbarButton.mock.calls[0])).toEqual(
      JSON.stringify([
        true,
        getMockProps().forgotPasswordText,
        redirectAction,
        "transparent_green",
        null,
      ]),
    );
  });

  it("hides and updates Topbar action button on unmount ", async () => {
    const hideTopbarButton = jest.fn();
    const updateTopbarButton = jest.fn();
    const tree = getComponent({hideTopbarButton, updateTopbarButton});
    tree.unmount();
    expect(hideTopbarButton).toHaveBeenCalled();
    expect(updateTopbarButton).toHaveBeenCalledWith(
      false,
      "",
      undefined,
      undefined,
      null,
    );
  });

  it("passes credentials to login action creator", () => {
    const creds = {username: "zaphod", password: "password1"};
    const login = jest.fn();
    const onSubmit = getComponent({login})
      .find(FormPage)
      .prop("onSubmit");
    onSubmit(creds);
    expect(login).toHaveBeenCalledWith(creds);
  });

  it("throws a submission error if login action doesn't return success", async () => {
    const resp = {success: false, message: "lorem ipsum dolor"};
    const loginPromise = Promise.resolve(resp);
    const login = () => loginPromise;
    const showBadCredentialsNotification = jest.fn();
    const _AccountLogin = getComponent({login, showBadCredentialsNotification});
    const onSubmit = _AccountLogin.find(FormPage).prop("onSubmit");
    await onSubmit({});

    expect(showBadCredentialsNotification).toHaveBeenCalledWith(resp.message);
  });

  it("throws a submission error with default message if login action doesn't return success", async () => {
    const resp = {success: false};
    const loginPromise = Promise.resolve(resp);
    const login = () => loginPromise;
    const showBadCredentialsNotification = jest.fn();
    const _AccountLogin = getComponent({login, showBadCredentialsNotification});
    const onSubmit = _AccountLogin.find(FormPage).prop("onSubmit");
    await onSubmit({});

    expect(showBadCredentialsNotification).toHaveBeenCalledWith(
      getMockProps().schema.defaultErrorMessage,
    );
  });

  it("calls loggedIn action if login is successful", async () => {
    const resp = {success: true, token: "abcd1234", user: {}};
    const loginPromise = Promise.resolve(resp);
    const loggedIn = jest.fn();
    const onSubmit = getComponent({
      login: () => loginPromise,
      loggedIn,
    })
      .find(FormPage)
      .prop("onSubmit");
    await onSubmit({});
    expect(loggedIn).toHaveBeenCalledWith(resp);
  });

  it("calls goTo with schema next if login is successful", async () => {
    const resp = {success: true, token: "abcd1234", user: {}};
    const loginPromise = Promise.resolve(resp);
    const goTo = jest.fn();
    const next = "/any/old/where";
    const onSubmit = getComponent({
      login: () => loginPromise,
      goTo,
      schema: {next},
    })
      .find(FormPage)
      .prop("onSubmit");
    await onSubmit({});
    expect(goTo).toHaveBeenCalledWith(next);
  });

  it("calls goTo with landing path if login is successful", async () => {
    const resp = {success: true, token: "abcd1234", user: {}};
    const loginPromise = Promise.resolve(resp);
    const goTo = jest.fn();
    const next = "/any/old/where";
    const landingPath = "/landing/path";
    const onSubmit = getComponent({
      login: () => loginPromise,
      goTo,
      schema: {next},
      landingPath,
    })
      .find(FormPage)
      .prop("onSubmit");
    await onSubmit({});
    expect(goTo).toHaveBeenCalledWith(landingPath);
  });

  it("calls goTo with schema next if already logged in", async () => {
    const goTo = jest.fn();
    const next = "/any/old/where";
    getComponent({
      goTo,
      isLoggedIn: true,
      schema: {next},
    });
    expect(goTo).toHaveBeenCalledWith(next);
  });

  it("calls goTo with landing path if already logged in", async () => {
    const goTo = jest.fn();
    const next = "/any/old/where";
    const landingPath = "/landing/path";
    getComponent({
      goTo,
      isLoggedIn: true,
      schema: {next},
      landingPath,
    });
    expect(goTo).toHaveBeenCalledWith(landingPath);
  });

  it("does not call goTo if not logged in", async () => {
    const goTo = jest.fn();
    getComponent({
      goTo,
      isLoggedIn: false,
    });
    expect(goTo).not.toHaveBeenCalled();
  });

  it("calls goTo with schema next if prop isLoggedIn changes to true", async () => {
    const goTo = jest.fn();
    const next = "/any/old/where";
    const component = getComponent({
      goTo,
      isLoggedIn: false,
      schema: {next},
    });
    component.setProps({isLoggedIn: true});
    expect(goTo).toHaveBeenCalledWith(next);
  });

  it("calls goTo with landing path if prop isLoggedIn changes to true", async () => {
    const goTo = jest.fn();
    const next = "/any/old/where";
    const landingPath = "/landing/path";
    const component = getComponent({
      goTo,
      isLoggedIn: false,
      schema: {next},
      landingPath,
    });
    component.setProps({isLoggedIn: true});
    expect(goTo).toHaveBeenCalledWith(landingPath);
  });
});

const getMockProps = () => ({
  forgotPasswordText: "Forgot Password?",
  isLoggedIn: false,
  schema: SigninSchema({
    next: "/path",
    defaultErrorMessage: "A problem has occurred",
  }),
  globalTheme: "light",
  theme: {},
  checkLoggedIn: () => {},
  loggedIn: () => {},
  login: () => {},
  goTo: () => {},
  destroy: () => {},
  updateTopbarButton: () => {},
  hideTopbarButton: () => {},
  showTopbarButton: () => {},
  restartForm: () => {},
  log: [],
});

const getComponent = props => {
  const parsedProps = extend(getMockProps(), props);

  return shallow(<AccountLogin {...parsedProps} />);
};
