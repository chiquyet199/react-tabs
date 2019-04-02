import {themed} from "../../utils/common";
import Icon from "../Icon";
import styledNative from "styled-components/native";

export const Background = themed(styledNative.View`
  background-color: ${({globaltheme, theme}) =>
    theme[globaltheme].topbar.background};
`);
export const PropertySummary = themed(styledNative.View`
  align-items: center;
  background-color: ${({globaltheme, theme}) =>
    theme[globaltheme].activeTenancy.propertySummaryBackground};
  border-radius: 6px;
  flex-direction: row;
  padding: 10px;
  margin: 12px 33px 11px 18px;
`);
export const PropertyImage = styledNative.Image`
  border-radius: 6px;
  height: 56;
  margin-right: 12px;
  width: 56;
`;
export const ThemedText = themed(styledNative.Text`
  color: ${({globaltheme, theme}) => theme[globaltheme].altTextColor};
`);
export const PropertyRent = styledNative(ThemedText)`
  font-size: 24;
  margin-right: 5;
`;
export const RentDueDate = styledNative(ThemedText)`
  font-size: 12;
`;
export const PropertyAddress = styledNative(ThemedText)`
  font-size: 12;
  font-weight: bold;
`;
export const FullDetailsLink = themed(styledNative.TouchableOpacity`
  border-radius: 16px;
  backgroundColor: ${({globaltheme, theme}) => theme[globaltheme].accentColor};
  position: relative;
  left: 13;
`);
export const ArrowIcon = themed(styledNative(Icon)`
  color: ${({globaltheme, theme}) => theme[globaltheme].altTextColor};
`);
export const VerticalStack = styledNative.View`

`;
export const RentalPayments = styledNative.View`
  align-items: flex-end;
  flex-direction: row;
  margin-bottom: 4px;
`;
