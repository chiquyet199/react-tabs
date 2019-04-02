import {Text, View} from "react-native";
import styled from "styled-components/native/index";
import {RadioGroup} from "./index";

export const TextWrapper = styled(Text)`
  color: ${({theme}) => theme.colors.canopyGreen};
  font-size: 16px;
`;

export const TextTitle = styled(Text)`
  display: flex;
  width: 100%;
  color: ${({theme}) => theme.colors.canopyGreen};
  font-size: 16px;
  margin-top: 11px;
  ${props => props.layout === "row" && "margin-bottom: 11px"};
  ${props => props.layout === "column" && "margin-bottom: 21px"};
`;

export const RadioGroupWrapper = styled(RadioGroup)`
  display: flex;
  flex-direction: ${props => props.layout || "column"};
  justify-content: space-between;
  width: 100%;
`;

export const RadioButtonGroupWrapper = styled(View)`
  display: flex;
  width: 100%;
  margin-bottom: 61px;
  padding-horizontal: 15px;
  flex-direction: ${props => props.layout || "column"};
`;

export const SubTitle = styled(Text)`
  position: absolute;
  top: 42px;
  left: -39px;
  width: 350px;
  color: ${({theme}) => theme.colors.canopyGreen};
`;

export const TextError = styled(Text)`
  color: ${({theme}) => theme.colors.alertRed};
`;
