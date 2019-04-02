import styled from "styled-components/native";
import {themed} from "../../utils/common";

export const Container = styled.View`
  background-color: transparent;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  flex-wrap: wrap;
  align-items: flex-start;
  max-width: 340px;
  flex-shrink: ${({fullHeight}) => (fullHeight ? 1 : 0)};
  flex-grow: ${({fullHeight}) => (fullHeight ? 1 : 0)};
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;
export const SlideContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
export const CurrentSlide = styled.View`
  margin-bottom: 14px;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
`;
export const CurrentImage = styled.Image`
  width: ${({imageWidth}) => imageWidth || 340}px;
  height: ${({imageHeight}) => imageHeight || 190}px;
  border-radius: 0;
`;

export const TitleText = themed(styled.Text`
  width: 100%;
  color: ${({theme, globaltheme}) => theme[globaltheme].textColor};
  margin-top: 10px;
  margin-bottom: 14px;
  font-size: 26px;
  line-height: 30px;
  text-align: center;
`);

export const MoreText = themed(styled.Text`
  width: 100%;
  color: ${({theme, globaltheme}) => theme[globaltheme].textColor};
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  margin-bottom: 38px;
`);
