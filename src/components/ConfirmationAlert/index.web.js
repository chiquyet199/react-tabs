import React from "react";
import {Button} from "../Button";
import {themed} from "../../utils/common";
import Modal from "modal-react-native-web";
import {
  ConfirmationAlertContainer,
  ConfirmationAlertContent,
} from "./ConfirmationAlert";
import {bool, func, string} from "prop-types";

Modal.setAppElement(document.getElementById("root"));

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
      <ConfirmationAlertContainer onClick={onRequestClose}>
        <ConfirmationAlertContent>
          <Button
            globaltheme={globaltheme}
            type="confirmation_danger"
            middle={confirm}
            onClick={handleConfirm}
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
