import styled from "styled-components/native";
import {isWeb} from "../../utils/common";

export const Container = styled.View`
  position: ${({topbar}) =>
    topbar === "true" && isWeb ? "absolute" : "relative"};
  left: 0;
  top: ${({topbar}) => (topbar === "true" && isWeb ? "100%" : "0")};
  background-color: ${({color, theme}) => color || theme.colors.none};
  opacity: 0.8;
  min-height: 38px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 15px;
  margin-top: ${({topmargin}) =>
    topmargin === 0 || topmargin ? `${topmargin}px` : "-15px"};
  margin-bottom: ${({bottommargin}) =>
    bottommargin === 0 || bottommargin ? `${bottommargin}px` : "0"};
`;

export const NotificationText = styled.Text`
  padding: 0;
  color: white;
  flex-grow: 3;
  color: ${({color, theme}) => color || theme.colors.lightSteel};
`;

export const TextWrapper = styled.View`
  flex-grow: 2;
  padding-left: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 10px;
`;
