import React from "react";
import {Switch as SwitchNative} from "react-native";
import {func} from "prop-types";
import {themed} from "../../utils/common";

export const Switch = ({
  disabled = false,
  on = false,
  onChange,
  onChangeCallback,
  theme,
  globaltheme,
  name,
  style,
}) => (
  <SwitchNative
    className={`styled-switch ${on && "active"}`}
    style={style}
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
  />
);

Switch.propTypes = {
  onChange: func.isRequired,
};

export default themed(Switch);
