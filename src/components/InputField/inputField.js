import React, {Component} from "react";
import {
  ComponentContainer,
  InputContainer,
  ShowPasswordTouchable,
  EyeIcon,
} from "./inputField.style";
import {TextField} from "react-native-material-textfield";
import {connect} from "react-redux";
import {showPassword as showPasswordAction} from "../../actions/inputField";
import {themed} from "../../utils/common";
import {bool, func, object, oneOf, oneOfType, string} from "prop-types";

export class InputField extends Component {
  input = null;

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const {
      shownPassword,
      showPassword,
      disabled,
      onChangeText,
      label,
      password,
      errorText,
      defaultValue,
      textColor,
      tintColor,
      keyboardType,
      multiline = false,
      theme,
      prefix = null,
      autoFocus,
      autoCapitalize,
      onKeyPress = () => {},
    } = this.props;

    return (
      <ComponentContainer>
        <InputContainer>
          <TextField
            label={label || ""}
            onChangeText={onChangeText}
            baseColor={textColor}
            tintColor={tintColor}
            textColor={textColor}
            secureTextEntry={password && shownPassword}
            error={errorText || ""}
            value={defaultValue}
            errorColor={theme.colors.alertRed}
            fontSize={16}
            keyboardType={keyboardType}
            multiline={multiline}
            prefix={prefix}
            disabled={disabled}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            ref={i => {
              this.input = autoFocus ? i : null;
            }}
            onKeyPress={onKeyPress}
          />
        </InputContainer>
        {password && (
          <ShowPasswordTouchable
            onPress={() => {
              showPassword();
            }}
          >
            <EyeIcon name="eye" color={theme.colors.canopySteel} size={24} />
          </ShowPasswordTouchable>
        )}
      </ComponentContainer>
    );
  }
}

export const mapStateToProps = state => ({
  shownPassword: state.inputField.showPassword,
});

export const mapDispatchToProps = {
  showPassword: showPasswordAction,
};

InputField.propTypes = {
  shownPassword: bool,
  showPassword: func,
  disabled: bool,
  onChangeText: func,
  label: string,
  password: bool,
  errorText: oneOfType([string, bool]),
  defaultValue: string,
  textColor: string,
  tintColor: string,
  keyboardType: string,
  multiline: bool,
  theme: object,
  prefix: string,
  autoFocus: bool,
  autoCapitalize: oneOf(["none", "sentences"]),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(themed(InputField));
