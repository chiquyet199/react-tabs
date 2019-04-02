import React from "react";
import styled from "styled-components/native";
import {isNative, isWeb, responsive, themed} from "../../utils/common";
import {TouchableOpacity} from "react-native";
import {DESKTOP_CONTAINER_WIDTH} from "../../constants/sizes";
import {ButtonContainer} from "../Button/Button";
import {func, node, number, string} from "prop-types";

export const FlexContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  max-width: ${({full}) => (full ? "100%" : `${DESKTOP_CONTAINER_WIDTH}px`)};
`;

export const Flexed = styled.View``;

export const Flex = styled.View`
  margin-top: ${({theme}) => theme.padding.top + "px"};
  position: absolute;
  width: 100%;
  background-color: transparent;
`;

export const FlexColumn = styled.View`
  max-width: 537px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TopBarContainer = styled.View`
  width: 100%;
  max-width: 100%;
  padding: 0;
  padding-top: ${({theme}) => theme.padding.top + "px"}
  z-index: 2;
  position: relative;
  background-color: ${({theme, globaltheme}) =>
    theme[globaltheme].topbar.background}
`;

export const BaseContainer = styled.View`
  flex: 1;
  padding: 0;
  width: 100%;
  z-index: 1;
`;

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: ${({align}) => align || "center"};
  align-self: center;
  align-items: center;
  width: 100%;
  max-width: ${({full}) => (full ? "100%" : `${DESKTOP_CONTAINER_WIDTH}px`)};
  margin-horizontal: auto;
  padding-horizontal: ${({full}) => (full === "true" ? "0" : "10px")};
  flex-basis: auto;
`;

export const EndPageContainer = responsive(CenteredContainer)({
  S: `justify-content: flex-start`,
});

export const PageContainer = responsive(styled(CenteredContainer)`
  width: 100%;
  max-width: ${({full}) =>
    full === "true" ? "100%" : `${DESKTOP_CONTAINER_WIDTH}px`};
  align-self: center;
  align-items: stretch;
  margin-top: ${({layout}) => (layout === "hq" ? "60px" : "40px")};
  ${({margintop}) => margintop >= 0 && `margin-top: ${margintop}px`};
  padding-horizontal: 10px;
  justify-content: center;
  flex-basis: auto;
`)({
  S: `
      padding-top: ${({theme}) => theme.padding.top + "px"};
      justify-content: space-between;
      padding-horizontal: 10px;
      margin-top: ${({layout}) => (layout === "hq" ? "80px" : "20px")};
    `,
});

export const FormContainer = responsive(styled.View`
  justify-content: center;
  align-items: center;
  max-width: ${DESKTOP_CONTAINER_WIDTH}px;
  width: 100%;
  align-self: center;
`)({
  S: `
      padding-top: 10px;
      justify-content: space-between;
      max-width: 100%;
    `,
});

export const FlexRow = styled.View`
  flex: 1;
  flex-direction: row;
  flex-basis: 100%;
`;

export const ButtonBar = styled.View`
  max-width: ${({isMenu}) =>
    isMenu ? "100%" : `${DESKTOP_CONTAINER_WIDTH}px`};
  width: 100%;
  border-top-color: ${({isMenu, theme}) =>
    isMenu ? theme.colors.lightSteel : theme.colors.none};
  border-top-width: ${({isMenu}) => (isMenu ? "1px" : 0)};
  background-color: ${({isMenu, theme}) =>
    isMenu ? theme.colors.white : theme.colors.none};
  flex-direction: row;
  margin-horizontal: 0;
  margin-bottom: ${({isMenu}) => (isMenu ? 0 : "5px")};
  flex-wrap: ${({wrap}) => (wrap ? "wrap" : "nowrap")};
  ${({mt}) => mt && `margin-top: ${mt}px}`};
  ${ButtonContainer} {
    margin: 20px;
  }
`;

export const BottomButtonBar = responsive(ButtonBar)({
  S: `flexGrow: 10;
      flexDirection: row;
      alignItems: center;
      justifyContent: flex-end;
    `,
});

export const ResponsiveWebScrollView = responsive(styled.ScrollView``)({
  M: `
        width: 500px;
  `,
  L: `
        width: 600px;
    `,
});

export const PageTitle = themed(styled.Text`
  width: 100%;
  font-size: 28px;
  line-height: 36px;
  color: ${({globaltheme, theme}) => theme[globaltheme].baseColor};
  text-align: ${({left}) => (left ? "left" : "center")};
  padding-horizontal: 5px;
  align-self: ${({left}) => (left ? "flex-start" : "center")};
  font-weight: ${({bold}) => (bold ? "bold" : "normal")};
  ${({mb}) => mb && `margin-bottom: ${mb}px}`};
  ${({color}) => color && `color: ${color}`};
