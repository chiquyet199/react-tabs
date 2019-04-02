import React from "react";
import styled from "styled-components/native";

export const CollapseContentContainer = styled.View`
  ${({vpadding}) =>
    vpadding && `padding-top: ${vpadding}px; padding-bottom: ${vpadding}px`};
  ${({hpadding}) =>
    hpadding && `padding-left: ${hpadding}px; padding-right: ${hpadding}px;`};
  ${({gpadding}) => gpadding && `padding: ${gpadding}px`};
`;

export const CollapseContent = ({children, ...otherProps}) => (
  <CollapseContentContainer {...otherProps}>
    {children}
  </CollapseContentContainer>
);
