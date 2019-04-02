import React from "react";
import {Switch as SwitchNative} from "react-native";
import {func} from "prop-types";
import {themed} from "../../utils/common";
import styles from "./Switch.css";

export const Switch = ({
  disabled = false,
  on = false,
  onChange,
  onChangeCallback,
  theme,
  globaltheme,
  name,
}) => (
  <SwitchNative
    className={`styled-switch ${on && "active"}`}
    activeTrackColor={theme[globaltheme].switch.accentColor}
    activeThumbColor={theme[globaltheme].switch.baseColor}
    onValueChange={v => {
      onChange(v);
      if (onChangeCallback) {
        onChangeCallback({[`${name}`]: v});
      }
    }}
    disabled={disabled}
    value={on}
    {...styles}
  />
);

Switch.propTypes = {
  onChange: func.isRequired,
};

export default themed(Switch);
