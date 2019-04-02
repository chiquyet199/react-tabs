import React from "react";
import {bool, func, number, object, oneOf, shape, string} from "prop-types";
import {themed} from "../../utils/common";
import {
  Container,
  ThemedCanopyHqTextMiddle,
  StyledButton,
  RightButton,
} from "./TopUtilBar.styles";
import ProgressBar from "../ProgressIndicator";
import {TopBarContainer} from "../common/layout";
import NotificationPanel from "../NotificationPanel";

export const TopBar = ({
  goBack,
  theme,
  globaltheme,
  progress,
  haveTopbar,
  notification,
  topbarBtn,
  iconsize,
  topbarLeftText,
  topbarCenterText,
  text,
  layout,
  hideBackButton,
}) => {
  let errorText;
  if (notification) {
    const {
      message,
      message: {error},
    } = notification;
    errorText = error || message;
  }

  return (
    <TopBarContainer theme={theme} globaltheme={globaltheme}>
      {progress > 0 && (
        <ProgressBar value={progress} theme={theme} globaltheme={globaltheme} />
      )}
      {haveTopbar && (
        <Container layout={layout}>
          {!hideBackButton && (
            <RightButton
              left="arrow-left"
              type={theme[globaltheme].topbar.headerButtonColour}
              middle={topbarLeftText || null}
              iconsize={iconsize || 32}
              onClick={goBack}
              layout={layout}
            />
          )}

          <ThemedCanopyHqTextMiddle theme={theme} globaltheme={globaltheme}>
            {topbarCenterText || text}
          </ThemedCanopyHqTextMiddle>

          {topbarBtn &&
            topbarBtn.haveTopbarButton && (
              <StyledButton
                iconsize={iconsize || 32}
                type={topbarBtn.btnType || "transparent_green"}
                right={
                  topbarBtn.topbarButtonText !== "Close" &&
                  topbarBtn.topbarButtonIcon
                }
                left={
                  topbarBtn.topbarButtonText === "Close" &&
                  topbarBtn.topbarButtonIcon
                }
                middle={topbarBtn.topbarButtonText || null}
                onClick={topbarBtn.actionTopbarButton}
                layout={layout}
              />
            )}
        </Container>
      )}
      {notification && (
        <NotificationPanel
          isTopbar
          text={errorText}
          iconName={notification.icon}
          type={notification.type}
        />
      )}
    </TopBarContainer>
  );
};

TopBar.defaultProps = {
  globaltheme: "light",
};

TopBar.propTypes = {
  iconsize: number,
  progress: number,
  text: string,
  topbarLeftText: string,
  topbarCenterText: string,
  hideBackButton: bool,
  globaltheme: oneOf(["light", "dark"]),
  theme: object,
  topbarBtn: shape({
    haveTopbarButton: bool,
    topbarButtonText: string,
    btnType: string,
    topbarButtonIcon: string,
    actionTopbarButton: func,
    hideBackButton: bool,
  }),
  notification: object,
  goBack: func,
  haveTopbar: bool.isRequired,
  layout: string,
};
export default themed(TopBar);
