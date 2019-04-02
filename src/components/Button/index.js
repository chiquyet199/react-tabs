import React from "react";
import {View} from "react-native";
import {
  array,
  bool,
  func,
  object,
  oneOf,
  oneOfType,
  number,
  string,
} from "prop-types";
import {
  ButtonContainer,
  Left,
  Middle,
  Right,
  BtnText,
  StyledIcon,
  IconContainer,
  MenuButtonIconContainer,
  BounceContainer,
  MenuButtonText,
  ButtonIcon,
  TabContainer,
  TabText,
} from "./Button";
import Icon from "../Icon";
import {applyStyleObjectToStyledComponent, themed} from "../../utils/common";

export const Button = ({
  left,
  right,
  middle,
  onClick,
  type,
  noborder,
  style,
  iconsize,
  theme,
  disabled,
}) => {
  const color = theme && theme.buttons[type].text;

  return (
    <ButtonContainer
      noborder={noborder}
      type={type}
      onPress={onClick}
      activeOpacity={0.6}
      style={style}
      theme={theme}
      disabled={disabled}
    >
      {left && (
        <Left size={iconsize || 32} shift={middle}>
          <StyledIcon
            type={type}
            name={left}
            size={iconsize || 32}
            color={color}
          />
        </Left>
      )}
      {middle && (
        <Middle lefticon={left} righticon={right} size={iconsize || 32}>
          <BtnText ellipsizeMode="tail" type={type} theme={theme}>
            {middle}
          </BtnText>
        </Middle>
      )}
      {right && (
        <Right size={iconsize || 32} shift={middle}>
          <StyledIcon
            type={type}
            name={right}
            size={iconsize || 32}
            color={color}
          />
        </Right>
      )}
    </ButtonContainer>
  );
};

Button.propTypes = {
  left: oneOfType([string, bool]),
  middle: string,
  right: oneOfType([string, bool]),
  onClick: func,
  type: string,
};

Button.defaultProps = {
  left: null,
  right: null,
  type: "primary",
};

export const IconButton = ({
  onClick,
  name,
  type,
  style,
  iconsize,
  bias,
  theme,
}) => (
  <IconContainer style={style} type={type} onPress={onClick}>
    <Icon
      size={iconsize}
      type={type}
      name={name}
      bias={bias}
      color={theme && theme.buttons[type].text}
    />
  </IconContainer>
);

IconButton.propTypes = {
  name: string.isRequired,
  onClick: func,
  type: string.isRequired,
};

const ThemedIconContainer = ({
  name,
  type,
  style,
  iconsize,
  bias,
  theme: {buttons},
}) => (
  <IconContainer size={iconsize} style={style} type={type}>
    <ButtonIcon
      size={iconsize}
      type={type}
      name={name}
      bias={bias}
      color={buttons[type].text}
    />
  </IconContainer>
);

ThemedIconContainer.propTypes = {
  name: string.isRequired,
  type: string.isRequired,
  style: oneOf([array, object]),
  iconsize: number,
  bias: number,
  theme: object.isRequired,
};

export const StyledIconContainer = themed(ThemedIconContainer);

export const MenuButton = ({
  onClick,
  name,
  type,
  iconContainerStyle,
  children,
  iconsize,
  theme,
}) => {
  const StyledInnerContainer = applyStyleObjectToStyledComponent(
    iconContainerStyle,
    MenuButtonIconContainer,
  );

  return (
    <View style={{flex: 1, alignItems: "center"}}>
      <StyledInnerContainer type={type} noBorder onPress={onClick}>
        <Icon
          type={type}
          name={name}
          size={iconsize || 32}
          color={theme.buttons[type].text}
        />
      </StyledInnerContainer>
      <MenuButtonText type={type}>{children}</MenuButtonText>
    </View>
  );
};

MenuButton.propTypes = {
  onClick: func,
  name: string,
  type: string,
  iconContainerStyle: object,
  iconsize: number,
  theme: object,
};

export const FormBounceButton = ({children, onClick, globaltheme, theme}) => (
  <BounceContainer>
    <Button
      onClick={onClick}
      middle={children}
      type={theme[globaltheme].form.bounceButton}
      noBorder
    />
  </BounceContainer>
);

FormBounceButton.propTypes = {
  children: string.isRequired,
  globaltheme: oneOf(["dark", "light"]),
  onClick: func.isRequired,
};

export const TabButton = ({onClick, left, iconsize, middle, type}) => (
  <TabContainer type={type} onPress={onClick}>
    <StyledIcon type={type} name={left} size={iconsize || 20} color="inherit" />
    <TabText ellipsizeMode="tail" type={type}>
      {middle}
    </TabText>
  </TabContainer>
);

TabButton.propTypes = {
  left: string,
  type: string.isRequired,
  middle: string.isRequired,
  iconsize: number,
  onClick: func,
};

export default themed(Button);
