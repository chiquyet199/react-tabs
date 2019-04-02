import React from "react";
import {Button} from "../Button";
import {themed, isNative} from "../../utils/common";
import {Modal} from "react-native";
import {
  ConfirmationAlertContainer,
  ConfirmationAlertContent,
} from "./ConfirmationAlert";
import {bool, func, string} from "prop-types";

export const ConfirmationAlert = ({
  isOpen,
  onRequestClose,
  globaltheme,
  confirm,
  cancel,
  handleConfirm,
}) =>
  isOpen && (
    <Modal transparent onRequestClose={onRequestClose}>
      <ConfirmationAlertContainer onPress={onRequestClose}>
        <ConfirmationAlertContent>
          <Button
            globaltheme={globaltheme}
            type="confirmation_danger"
            middle={confirm}
            onClick={() => {
              handleConfirm();
              if (isNative) {
                onRequestClose();
              }
            }}
          />
          <Button
            globaltheme={globaltheme}
            type="confirmation_cancel"
            middle={cancel}
            onClick={onRequestClose}
          />
        </ConfirmationAlertContent>
      </ConfirmationAlertContainer>
    </Modal>
  );

ConfirmationAlert.propTypes = {
  isOpen: bool.isRequired,
  onRequestClose: func.isRequired,
  globaltheme: string,
  confirm: string,
  cancel: string,
  handleConfirm: func,
};

export default themed(ConfirmationAlert);
