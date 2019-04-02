import styled from "styled-components/native";
import Icon from "../Icon";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme, globaltheme}) =>
    theme[globaltheme].dividerColor};
  justify-content: space-between;
  align-items: center;
  height: 72px;
  width: 100%;
  &:hover {
    background-color: red;
  }
`;

export const ListSpace = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({theme, globaltheme}) =>
    theme[globaltheme].altTextColor};
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${({theme}) => theme.textColor};
`;

export const PendingTitle = styled.Text`
  font-size: 24px;
  padding-top: 16px;
  color: ${({theme}) => theme.textColor};
`;

export const Info = styled.Text`
  font-size: 16px;
  padding-left: 12px;
  color: ${({theme}) => theme.textColor};
`;

export const StyledIcon = styled(Icon)`
  right: 1px;
  bottom: 1px;
`;

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledInput = styled.TextInput`
  width: 40px;
  height: 40px;
`;
