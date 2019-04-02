import styled from "styled-components/native";
import Icon from "../Icon";
import {themed} from "../../utils/common";

export const BtnText = styled.Text`
  position: relative;
  top: -1px;
  font-size: ${({type, theme: {buttons}}) => buttons[type].fontSize || "16px"};
  font-weight: ${({type, theme: {buttons}}) =>
    buttons[type].fontWeight || "normal"};
  color: ${({type, theme: {buttons}}) => buttons[type].text};
`;

export const ButtonPart = styled.View`
  justify-content: center;
  flex: 1;
`;

export const Left = styled(ButtonPart)`
  position: absolute;
  height: 46px;
  width: ${({size}) => `${size}px`};
  left: ${({shift}) => (shift ? "10px" : 0)};
  top: 0;
  bottom: 0;
`;

export const Right = styled(ButtonPart)`
  position: absolute;
  height: 46px;
  width: ${({size}) => `${size}px`};
  right: ${({shift}) => (shift ? "10px" : 0)};
  top: 0;
  bottom: 0;
`;

export const Middle = styled(ButtonPart)`
  align-items: center;
  flex: 1;
  padding: 0;
  padding-right: ${({righticon, lefticon, size}) =>
    righticon || lefticon ? `${size + 10}px` : "10px"};
  padding-left: ${({lefticon, righticon, size}) =>
    lefticon || righticon ? `${size + 10}px` : "10px"};
  min-width: 60px;
`;

const Container = styled.TouchableOpacity`
  border-width: ${props => (props.noBorder ? 0 : 1)};
  width: 100%;
  max-width: 350px;
  margin: 0;
  padding: 0;
  height: 48px;
  border-radius: 6;
  border-color: ${({type, theme: {buttons}}) => buttons[type].border};
  background-color: ${({type, theme: {buttons}}) => buttons[type].background};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

export const ButtonContainer = styled(Container)`
  padding: 0;
  margin: 5px;
  flex: auto;
  max-height: 48px;
  width: 100%;
  align-self: center;
`;

export const StyledIcon = styled(Icon)`
  text-align: center;
`;

export const IconContainer = styled(Container)`
  width: ${({size}) => size || 48}px;
  height: ${({size}) => size || 48}px;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
`;

export const MenuButtonIconContainer = styled(IconContainer)`
  margin-top: 0;
  margin-bottom: 2px;
  background-color: transparent;
`;

export const BounceContainer = styled.View`
  position: absolute;
  width: 200px;
  margin-top: ${({theme}) => theme.padding.top}px;
  margin-right: -20px;
  right: 0;
  z-index: 999;
`;

export const ButtonIcon = themed(styled(Icon)`
  display: flex;
  font-size: ${({size}) => `${size}px` || "48px"};
  margin-bottom: ${({bias}) => bias || "0"};
  color: ${({type, theme: {buttons}}) => buttons[type].text};
`);

export const MenuButtonText = styled.Text`
  font-size: 12px;
  color: ${({type, theme: {buttons}}) => buttons[type].text};
`;

export const TabContainer = styled(ButtonContainer)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 142px;
  width: 100%;
  max-height: 38px;
  margin: 0;
  padding: 10px 30px;
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;
export const TabText = styled(BtnText)`
  top: 0;
  color: inherit;
`;
