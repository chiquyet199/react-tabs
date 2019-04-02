import styled from "styled-components/native";

export const Container = styled.View``;

export const StyledText = styled.Text`
  font-size: 16;
  margin-top: 8;
  font-style: ${({italic}) => (italic ? "italic" : "normal")}
  color: ${({alert, theme}) => (alert ? theme.errorColor : theme.textColor)};
`;

export const StyledImage = styled.Image`
  height: 342px;
  width: 340px;
`;

export const ScanningMetadata = styled.Text`
  font-size: 12;
  color: ${({theme}) => theme.textColor};
`;
