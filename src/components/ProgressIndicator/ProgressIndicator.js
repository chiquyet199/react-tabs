import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 0;
  height: 6px;
  width: 100%;
  background-color: ${({theme}) => theme.colors.lightSteel};
`;

export const Progress = styled.View`
  background-color: ${({theme, globaltheme}) =>
    theme[globaltheme].topbar.progressBar};
  height: 5px;
  width: ${({value}) => `${value}%`};
`;
