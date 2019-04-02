import styled from "styled-components/native";

export const TruelayerContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  align-self: stretch;
  align-items: stretch;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
`;

export const TruelayerPageTitle = styled.Text`
  font-size: 28px;
  line-height: 36px;
  margin-bottom: 20px;
  color: ${({globaltheme, theme}) => theme[globaltheme].baseColor};
  width: 100%;
  text-align: ${props => (props.left ? "left" : "center")};
  padding-left: ${props => (props.left ? "15px" : "0px")};
  align-self: ${props => (props.left ? "flex-start" : "center")};
`;
