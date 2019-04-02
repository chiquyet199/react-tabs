import React from "react";
import {View} from "react-native";
import {bool, string} from "prop-types";
import styledNative from "styled-components/native";
import {
  AccordionOpenIndicator,
  TitleRow,
  ThemedIcon,
  ThemedText,
} from "./AccordionCommon.styles";

const Title = styledNative(ThemedText)`
  font-size: 24;
  line-height: 30;
`;
const SubTitle = styledNative(ThemedText)`
  font-size: 14;
  line-height: 18;
`;
const TitleTextWrapper = styledNative.View`
  flex-grow: 1;
`;

export const AccordionWithIconTitle = ({
  children,
  headerIconName,
  collapsed,
  subTitle,
  title,
}) => (
  <View>
    <TitleRow>
      <ThemedIcon name={headerIconName} size={32} />
      <TitleTextWrapper>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </TitleTextWrapper>
      <AccordionOpenIndicator collapsed={collapsed} />
    </TitleRow>
    <View>{children}</View>
  </View>
);
AccordionWithIconTitle.propTypes = {
  headerIconName: string.isRequired,
  collapsed: bool,
  subTitle: string.isRequired,
  title: string.isRequired,
};

export default AccordionWithIconTitle;
