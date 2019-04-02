import React, {Component} from "react";
import PropTypes from "prop-types";
import {TouchableWithoutFeedback} from "react-native";
import {
  Radio,
  StyledItem,
  StyledContainer,
  SelectedRadio,
  RadioButtonWrapper,
} from "./RadioButton.style";

export default class RadioButton extends Component {
  isSelected() {
    const {isSelected, activeColor} = this.props;
    const {size, color} = this.context;

    if (isSelected) {
      return (
        <SelectedRadio
          size={size}
          color={color}
          activeсolor={activeColor}
          selectedview="true"
        />
      );
    }

    return null;
  }
  render() {
    const {
      children,
      disabled,
      layout,
      style,
      isSelected,
      activeColor,
      subtitle,
    } = this.props;
    const {size, thickness, color, highlightColor} = this.context;

    return (
      <RadioButtonWrapper disabled={disabled} layout={layout}>
        <TouchableWithoutFeedback
          disabled={this.props.disabled}
          onPress={() =>
            this.context.onSelect(this.props.index, this.props.value)
          }
        >
          <StyledContainer
            styled={style}
            selected={isSelected}
            highlightcolor={highlightColor}
            subtitle={subtitle}
          >
            <Radio
              size={size}
              thickness={thickness}
              activeсolor={activeColor}
              color={color}
              selected={isSelected}
            >
              {this.isSelected()}
            </Radio>
            <StyledItem>{children}</StyledItem>
          </StyledContainer>
        </TouchableWithoutFeedback>
      </RadioButtonWrapper>
    );
  }
}

RadioButton.contextTypes = {
  onSelect: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  highlightColor: PropTypes.string,
};
