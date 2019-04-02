import React from "react";
import styled from "styled-components/native";
import {isEmpty} from "underscore";
import RentPassportTextField from "../RentPassportTextField";
import NotificationPanel from "../NotificationPanel";
import RentPassportHelpers from "../../utils/helpers/rentPassport";
import {colors} from "../../constants/theme";
import {SCORES, getScoreRanges} from "../../constants/credit-score";
import {
  arrayOf,
  array,
  func,
  object,
  oneOfType,
  string,
  oneOf,
} from "prop-types";
import RightToRentPreview from "../../components/RightToRentPreview";

export const FlexContainer = styled.View`
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
`;

export const ScaleContainer = styled(FlexContainer)`
  justify-content: center;
  padding-vertical: 15px;
`;

export const FlexItemContainer = styled(FlexContainer)`
  border-bottom-color: ${({noborder}) =>
    noborder === "true" ? colors.none : colors.lightSteel};
  border-bottom-width: 1px;
  flex-grow: 2;
  width: 100%;
`;

export const RentPassportCollapseContent = ({
  status,
  messageGroups,
  multipleMessages,
  errorTexts,
  goTo,
  showModal,
  schema,
  globaltheme,
}) => {
  const isCreditStatusPoor = properties => {
    const [{creditScale}] = properties;
    const scoreRange = getScoreRanges(SCORES.VERY_POOR);
    const creditScaleLowerBound = scoreRange.from;
    const creditScaleUpperBound = scoreRange.to;

    return (
      creditScale &&
      creditScale.value > creditScaleLowerBound &&
      creditScale.value <= creditScaleUpperBound
    );
  };

  const parseMessages = (messagesToParse, creditWorthy) => {
    const failedMessage = "creditScore.failed";
    if (messagesToParse && messagesToParse.length) {
      const parsedMessages = messagesToParse.slice();
      if (!creditWorthy && parsedMessages.includes(failedMessage)) {
        parsedMessages.push(failedMessage);
      }

      return parsedMessages;
    }

    return null;
  };

  if (!isEmpty(schema)) {
    const actions = {goTo, showModal};
    const isCreditWorthy = !isCreditStatusPoor(schema);
    const componentStatus = isCreditWorthy ? status : "RED";
    const notificationMessages = parseMessages(messageGroups, isCreditWorthy);

    return (
      <FlexContainer>
        {notificationMessages && notificationMessages.length
          ? messageGroups.map(messageGroup => {
              const messagesInGroup = Array.isArray(messageGroup)
                ? messageGroup
                : [messageGroup];

              return messagesInGroup.map(message => (
                <NotificationPanel
                  key={message}
                  topmargin={5}
                  bottommargin={5}
                  content={RentPassportHelpers.renderContent(
                    componentStatus,
                    message,
                    errorTexts,
                    actions,
                  )}
                  type={
                    RentPassportHelpers.getNotificationType(componentStatus)
                      .type
                  }
                />
              ));
            })
          : null}
        {multipleMessages && multipleMessages.length
          ? multipleMessages.map(message =>
              message.errors.map(error => (
                <NotificationPanel
                  key={error}
                  topmargin={5}
                  bottommargin={5}
                  content={RentPassportHelpers.renderContent(
                    message.status,
                    error,
                    errorTexts,
                    actions,
                  )}
                  type={
                    RentPassportHelpers.getNotificationType(message.status).type
                  }
                />
              )),
            )
          : null}
        {Object.entries(schema).map(([key, property]) => {
          return (
            <FlexItemContainer
              key={key}
              noborder={String(Number(key) === schema.length - 1)}
            >
              {Object.entries(property).map(([objKey, obj]) => {
                if (obj.uiComponent === "rightToRentComponent") {
                  return (
                    <RightToRentPreview
                      key={key}
                      passport={obj}
                      globaltheme={globaltheme}
                    />
                  );
                }

                return (
                  <RentPassportTextField
                    key={`${objKey}`}
                    title={obj.title}
                    value={obj.value || ""}
                    width={obj.width}
                    fontSize={obj.fontSize}
                    fontStyle={obj.fontStyle}
                    align={obj.align}
                    error={obj.error}
                  />
                );
              })}
            </FlexItemContainer>
          );
        })}
      </FlexContainer>
    );
  }

  return null;
};

RentPassportCollapseContent.propTypes = {
  schema: oneOfType([array, object]).isRequired,
  status: string,
  messageGroups: arrayOf(oneOfType([string, object])),
  multipleMessages: arrayOf(oneOfType([string, object])),
  errorTexts: object,
  goTo: func,
  globaltheme: oneOf(["dark", "light"]).isRequired,
  showModal: func,
};

export default RentPassportCollapseContent;
