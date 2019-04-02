import React from "react";
import {ListSpace} from "./RentPassportsPreview.styles";

import {
  object,
  func,
  oneOf,
  bool,
  string,
  arrayOf,
  shape,
  number,
} from "prop-types";
import RentPassportSection from "../RentPassportSection";

export const RentPassportList = ({
  data,
  theme,
  globaltheme,
  selectedPassport,
  addPassportsToShare,
  translations,
}) => {
  const shared = data.filter(item => !item.pending);
  const pending = data.filter(item => item.pending);

  return (
    <ListSpace globaltheme={globaltheme} theme={theme}>
      {shared.length !== 0 && (
        <RentPassportSection
          globaltheme={globaltheme}
          theme={theme}
          data={shared}
          title={translations.shared}
          selectedPassport={selectedPassport}
          addPassportsToShare={addPassportsToShare}
        />
      )}
      {pending.length !== 0 && (
        <RentPassportSection
          globaltheme={globaltheme}
          theme={theme}
          data={pending}
          title={translations.pending}
          selectedPassport={selectedPassport}
          addPassportsToShare={addPassportsToShare}
        />
      )}
    </ListSpace>
  );
};

RentPassportList.propTypes = {
  data: arrayOf(
    shape({
      id: number.isRequired,
      name: string,
      pending: bool,
    }),
  ).isRequired,
  theme: object.isRequired,
  addPassportsToShare: func.isRequired,
  selectedPassport: oneOf(["shared", "pending"]).isRequired,
  translations: shape({
    shared: string,
    pending: string,
  }),
};

export default RentPassportList;
