import {themed} from "../../utils/common";
import styledNative from "styled-components/native";
import {ThemedText} from "./AccordionCommon.styles";

export const Title = styledNative(ThemedText)`
  flex-grow: 2;
  font-weight: bold;
  font-size: 18;
`;
export const TitleRow = styledNative.View`
  flex-direction: row;
  align-items: center;
`;
export const CountWrapper = themed(styledNative.Text`
  background-color: ${({globaltheme, theme}) => theme[globaltheme].boxBorder};
  border-radius: 12;
  height: 26;
  overflow: hidden;
  text-align: center;
  width: 26;
`);
export const Count = styledNative(ThemedText)`
  line-height: 26;
  text-align: center;
`;
