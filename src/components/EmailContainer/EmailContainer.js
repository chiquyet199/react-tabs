import styled from "styled-components/native";
import Icon from "../Icon";

export const Container = styled.View`
  width: 350px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmailsContainer = styled.View`
  width: 300px;
  height: 63px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledIcon = styled(Icon)`
  right: 1px;
  bottom: 1px;
  padding-right: 8px;
`;

export const LineBreak = styled.View`
  width: 340px;
  border: solid 1px
    ${({theme, globaltheme}) => theme[globaltheme].lineBreakColor};
`;

export const PassportContainer = styled.View`
  margin-left: 10px;
`;

export const NameText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  height: 18px;
`;

export const EmailText = styled.Text`
  font-size: 16px;
  height: 24px;
`;

export const PendingText = styled.Text`
  font-size: 16px;
  height: 18px;
  font-style: italic;
`;
