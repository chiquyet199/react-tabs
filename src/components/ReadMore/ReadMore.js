import React from "react";
import {string, object, number} from "prop-types";
import Truncate from "react-native-read-more-text";
import styled from "styled-components/native";
import {themed} from "../../utils/common";

export const Text = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${({theme, globaltheme}) => theme && theme[globaltheme].textColor};
  font-weight: ${({bold}) => (bold === "true" ? "bold" : "normal")};
  text-align: left;
  padding: 0;
`;

export const Link = styled(Text)`
  height: 24px;
  color: ${({theme, globaltheme}) => theme && theme[globaltheme].accentColor};
  font-weight: bold;
`;

export const Wrapper = styled(Text)`
  height: 24px;
`;

export const TruncatedWrapper = styled(Wrapper)`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${({theme}) => theme && theme.colors.white};
`;

export const ReadMore = ({text, lines, theme, globaltheme, more, less}) => {
  const themeProps = {theme, globaltheme};

  const renderTruncatedFooter = handlePress => {
    return (
      <TruncatedWrapper onPress={handlePress} {...themeProps}>
        ...
        <Link {...themeProps}>{more}</Link>
      </TruncatedWrapper>
    );
  };

  const renderRevealedFooter = handlePress => {
    return (
      <Wrapper onPress={handlePress} {...themeProps}>
        <Link {...themeProps}>{less}</Link>
      </Wrapper>
    );
  };

  return (
    <Truncate
      numberOfLines={lines}
      renderTruncatedFooter={renderTruncatedFooter}
      renderRevealedFooter={renderRevealedFooter}
    >
      <Text {...themeProps}>{text}</Text>
    </Truncate>
  );
};

ReadMore.defaultProps = {
  lines: 6,
  more: "read more",
  less: "show less",
};

ReadMore.propTypes = {
  text: string.isRequired,
  lines: number,
  less: string,
  more: string,
  globaltheme: string.isRequired,
  theme: object.isRequired,
};

export default themed(ReadMore);
