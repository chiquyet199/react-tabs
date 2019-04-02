import React from "react";
import RentPassportItem from "../RentPassportsPreview/RentPassportsPreview";
import {View} from "react-native";
import {Title} from "./RentPassportSection.styles";
import {
  object,
  bool,
  func,
  string,
  arrayOf,
  shape,
  number,
  oneOf,
} from "prop-types";

const RentPassportSection = ({
  title,
  data,
  theme,
  selectedPassport,
  addPassportsToShare,
  globaltheme,
}) => (
  <View id="rent-passport-section">
    <Title>{title}</Title>
    {data.map(item => (
      <RentPassportItem
        key={item.id}
        theme={theme}
        globaltheme={globaltheme}
        item={item}
        selectedPassport={selectedPassport}
        addPassportsToShare={addPassportsToShare}
      />
    ))}
  </View>
);

export default RentPassportSection;

RentPassportSection.propTypes = {
  title: string.isRequired,
  data: arrayOf(
    shape({
      id: number.isRequired,
      name: string,
      pending: bool,
    }),
  ),
  theme: object.isRequired,
  selectedPassport: oneOf(["shared", "pending"]).isRequired,
  addPassportsToShare: func.isRequired,
};
