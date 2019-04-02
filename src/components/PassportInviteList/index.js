import React from "react";
import {func, object, array, shape, string} from "prop-types";
import EmailContainer from "../EmailContainer";

export const PassportInviteList = ({
  passports,
  theme,
  onClick,
  translations,
}) => {
  return passports.map(passport => {
    return (
      <EmailContainer
        name={passport.name}
        isPending={passport.pending}
        email={passport.email}
        onClick={onClick}
        pendingText={translations.pending}
        theme={theme}
      />
    );
  });
};

PassportInviteList.propTypes = {
  passports: array.isRequired,
  theme: object,
  translations: shape({
    pending: string,
  }),
  onClick: func.isRequired,
};

export default PassportInviteList;
