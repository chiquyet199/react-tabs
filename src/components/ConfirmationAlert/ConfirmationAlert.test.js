import React from "react";
import {ConfirmationAlert} from "./index";
import {Platform, Modal} from "react-native";
import WebModal from "modal-react-native-web";
import {shallow} from "enzyme";
import {extend} from "underscore";
import {Button} from "../Button";
import {isWeb, isNative} from "../../utils/common";

describe("Confirmation Alert component", () => {
  test("Confirmation Alert snapshot test on - " + Platform.OS, () => {
    const component = getComponent({isOpen: true});
    expect(component).toMatchSnapshot();
  });

  it("renders `ConfirmationAlert` when `isOpen` is truthy", () => {
    const modal = isWeb ? WebModal : Modal;
    const component = getComponent({isOpen: true});
    expect(component.find(modal)).toExist();
  });

  it("doesn't render `ConfirmationAlert` when `isOpen` is falsey", () => {
    const modal = isWeb ? WebModal : Modal;
    const component = getComponent({isOpen: false});
    expect(component.find(modal)).not.toExist();
  });

  it("calls handleConfirm on positive dismissal", () => {
    const handleConfirm = jest.fn();
    const component = getComponent({
      isOpen: true,
      handleConfirm,
    });

    component
      .find(Button)
      .findWhere(b => b.prop("type") === "confirmation_danger")
      .simulate("click");
    expect(handleConfirm).toHaveBeenCalled();
  });

  it("calls onRequestClose on negative dismissal", () => {
    const onRequestClose = jest.fn();
    const component = getComponent({
      isOpen: true,
      onRequestClose,
    });

    component
      .find(Button)
      .findWhere(b => b.prop("type") === "confirmation_cancel")
      .simulate("click");
    expect(onRequestClose).toHaveBeenCalled();
  });

  if (isNative) {
    it("closes confirmation alert on positive dismissal", () => {
      const onRequestClose = jest.fn();
      const component = getComponent({
        isOpen: true,
        onRequestClose,
      });

      component
        .find(Button)
        .findWhere(b => b.prop("type") === "confirmation_danger")
        .simulate("click");
      expect(onRequestClose).toHaveBeenCalled();
    });
  }

  const mockProps = () => ({
    isOpen: false,
    onRequestClose: () => {},
    globaltheme: "light",
    confirm: "Remove Pending Request",
    cancel: "Cancel",
    handleConfirm: () => {},
    theme: {},
  });

  const getComponent = (props, children) => {
    const parsedProps = extend(mockProps(), props);

    return shallow(
      <ConfirmationAlert {...parsedProps}>{children}</ConfirmationAlert>,
    );
  };
});
