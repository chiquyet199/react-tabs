import React from "react";
import {Picker} from "react-native";
import styledNative from "styled-components/native";
import {themed} from "../../utils/common";

const ThemedPicker = themed(styledNative.Picker`
  ${({globaltheme, theme}) => `
    color: ${theme[globaltheme].textColor};
  `}
`);

export const NativePicker = ({style, currentValue, onChange, options}) => (
  <ThemedPicker
    style={style}
    selectedValue={currentValue}
    onValueChange={onChange}
  >
    {options.map(option => (
      <Picker.Item
        key={`${option.label}_${option.value}`}
        label={option.label}
        value={option.value}
      />
    ))}
  </ThemedPicker>
);

export default NativePicker;
