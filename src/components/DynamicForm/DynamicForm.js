import styled from "styled-components/native/index";
import Switch from "../../components/Switch";
import {responsive, themed, isWeb} from "../../utils/common";
import DatePicker from "../DatePicker";
import {TextParagraph, PageTitle} from "../common/layout";

export const FormContainer = responsive(styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`)({
  S: `
  margin-bottom: 10px;
  max-width: 100%;`,
});

export const StyledInputWrapper = styled.View`
  width: 100%;
  margin-bottom: 0;
`;

export const StyledTextParagraph = styled(TextParagraph)`
  padding-left: 0;
  padding-right: 0;
`;

export const StyledPageTitle = styled(PageTitle)`
  padding-left: 0;
  padding-right: 0;
`;

export const StyledSwitch = styled(Switch)`
  margin-left: 10px;
`;

export const SwitchText = styled.Text`
  font-size: 16px;
  flex: 3;
  line-height: 24px;
  padding: 0;
  margin-right: 10px;
  color: ${({globaltheme, theme}) => theme[globaltheme].baseColor};
  text-align: ${props => (props.left ? "left" : "center")};
  align-self: ${props => (props.left ? "flex-start" : "center")};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
`;

export const SwitchContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding-vertical: ${({layout}) => (layout === "hq" ? "17px" : "39px")};
  align-items: center;
  border-bottom-color: ${({layout, theme}) =>
    layout === "hq" ? theme.colors.lightSteel : "rgba(255, 255, 255, 0.2)"};
  border-bottom-width: ${({layout}) => (layout === "hq" ? "1px" : "2px")};
  width: 100%;
  padding-horizontal: 0;
`;

export const SwitchError = styled(SwitchText)`
  color: ${({color, theme}) => color || theme.colors.alertRed};
`;

export const StyledInputContainer = styled.View`
  ${isWeb ? `position: static; z-index: auto;` : ""};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputHeading = themed(styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: ${({theme, globaltheme}) => theme[globaltheme].textColor};
  padding: 0;
`);

export const StyledHeading = themed(styled.Text`
  margin-bottom: -10px;
  padding-horizontal: 0;
  color: ${({theme, globaltheme}) => theme[globaltheme].textColor};
  font-size: 16px;
`);

export const StyledFieldWrapper = styled.View`
  ${isWeb ? `position: static; z-index: auto;` : ""};
  padding-horizontal: 5px;
  width: ${({width}) => width || 100}%;
  min-height: 92px;
`;

export const StyledDatePicker = styled(DatePicker)`
  ${isWeb ? `position: static; z-index: auto;` : ""};
  flex: 1;
  width: 100%;
`;

export const StyledPickerContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-vertical: 15px;
`;

export const ContentDivider = responsive(styled.View`
  width: ${({length}) => (length >= 0 ? `${length}px` : "100%")};
  height: 1px;
  border: 0;
  border-top-width: 1px;
  border-top-color: ${({color}) => color};
  margin: ${({margin}) => (margin >= 0 ? `${margin}px 0` : "20px 0")};
`)({
  S: `
  width: 100%;
  `,
  M: `
  width: 100%;
  `,
});

export const Tooltip = themed(
  responsive(styled.Text`
    width: ${({length}) => (length >= 0 ? `${length}px` : "160px")};
    color: ${({globaltheme, theme}) => theme[globaltheme].baseColor};
    font-size: 12px;
    position: absolute;
    top: 20px;
    left: 105%;
  `)({
    S: `
  position: relative;
  left: 0;
  width: 100%;
  `,
    M: `
  position: relative;
  left: 0;
  width: 100%;
  `,
  }),
);
