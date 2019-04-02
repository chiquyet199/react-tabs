import React, {Component} from "react";
import {RadioButton} from "./";
import {colors} from "../../constants/theme";
import {func, array} from "prop-types";
import {
  TextWrapper,
  TextTitle,
  RadioGroupWrapper,
  RadioButtonGroupWrapper,
  SubTitle,
  TextError,
} from "./RadioButtonGroup.style";

class RadioButtonGroup extends Component {
  getSelected = (currentValue, options) => {
    const result = options.findIndex(option => option.value === currentValue);

    return result === -1 ? null : result;
  };

  render() {
    const {
      options = [],
      size = 24,
      thickness = 2,
      color = colors.canopyGreen,
      highlightColor = colors.none,
      onSelect,
      title = "",
      layout = "column",
      currentValue = null,
      errorText,
    } = this.props;

    return (
      <RadioButtonGroupWrapper>
        <TextTitle layout={layout}>{title}</TextTitle>
        <RadioGroupWrapper
          layout={layout}
          size={size}
          thickness={thickness}
          color={color}
          highlightColor={highlightColor}
          onSelect={onSelect}
          selectedIndex={this.getSelected(currentValue, options)}
        >
          {options.map(option => {
            return (
              <RadioButton
                layout={layout}
                key={`${option.value}_${option.label}`}
                value={option.value}
                subtitle={option.subTitle}
              >
                <TextWrapper>{option.label}</TextWrapper>
                {option.subTitle && <SubTitle>{option.subTitle}</SubTitle>}
              </RadioButton>
            );
          })}
        </RadioGroupWrapper>
        {errorText && <TextError>{errorText}</TextError>}
      </RadioButtonGroupWrapper>
    );
  }
}

RadioButtonGroup.propTypes = {
  onSelect: func.isRequired,
  options: array.isRequired,
};

export default RadioButtonGroup;
