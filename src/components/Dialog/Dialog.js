import React, {Component} from "react";
import onClickOutside from "react-onclickoutside";
import {
  DialogContainer,
  DialogButtonBar,
  DialogParagraph,
  DialogTitle,
} from "./Dialog.styles";
import Button from "../Button";

export class Dialog extends Component {
  handleClickOutside = () => {
    this.props.onClose();
  };

  render() {
    const {
      title,
      paragraph,
      confirmButtonType,
      cancelButtonText,
      onDialogCancel,
      onDialogConfirm,
      confirmButtonText,
      globaltheme,
      theme,
      fullWidthText,
      children,
    } = this.props;

    return (
      <DialogContainer theme={theme}>
        {title && (
          <DialogTitle globaltheme={globaltheme} theme={theme}>
            {title}
          </DialogTitle>
        )}
        {children}
        {paragraph && (
          <DialogParagraph
            globaltheme={globaltheme}
            theme={theme}
            fullWidthText={fullWidthText}
          >
            {paragraph}
          </DialogParagraph>
        )}
        <DialogButtonBar>
          <Button
            type="secondary"
            middle={cancelButtonText}
            onClick={onDialogCancel}
          />
          <Button
            type={confirmButtonType || "primary"}
            middle={confirmButtonText}
            onClick={onDialogConfirm}
          />
        </DialogButtonBar>
      </DialogContainer>
    );
  }
}

export default onClickOutside(Dialog);
