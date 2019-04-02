import styled from "styled-components/native";
import {themed} from "../../utils/common";

export const ConfirmationAlertContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

export const ConfirmationAlertContent = themed(styled.View`
  z-index: 11;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-height: 128px;
  position: absolute;
  bottom: 0;
  height: 100%;
  background-color: ${({theme, globaltheme}) =>
    theme[globaltheme].tabs.background};
`);
