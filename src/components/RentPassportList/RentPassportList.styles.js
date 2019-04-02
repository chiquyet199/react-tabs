import styled from "styled-components/native";
import Icon from "../Icon";

export const Container = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.lightSteel};
  margin-horizontal: 8;
`;

export const RentPassportListItemContainer = styled.View`
  flex: 4;
  flex-direction: row;
`;

export const RentPassportListItemIcon = styled.Image`
  height: 64px;
  width: 64px;
  opacity: ${props => (props.complete ? 1 : 0.2)};
`;

export const RentPassportListItemDetails = styled.View`
  flex: 10;
  justify-content: space-evenly;
`;

export const Status = styled.View`
  flex: 10;
  flex-direction: row;
  align-items: center;
`;

export const StatusIcon = styled(Icon)`
  margin-right: 5px;
  padding-top: 2px;
  color: ${({complete, theme}) =>
    complete ? theme.colors.canopyGreen : theme.colors.lightSteel};
`;

export const StatusText = styled.Text`
  font-size: 12px;
  color: ${({complete, theme}) =>
    complete ? theme.colors.canopyGreen : theme.colors.lightSteel};
`;

export const ListSpace = styled.View`
  flex: 5;
  width: 100%;
  background-color: ${({theme}) => theme.colors.white};
`;

export const ListItemSpacer = styled.View`
  flex: 2;
  justifycontent: center;
  alignitems: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${({complete, theme}) =>
    complete ? theme.colors.canopyGreen : theme.colors.lightSteel};
`;

export const Info = styled.Text`
  font-size: 14px;
  color: ${({complete, theme}) =>
    complete ? theme.colors.canopyGreen : theme.colors.lightSteel};
`;
