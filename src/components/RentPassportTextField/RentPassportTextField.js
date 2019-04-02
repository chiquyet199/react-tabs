import React from "react";
import styled from "styled-components/native";
import {colors} from "../../constants/theme";
import {bool} from "prop-types";

export const FlexContainer = styled.View`
  flex: auto;
  flex-direction: row;
  flex-wrap: wrap;
  width: ${props => props.width}%;
  padding-vertical: 10px;
`;

export const PageHeader = styled.Text`
  font-size: ${({fontSize}) => fontSize || "18"}px;
  display: flex;
  font-style: ${({fontStyle}) => fontStyle || "normal"};
  width: ${({align}) => (align === "right" ? "auto" : "100%")};
  color: ${({error}) =>
    error === "true" ? colors.alertRed : colors.canopySteel};
  align-self: flex-end;
  align-items: flex-end;
  justify-content: ${({align}) =>
    align === "right" ? "space-between" : "flex-start"};
`;

export const TextFieldHeading = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({error}) =>
    error === "true" ? colors.alertRed : colors.canopySteel};
  width: 100%;
  display: flex;
`;

class RentPassportTextField extends React.Component {
  joinN = value => {
    if (Array.isArray(value) && value) {
      return value.filter(n => n).join("\n");
    } else if (typeof value === "string" && value.trim().length) {
      return value;
    } else if (typeof value === "number" || typeof value === "object") {
      return value;
    }

    return "";
  };

  render() {
    const {title, value, width, fontStyle, fontSize, align, error} = this.props;
    const errorProp = error ? error.toString() : undefined;

    return (
      <FlexContainer width={width} align={align}>
        {title && (
          <TextFieldHeading error={errorProp} align={align}>
            {title}
          </TextFieldHeading>
        )}
        <PageHeader
          fontStyle={fontStyle}
          fontSize={fontSize}
          align={align}
          error={errorProp}
          textAlignVertical="bottom"
        >
          {this.joinN(value)}
        </PageHeader>
      </FlexContainer>
    );
  }
}

RentPassportTextField.propTypes = {
  error: bool,
};

export default RentPassportTextField;
