import styled from "styled-components/native";
import * as UtilsCommon from "../../utils/common";
const {responsive} = UtilsCommon;

export const BaseContainer = styled.ScrollView`
  padding: 0;
  width: 100%;
`;

export const PageContainer = responsive(styled.View`
  width: 100%;
  max-width: 1360px
  flex-direction: row-reverse
  align-self: center;
  margin-top: 0;
  padding-left: 18px
`)({
  S: `
      max-width: 100%;
      flex-direction: column
      max-width: 375px;
      padding-left: 0px
    `,
});

export const ColumnText = styled.View`
  max-width: 100%;
  width: auto;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  align-self: flex-start;
  flex-wrap: wrap;
`;

export const RowText = styled.View`
  width: auto;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const DetailsTitle = UtilsCommon.themed(styled.Text`
  font-size: 24px;
  line-height: 30px;
  color: ${({theme, globaltheme}) => theme[globaltheme].baseColor};
  margin-bottom: ${({mb}) => (mb ? `${mb}px` : "6px")};
  font-weight: ${({bold}) => (bold === "true" ? "bold" : "normal")};
`);

export const DetailsSubTitle = UtilsCommon.themed(styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: ${({theme, globaltheme}) => theme[globaltheme].baseColor};
  font-weight: ${({bold}) => (bold === "true" ? "bold" : "normal")};
`);

export const DetailsText = UtilsCommon.themed(styled.Text`
  font-size: 16px;
  line-height: 32px;
  color: ${({theme, globaltheme}) => theme[globaltheme].baseColor};
  font-weight: ${({bold}) => (bold === "true" ? "bold" : "normal")};
  text-align: left;
  padding: 0;
`);

export const ContentWrapper = styled.View`
  ${({top}) => top && `padding-top: ${top}px`};
`;

export const DetailsSection = UtilsCommon.themed(styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme, globaltheme}) =>
    theme[globaltheme].inactiveTabColor || "red"};
  padding-bottom: 20px;
  justify-content: flex-start;
  padding-top: 20px;
  padding-bottom: 20px;
`);

export const ApartmentDetailsSection = UtilsCommon.themed(styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme, globaltheme}) =>
    theme[globaltheme].inactiveTabColor};
  padding-bottom: 20px;
  justify-content: flex-start;
  padding-bottom: 20px;
`);

export const MapImage = responsive(styled.Image`
  min-width: 375px;
  height: 210px;
  margin-top: 0;
  margin-bottom: 0;
  align-self: center;
`)({
  S: `
    max-width: 100%;
    min-width: 320px;
`,
});

export const ButtonContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.veryLightSteel};
  padding: 16px 20px;
  margin-top: 16px;
`;

export const WrapperNew = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: center;
  padding-top: 40px;
`;

export const FixedContainer = responsive(styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.veryLightSteel};
  padding: 32px 40px;
  margin-top: 16px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  bottom: 0;
  flex-direction: row;
`)({
  S: `
    max-width: 340px;
`,
});

export const ButtonBar = styled.View`
  width: 300px;
  padding-right: 12px;
  padding-left: 12px;
`;
