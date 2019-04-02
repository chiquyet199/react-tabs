import {themed} from "../../utils/common";
import styledNative from "styled-components/native";
import DefaultPropertyThumbnail from "../svg/DefaultPropertyImage";

export const PropertyItemWrapper = themed(styledNative.View`
  align-items: center;
  border-bottom-color: ${({theme, globaltheme}) =>
    theme[globaltheme].boxBorder};
  border-bottom-width: ${({noBorder}) => (noBorder ? 0 : "1px")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 17px;
  padding: 17px 0;
`);

export const PropertyImage = styledNative.Image`
  height: 46px;
  margin-right: 10px;
  width: 46px;
  border-radius: 3px;
`;

export const DefaultPropertyImageWrapper = styledNative.View`
  align-items: center;
  display: flex;
  height: 46px;
  justify-content: center;
  margin-right: 10px;
  width: 46px;
`;

export const StyledDefaultPropertyThumbnail = styledNative(
  DefaultPropertyThumbnail,
)`
  width: 46px;
  height: 46px;
`;

export const PropertyAddress = styledNative.View`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  flex-grow: 2;
`;
export const PropertyAddressLine = themed(styledNative.Text`
  color: ${({theme, globaltheme}) => theme[globaltheme].textColor};
  font-size: 16px;
  width: 100%;
`);
export const PropertyRent = themed(styledNative.Text`
  color: ${({theme, globaltheme}) => theme[globaltheme].textColor};
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`);

export const ToggleIcon = styledNative.Image`
  width: 32px;
  height: 32px;
`;
