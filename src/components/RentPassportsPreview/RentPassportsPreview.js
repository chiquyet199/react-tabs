import React from "react";
import {
  Container,
  StyledIcon,
  InfoContainer,
  Info,
} from "./RentPassportsPreview.styles";
import {string, func, object, oneOf, shape, bool, number} from "prop-types";
import {Switch} from "react-native";

const RentPassportPreview = ({
  item,
  theme,
  globaltheme,
  addPassportsToShare,
  selectedPassport,
}) => {
  const getStyledInput = () => (
    <Switch value={item.selected} onChange={() => addPassportsToShare(item)} />
  );

  return (
    <Container theme={theme} globaltheme={globaltheme}>
      <InfoContainer>
        <StyledIcon
          name={item.pending ? "email" : "rentpassport-thick"}
          size={32}
          color={theme.textColor}
        />
        <Info>{item.name}</Info>
      </InfoContainer>
      {item.pending && selectedPassport !== "shared" && getStyledInput()}
      {!item.pending && selectedPassport !== "pending" && getStyledInput()}
    </Container>
  );
};

RentPassportPreview.propTypes = {
  item: shape({
    id: number.isRequired,
    name: string,
    pending: bool,
  }).isRequired,
  theme: object.isRequired,
  addPassportsToShare: func.isRequired,
  selectedPassport: oneOf(["shared", "pending"]).isRequired,
};

export default RentPassportPreview;
