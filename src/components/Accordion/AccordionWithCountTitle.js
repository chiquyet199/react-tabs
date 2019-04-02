import React from "react";
import {View} from "react-native";
import {bool, number, string} from "prop-types";
import {Title, CountWrapper, Count} from "./AccordionWithCountTitle.styles";
import {
  AccordionOpenIndicator,
  TitleRow,
  ThemedIcon,
} from "./AccordionCommon.styles";

export const AccordionWithCountTitle = ({
  children,
  headerCount,
  headerIconName,
  collapsed,
  title,
}) => (
  <View>
    <TitleRow>
      <ThemedIcon name={headerIconName} size={32} />
      <Title>{title}</Title>
      <CountWrapper>
        <Count>{headerCount}</Count>
      </CountWrapper>
      <AccordionOpenIndicator collapsed={collapsed} />
    </TitleRow>
    <View>{children}</View>
  </View>
);
AccordionWithCountTitle.propTypes = {
  headerIconName: string.isRequired,
  headerCount: number.isRequired,
  collapsed: bool,
  title: string.isRequired,
};

export default AccordionWithCountTitle;
