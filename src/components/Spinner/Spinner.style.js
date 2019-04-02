import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: transparent;
  position: absolute;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({theme, overlaycolor}) =>
    overlaycolor || theme.colors.none};
`;

export const StyledIndicator = styled.ActivityIndicator`
  flex: 1;
`;

export const TextContainer = styled.View`
  flex: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export const TextContent = styled.Text`
  margin-top: 130;
  height: 50;
  font-size: 20;
  font-weight: bold;
  ${props => props.textStyle};
`;
