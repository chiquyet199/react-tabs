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

export const ConfirmationAlertMulti = ({
  isOpen,
  onRequestClose,
  globaltheme,
  options = [],
}) =>
  isOpen && (
    <Modal transparent onRequestClose={onRequestClose}>
      <ConfirmationAlertContainer onClick={onRequestClose}>
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
                    o.onClick();
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
