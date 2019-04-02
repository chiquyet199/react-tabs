import React from "react";
import styled from "styled-components/native";
import {string, number, node, bool, oneOfType} from "prop-types";
import Icon from "../Icon";
import {themed} from "../../utils/common";

export const IconBasedContainer = styled.View`
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-grow: ${({small}) => (small ? 2 : 0)};
  flex-basis: ${({small, width}) => (small ? 0 : width)}%;
  max-width: ${({width}) => width}%;
  opacity: ${({disabled}) => (disabled ? "0.5" : "1")};
  padding-vertical: ${({small}) => (small ? 0 : "5px")};
  align-self: flex-start;
`;

export const TextContent = themed(styled.Text`
  font-size: 16px;
  line-height: 32px;
  color: ${({theme, globaltheme}) => theme[globaltheme].baseColor};
  font-weight: ${({bold}) => (bold === "true" ? "bold" : "normal")};
  font-style: ${({italic}) => (italic === "true" ? "italic" : "normal")};
  text-align: left;
  padding: 0;
  flex-shrink: 1 !important;
`);

export const FontIcon = styled.View`
  padding: 0;
  margin-right: 10px;
  width: ${({size}) => (size ? `${size}px` : "32px")};
  height: ${({size}) => (size ? `${size}px` : "32px")};
  align-self: flex-start;
`;

export const Image = styled.Image`
  padding: 0;
  margin-right: 10px;
  width: ${({size}) => (size ? `${size}px` : "32px")}
  height: ${({size}) => (size ? `${size}px` : "32px")}
  align-self: ${({centered}) => (centered === "true" ? "center" : "flex-start")}
`;

export const IconWithContent = ({
  icon,
  iconName,
  iconColor,
  iconSize,
  width = 100,
  disabled = false,
  text,
  children,
  bold,
  small,
  italic,
}) => (
  <IconBasedContainer width={width} disabled={disabled} small={small}>
    {icon ? (
      <Image source={icon} size={iconSize || 32} />
    ) : (
      <FontIcon size={iconSize}>
        <Icon name={iconName} size={iconSize || 32} color={iconColor} />
      </FontIcon>
    )}
    {children || (
      <TextContent bold={bold} italic={italic}>
        {text}
      </TextContent>
    )}
  </IconBasedContainer>
);

IconWithContent.propTypes = {
  icon: oneOfType([number, string]),
  iconSize: oneOfType([number, string]),
  iconName: string,
  text: string,
  children: node,
  bold: oneOfType([string, bool]),
  italic: oneOfType([string, bool]),
};

export default IconWithContent;
