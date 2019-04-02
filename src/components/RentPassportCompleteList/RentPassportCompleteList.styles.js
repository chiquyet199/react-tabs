import styled from "styled-components/native";
import {colors} from "../../constants/theme";
import {themed} from "../../utils/common";

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 5px;
`;

export const Container = themed(styled.View`
  flex: auto;
  padding-horizontal: 8px;
`);

export const RentPassportListItemContainer = styled.View`
  flex: auto;
  flex-direction: row;
`;

export const RentPassportListBodyContainer = styled.View`
  flex-direction: row;
  padding: 0 10px;
  margin-bottom: 10px;
`;

export const RentPassportListItemIcon = styled.Image`
  height: 64px;
  width: 64px;
  opacity: ${({complete}) => (complete ? 1 : 0.2)};
`;

export const RentPassportListItemDetails = styled.View`
  flex: auto;
  justify-content: space-around;
  margin-left: 8px;
`;

export const Status = styled.View`
  flex: auto;
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  margin: ${({iconMargin}) => (iconMargin ? `${iconMargin}px` : "2px")};
`;

export const ToggleIcon = styled.Image`
  width: 32px;
  height: 32px;
  transform: ${({collapsed}) =>
    collapsed === "true" ? "rotate(0deg)" : "rotate(180deg)"};
`;

export const ListSpace = styled.View`
  flex: auto;
  width: 100%;
  background-color: ${colors.white};
  flex-grow: 0;
`;

export const Title = themed(styled.Text`
  font-size: 24px;
  line-height: 30px;
  color: ${({complete, theme}) =>
    complete ? theme.colors.canopySteel : theme.colors.lightSteel};
`);

export const SubTitle = themed(styled.Text`
  max-width: 90%;
  line-height: 18px;
  font-size: 14px;
  color: ${({complete, theme}) =>
    complete ? theme.colors.canopySteel : theme.colors.lightSteel};
`);

export const ContentDivider = themed(styled.View`
  width: auto;
  height: 1px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.lightSteel};
  margin: 10px 10px 0;
  margin-top: 10px;
  margin-left: ${({fullWidthContentDivider}) =>
    fullWidthContentDivider ? 0 : "10px"};
  margin-right: ${({fullWidthContentDivider}) =>
    fullWidthContentDivider ? 0 : "10px"};
`);
