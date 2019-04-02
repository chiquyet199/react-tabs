import React from "react";
import {func, node, number, bool, string, oneOf} from "prop-types";
import {themed} from "../../utils/common";
import Icon from "../Icon";
import {Container, NotificationText, TextWrapper} from "./NotificationPanel";
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_ICON_COLORS,
} from "../../constants/notifications";

export const NotificationPanel = ({
  text,
  content,
  textColor,
  iconColor,
  iconName,
  handlePress,
  type,
  theme,
  topmargin,
  bottommargin,
  isTopbar,
}) => {
  const colors = NOTIFICATION_ICON_COLORS(theme)[type];

  if (text || content) {
    return (
      <Container
        theme={theme}
        color={colors.bg}
        bottommargin={bottommargin}
        topmargin={topmargin}
        topbar={isTopbar && isTopbar.toString()}
      >
        {text && (
          <TextWrapper>
            <Icon
              name={iconName}
              size={26}
              color={iconColor || colors.iconColor}
            />
            <NotificationText
              theme={theme}
              color={textColor || iconColor || colors.text}
            >
              {text}
            </NotificationText>
            {handlePress && (
              <Icon
                name={iconName}
                size={26}
                color={colors.iconColor}
                onPress={handlePress}
                onClick={handlePress}
              />
            )}
          </TextWrapper>
        )}
        {content && content}
      </Container>
    );
  }

  return null;
};

NotificationPanel.defaultProps = {
  type: "",
};
NotificationPanel.propTypes = {
  handlePress: func,
  text: string,
  content: node,
  textColor: string,
  iconColor: string,
  iconName: string,
  type: oneOf(NOTIFICATION_TYPES),
  topmargin: number,
  bottommargin: number,
  isTopbar: bool,
};

export default themed(NotificationPanel);
