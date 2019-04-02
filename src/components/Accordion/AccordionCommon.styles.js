import React from "react";
import Icon from "../Icon";
import {themed} from "../../utils/common";
import styledNative from "styled-components/native";
import {bool} from "prop-types";

export const ThemedText = themed(styledNative.Text`
  color: ${({globaltheme, theme}) => theme[globaltheme].textColor};
`);
export const TitleRow = styledNative.View`
  flex-direction: row;
  align-items: center;
`;
export const ThemedIcon = themed(props => (
  <Icon {...props} color={props.theme[props.globaltheme].textColor} />
));
export const AccordionOpenIndicator = ({collapsed}) => (
  <ThemedIcon name={collapsed ? "chevron-down" : "chevron-up"} size={32} />
);
AccordionOpenIndicator.propTypes = {
  collapsed: bool,
};
