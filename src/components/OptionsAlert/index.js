import React from "react";
import {themed} from "../../utils/common";
import {Modal} from "react-native";
import {
  OptionsAlertContainer,
  OptionsAlertContent,
  StyledButton,
} from "./OptionsAlert";
import {bool, func, string, arrayOf, shape, oneOf} from "prop-types";

export const OptionsAlert = ({isOpen, onRequestClose, data}) => {
  const renderButtons = values => {
    return values.map(value => (
      <StyledButton
        key={value.title}
        type={value.type}
        middle={value.title}
        onClick={value.path}
      />
    ));
  };

  return (
    isOpen && (
      <Modal transparent onRequestClose={onRequestClose}>
        <OptionsAlertContainer onPress={onRequestClose}>
          <OptionsAlertContent>{renderButtons(data)}</OptionsAlertContent>
        </OptionsAlertContainer>
      </Modal>
    )
  );
};

OptionsAlert.propTypes = {
  isOpen: bool.isRequired,
  onRequestClose: func.isRequired,
  globaltheme: oneOf(["dark", "light"]).isRequired,
  data: arrayOf(
    shape({
      title: string.isRequired,
      path: func.isRequired,
      type: string.isRequired,
    }).isRequired,
  ),
};

export default themed(OptionsAlert);
