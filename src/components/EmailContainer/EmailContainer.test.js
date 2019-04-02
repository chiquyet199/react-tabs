import React from "react";
import {shallow} from "enzyme";
import {EmailContainer} from "./";
import {extend} from "underscore";
import {
  EmailsContainer,
  StyledIcon,
  NameText,
  EmailText,
  PendingText,
} from "./EmailContainer.js";
describe("Email Container", () => {
  it("snapshot test", () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it("onClick calls onClick prop given to passport", () => {
    const onClick = jest.fn();
    const email = "somewhere@something.com";

    const component = getComponent({email, onClick});

    component.find(EmailsContainer).prop("onClick")();
    expect(onClick).toHaveBeenCalledWith(email);
  });

  it("depending on isPending pass rentpassport-thick styled icon", () => {
    const component = getComponent({isPending: true});

    expect(component.find(StyledIcon)).toHaveProp("name", "email");
  });

  it("depending on isPending expect NameText, emailtext not to exist", () => {
    const onClick = jest.fn();
    const component = getComponent({onClick, isPending: true});
    expect(component.find(PendingText)).toExist();
    expect(component.find(NameText)).not.toExist();
    expect(component.find(EmailText)).not.toExist();
  });

  const getMockProps = () => ({
    theme: {light: {textColor: "red"}},
    onClick: () => {},
    name: "test",
    email: "test@email.com",
    pendingText: "pending",
    globaltheme: "light",
    isPending: false,
  });

  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<EmailContainer {...parsedProps} />);
  };
});
