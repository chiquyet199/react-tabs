import React from "react";
import {Button} from "../Button";
import {themed, isNative} from "../../utils/common";
import {Modal} from "react-native";
import {
  ConfirmationAlertContainer,
  ConfirmationAlertContent,
} from "./ConfirmationAlert";
import {bool, func, string} from "prop-types";

export const ConfirmationAlertMulti = ({
  isOpen,
  onRequestClose,
  globaltheme,
  options,
}) =>
  isOpen && (
    <Modal transparent onRequestClose={onRequestClose}>
      <ConfirmationAlertContainer onPress={onRequestClose}>
        <ConfirmationAlertContent>
          {options &&
            options.map(o => (
              <Button
                key={o.key}
                globaltheme={globaltheme}
                type={o.button_type}
                middle={o.text}
                onClick={() => {
                  if (o.onClick) {
                    if (!o.onClick() && isNative) {
                      onRequestClose();
                    }
                  }
                }}
              />
            ))}
        </ConfirmationAlertContent>
      </ConfirmationAlertContainer>
    </Modal>
  );

ConfirmationAlertMulti.propTypes = {
  isOpen: bool.isRequired,
  onRequestClose: func.isRequired,
  globaltheme: string,
  confirm: string,
  cancel: string,
  handleConfirm: func,
};

export default themed(ConfirmationAlertMulti);