`);

export const TextParagraph = themed(styled.Text`
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  color: ${({disabled, theme, globaltheme}) =>
    disabled
      ? theme[globaltheme].disabledTextColor
      : theme[globaltheme].baseColor};
  font-weight: ${({bold}) => (bold ? "bold" : "normal")};
  font-style: ${({fontStyle}) => fontStyle || "normal"};
  align-self: ${({left}) => (left ? "flex-start" : "center")};
  text-align: ${({left}) => (left ? "left" : "center")};
  padding: ${({gutters}) => gutters || "15px 5px"};
  flex-shrink: 0;
  flex-grow: 0;
  ${({mb}) => mb && `margin-bottom: ${mb}px`};
  ${({color}) => color && `color: ${color}`};
`);

export const ViewParagraph = themed(styled.View`
  width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
`);

export const SubTitle = themed(styled(TextParagraph)`
  font-weight: bold;
  color: ${({globaltheme, theme}) => theme[globaltheme].baseColor};
  ${({color}) => color && `color: ${color}`};
`);

export const TextLinkText = themed(styled.Text`
  text-align: center;
  font-size: 16;
  line-height: 24;
  color: ${({theme, globaltheme}) => theme[globaltheme].accentColor};
  font-weight: 700;
  padding-top: ${({gutters}) => (gutters >= 0 ? `${gutters}px` : "15px")};
  padding-bottom: ${({gutters}) => (gutters >= 0 ? `${gutters}px` : "15px")}
  padding-left: ${({gutters}) => (gutters >= 0 ? `${gutters}px` : "15px")}
  padding-right: ${({gutters}) => (gutters >= 0 ? `${gutters}px` : "15px")}
  text-align:  ${({align}) => align || "center"};
`);

export const TextLink = ({onClick, children, gutters, align, globaltheme}) => (
  <TouchableOpacity onPress={onClick}>
    <TextLinkText align={align} gutters={gutters} globaltheme={globaltheme}>
      {children}
    </TextLinkText>
  </TouchableOpacity>
);

TextLink.propTypes = {
  onClick: func,
  children: node,
  gutters: number,
  align: string,
  globaltheme: string,
};

export const NotchSafety = styled.View`
  height: 40px;
`;

export const PageHeader = styled.Text`
  font-size: 18;
  text-align: center;
  width: 100%;
  margin-top: ${({theme}) => theme.padding.top + 15 + "px"};
  color: ${({globaltheme, theme}) => theme[globaltheme].baseColor};
  position: absolute;
`;

export const HeadlineText = responsive(styled.Text`
  width: 100%;
  font-size: 28px;
  line-height: 36px;
  color: ${({globaltheme, theme}) => theme[globaltheme].baseColor};
  align-self: ${({left}) => (left ? "flex-start" : "center")};
  text-align: ${({left}) => (left ? "left" : "center")};
  margin: 8px 0 40px;
  padding: 0;
`)({
  S: `
    padding-left: 15px;
    `,
  L: `
    align-self: center;
   `,
});

export const BoxButtonBar = styled.View`
  align-self: center;
  align-items: stretch;
  width: 100%;
  margin-horizontal: auto;
  flex-direction: row;
`;

export const FixedWidthContainer = styled.View`
  width: ${DESKTOP_CONTAINER_WIDTH}px;
  margin-horizontal: auto;
  padding-horizontal: 15px;
`;

export const PaddedContent = styled.View`
  padding-horizontal: 10px;
`;

export const ErrorMessage = themed(styled(TextParagraph)`
  color: ${({theme}) => theme.colors.alertRed};
`);

// Scroll layout

export const ScrollContentContainer = styled.View`
  width: 100%;
  ${isNative ? "flex: 1;" : "height: calc(100vh - 52px)"};
  flex-grow: ${() => (isWeb ? 0 : 1)};
  flex-shrink: ${() => (isWeb ? 0 : 1)};
  justify-content: center;
  align-self: center;
  align-items: center;
`;

export const ScrollButtonBar = styled(ButtonBar)`
  padding-horizontal: 10px;
  ${({mt}) => mt && `margin-top: ${mt}px}`};
`;

export const ScrollScrollView = styled.ScrollView`
  ${isNative ? "" : "height: 100%"};
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
`;
