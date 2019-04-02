import React from "react";
import {OptionsAlert} from "./index";
import {Modal} from "react-native";
import {shallow} from "enzyme";
import {extend} from "underscore";
import {StyledButton} from "./OptionsAlert";

describe("Options Alert component", () => {
  test("Options Alert snapshot test", () => {
    const component = getComponent({isOpen: true});
    expect(component).toMatchSnapshot();
  });

  it("renders `OptionsAlert` when `isOpen` is true", () => {
    const component = getComponent({isOpen: true});
    expect(component.find(Modal)).toExist();
  });

  it("doesn't render `OptionsAlert` when `isOpen` is false", () => {
    const component = getComponent({isOpen: false});
    expect(component.find(Modal)).not.toExist();
  });

  it("passes correct props from data object to confirmation button", () => {
    const component = getComponent({
      isOpen: true,
    });
    const confirmationButton = component
      .find(StyledButton)
      .findWhere(button => button.prop("type") === "confirmation_primary");
    expect(confirmationButton).toHaveProp("onClick", mockPassportFunction);
    expect(confirmationButton).toHaveProp("middle", "Passport");
  });

  it("passes correct props from data object to cancel button", () => {
    const component = getComponent({
      isOpen: true,
    });
    const cancelButton = component
      .find(StyledButton)
      .findWhere(button => button.prop("type") === "confirmation_cancel");
    expect(cancelButton).toHaveProp("onClick", mockCancelFunction);
    expect(cancelButton).toHaveProp("middle", "Cancel");
  });

  const mockProps = () => ({
    isOpen: false,
    onRequestClose: () => {},
    globaltheme: "light",
    data: [
      {
        title: "Passport",
        path: mockPassportFunction,
        type: "confirmation_primary",
      },
      {
        title: "Cancel",
        path: mockCancelFunction,
        type: "confirmation_cancel",
      },
    ],
    theme: {},
  });

  const mockPassportFunction = jest.fn();

  const mockCancelFunction = jest.fn();

  const getComponent = props => {
    const parsedProps = extend(mockProps(), props);

    return shallow(<OptionsAlert {...parsedProps} />);
  };
});
