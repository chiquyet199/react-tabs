import styledNative from "styled-components/native";
import {themed} from "../../utils/common";
import Icon from "../Icon";

export const ThemedText = themed(styledNative.Text`
  color: ${({globaltheme, theme}) => theme[globaltheme].textColor};
`);
export const HorizontalStack = styledNative.View`
  flex-direction: row;
`;
export const SectionTitle = styledNative(ThemedText)`
  font-size: 24;
`;
export const SectionText = styledNative(ThemedText)`
  font-size: 18;
`;
export const SectionTextSmall = styledNative(ThemedText)`
  font-size: 16;
`;
export const Section = themed(styledNative.View`
  padding: 11px 0 13px;
  margin: 0 17px 0 18px;
  border-bottom-color: ${({globaltheme, theme}) =>
    theme[globaltheme].boxBorder};
  border-bottom-width: 1;
`);
export const ThemedIcon = themed(styledNative(Icon)`
  color: ${({globaltheme, theme}) => theme[globaltheme].textColor};
`);
