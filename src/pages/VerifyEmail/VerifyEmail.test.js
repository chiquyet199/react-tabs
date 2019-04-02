import React from "react";
import {shallow} from "enzyme";
import {SubTitle} from "../../components/common/layout";
import Button from "../../components/Button";
import {Platform} from "react-native";
import {VerifyEmail} from "./VerifyEmail";

import {extend} from "underscore";

describe("VerifyEmail", () => {
  it(`matches snapshot on ${Platform.OS}`, () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it("it displays the user's email", () => {
    const component = getComponent();
    expect(component.find(SubTitle).props().children).toEqual("max@gmail.com");
  });

  it("calls to checkPreVerificationLogin", () => {
    const checkPreVerificationLogin = jest.fn();
    getComponent({checkPreVerificationLogin});
    expect(checkPreVerificationLogin).toHaveBeenCalled();
  });

  it("calls requestVerifyEmail() on button click", () => {
    const requestVerifyEmail = jest.fn();
    const component = getComponent({requestVerifyEmail});
    component
      .find(Button)
      .first()
      .simulate("click");
    expect(requestVerifyEmail).toHaveBeenCalledWith({
      userId: "12345",
      email: "max@gmail.com",
    });
  });

  it("goes to welcome page when 'Home' buttons is clicked", () => {
    const go = jest.fn();
    const component = getComponent({go});
    component
      .find(Button)
      .find({type: "primary"})
      .simulate("click");
    expect(go).toHaveBeenCalledWith("/welcome");
  });

  const getMockProps = () => ({
    hideTopbarCenterText: () => {},
    showTopbarCenterText: () => {},
    requestVerifyEmail: () => {},
    checkPreVerificationLogin: () => {},
    go: () => {},
    userId: "12345",
    email: "max@gmail.com",
    theme: {},
    globaltheme: "light",
    isNative: false,
    translations: {
      header: "Verify email",
      verify__email__title__text: "Verify your email address",
      verify__email__text:
        "We need to know you are you before creating a " +
        "RentPassport. Please click the link in the email we sent you.",
      resend__verification__email: "Resend verification email",
      not__received__an__email: "Not received an email?",
    },
  });
  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<VerifyEmail {...parsedProps} />);
  };
});
