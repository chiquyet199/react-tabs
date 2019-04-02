import styled from "styled-components/native";
import Button from "../../components/Button";
import {responsive, themed} from "../../utils/common";

export const Container = responsive(styled.View`
  width: 100%;
  background-color: transparent;
  min-height: ${({layout}) => (layout === "hq" ? 80 : 46)}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 5px;
`)({
  S: `
    padding-right: 0;
    max-width: 100%;
  `,
});

export const ThemedCanopyHqTextMiddle = styled.Text`
  position: relative;
  z-index: 1;
  flex: 1;
  font-size: ${({theme, globaltheme}) =>
    theme[globaltheme].topbar.fontSize || "16px"};
  text-align: center;
  margin-left: 0;
  color: ${({theme, globaltheme}) =>
    theme[globaltheme].topbar.baseColor || theme[globaltheme].baseColor};
`;

export const StyledButton = themed(styled(Button)`
  position: absolute;
  top: ${({layout}) => (layout === "hq" ? 18 : 0)}px;
  right: 0;
  flex-grow: 0;
  min-width: 53px;
  width: auto;
  max-height: 46px;
  margin: 0;
  z-index: 2;
`);

export const RightButton = styled(StyledButton)`
  align-self: flex-start;
  left: 0;
  right: auto;
  width: auto;
`;
