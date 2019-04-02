import React, {Fragment} from "react";
import {createElement} from "react-native-web";
import styled from "styled-components/native";
import styledWeb from "styled-components";
import {themed} from "../../utils/common";

export const Option = ({label, value, style}) =>
  createElement("option", {
    children: label,
    value,
    style,
  });

const Picker = ({
  currentValue,
  onChange,
  options,
  textColor,
  borderColor,
  borderRadius = "none",
}) => (
  <Select
    value={currentValue}
    onChange={event => onChange(event.target.value)}
    textColor={textColor}
    borderColor={borderColor}
    borderRadius={borderRadius}
  >
    {options.map(option => (
      <StyledOption key={`${option.label}_${option.value}`} {...option} />
    ))}
  </Select>
);

export const WebPicker = props => {
  const iconImage =
    props.globaltheme === "light"
      ? require("../../assets/down_arrow/dropdown_arrow_dark.png")
      : require("../../assets/down_arrow/dropdown_arrow.png");

  return (
    <Fragment>
      <PickerWrapper>
        <Picker {...props} />
        <IconImage source={iconImage} />
        {props.errorText && <ErrorBorder />}
      </PickerWrapper>
      <ErrorText theme={props.theme}>{props.errorText}</ErrorText>
    </Fragment>
  );
};

const Select = styledWeb.select`
  color: ${({textColor}) => textColor};
  :focus {
    color: ${({theme}) => theme.colors.canopySteel}
  };
  border-color: ${({borderColor}) => borderColor};
  border-radius: ${({borderRadius}) => borderRadius};
`;

export const IconImage = styled.Image`
  position: absolute;
  width: 32px;
  height: 32px;
  top: 8px;
  right: 0;
`;

export const StyledOption = styled(Option)`
  color: ${({theme}) => theme.colors.canopySteel};
`;

export const PickerWrapper = styled.View`
  position: relative;
  width: 100%;
  padding: 4px 0 10px;
`;
export const ErrorBorder = styled.View`
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 10px;
  left: 0;
  background-color: ${({theme}) => theme.colors.alertRed};
`;

export const ErrorText = styled.Text`
  color: ${({theme}) => theme.colors.alertRed};
  width: 100%;
  font-size: 8px;
  position: absolute;
  bottom: 3px;
  left: 0;
`;

export default themed(WebPicker);
