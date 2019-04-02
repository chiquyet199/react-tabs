import React from "react";
import {
  EmailsContainer,
  StyledIcon,
  LineBreak,
  PassportContainer,
  Container,
  NameText,
  EmailText,
  PendingText,
} from "./EmailContainer.js";
import {func, object, bool, string} from "prop-types";
import {themed} from "../../utils/common";

export const EmailContainer = ({
  isPending,
  pendingText,
  name,
  email,
  theme,
  onClick,
  globaltheme,
}) => {
  return (
    <Container>
      <EmailsContainer
        onClick={() => {
          onClick(email);
        }}
      >
        <StyledIcon
          name={isPending ? "email" : "rentpassport-thick"}
          size={32}
          color={theme[globaltheme].textColor}
        />
        {isPending ? (
          <PassportContainer>
            <PendingText>{pendingText}</PendingText>
            <PendingText>{email}</PendingText>
          </PassportContainer>
        ) : (
          <PassportContainer>
            <NameText>{name}</NameText>
            <EmailText>{email}</EmailText>
          </PassportContainer>
        )}
      </EmailsContainer>
      <LineBreak theme={theme} globaltheme={globaltheme} />
    </Container>
  );
};

EmailContainer.propTypes = {
  pendingText: string.isRequired,
  onClick: func.isRequired,
  isPending: bool,
  name: string.isRequired,
  email: string.isRequired,
  theme: object.isRequired,
};

export default themed(EmailContainer);
