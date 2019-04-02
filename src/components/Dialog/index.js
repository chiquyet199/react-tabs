import React from "react";
import {Modal} from "react-native";
import {DialogOverlay} from "./Dialog.styles";
import Dialog from "./Dialog";
import {string, func, bool, object} from "prop-types";
import {themed} from "../../utils/common";

export const SimpleDialog = props => {
  const {isOpen, theme, onDialogCancel} = props;

  return (
    isOpen && (
      <Modal animationType="fade" transparent onRequestClose={onDialogCancel}>
        <DialogOverlay theme={theme}>
          <Dialog {...props} />
        </DialogOverlay>
      </Modal>
    )
  );
};

SimpleDialog.propTypes = {
  title: string,
  paragraph: string,
  confirmButtonType: string,
  cancelButtonText: string,
  confirmButtonText: string,
  onDialogCancel: func,
  onDialogConfirm: func,
  onClose: func,
  isOpen: bool.isRequired,
  theme: object.isRequired,
  globaltheme: string.isRequired,
  fullWidthText: bool,
};

export default themed(SimpleDialog);
