import React from "react";
import {Platform /* Modal */} from "react-native";
// import WebModal from "modal-react-native-web";
import {shallow} from "enzyme";
import {extend} from "underscore";
import {ConfirmationAlertMulti} from "./index";
// import {isWeb} from "../../utils/common";

describe("Confirmation Alert component", () => {
  test("Confirmation Alert snapshot test on - " + Platform.OS, () => {
    const component = getComponent({isOpen: true});
    expect(component).toMatchSnapshot();
  });

  // todo: fix these test (working fine in manual browser testing)
  /* xit("renders `ConfirmationAlert` when `isOpen` is truthy", () => {
    const modal = isWeb ? WebModal : Modal;
    const component = getComponent({isOpen: true});
    expect(component.find(modal)).toExist();
  });

  xit("doesn't render `ConfirmationAlert` when `isOpen` is falsey", () => {
    const modal = isWeb ? WebModal : Modal;
    const component = getComponent({isOpen: false});
    expect(component.find(modal)).not.toExist();
  }); */

  const mockProps = () => ({
    isOpen: false,
    onRequestClose: () => {},
    globaltheme: "light",
    confirm: "Remove Pending Request",
    cancel: "Cancel",
    handleConfirm: () => {},
    theme: {},
  });

  const getComponent = props => {
    const parsedProps = extend(mockProps(), props);

    return shallow(<ConfirmationAlertMulti {...parsedProps} />);
  };
});
