import styled from "styled-components/native";
import {themed} from "../../utils/common";
import {Button} from "../Button";

export const OptionsAlertContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

export const OptionsAlertContent = themed(styled.View`
  z-index: 11;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-height: 168px;
  position: absolute;
  bottom: 0;
  height: 100%;
  margin-bottom: 20px;
  background-color: ${({theme, globaltheme}) =>
    theme[globaltheme].altTextColor};
`);

export const StyledButton = styled(Button)`
  height: 80px;
`;

export const StyledView = styled.View`
  height: 80px;
`;
