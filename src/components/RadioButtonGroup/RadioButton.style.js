import styled from "styled-components/native/index";
import {View} from "react-native";

export const RadioButtonWrapper = styled(View)`
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  width: 49%;
  margin-bottom: ${props => (props.layout === "column" ? "7px" : 0)};
`;

export const Radio = styled(View)`
  height: ${props => props.size};
  width: ${props => props.size};
  border-radius: ${props => props.size / 2};
  border-width: ${props => props.thickness};
  border-color: ${props =>
    props.selected && props.activeсolor ? props.activeсolor : props.color};
  align-items: center;
  justify-content: center;
`;

export const StyledItem = styled(View)`
  margin-left: 5;
  align-items: center;
  justify-content: center;
`;

export const StyledContainer = styled(View)`
  flex-grow: 1;
  flex-direction: row;
  padding: 10px;
  ${props => props.styled};
  ${props => (props.selected ? {backgroundColor: props.highlightcolor} : null)};
  width: 100%;
  border-color: ${({theme}) => theme.colors.canopyGreen};
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  ${props => props.subtitle && "position: relative;"};
  margin-bottom: ${props => (props.subtitle ? "40px" : 0)};
`;

export const SelectedRadio = styled(View)`
  height: ${props => props.size / 2};
  width: ${props => props.size / 2};
  border-radius: ${props => props.size / 4};
  background-color: ${props => (props.color ? props.color : props.activeсolor)};
`;
