import React from "react";
import {shallow} from "enzyme";

import RadioGroup from "./RadioGroup";
import RadioButton from "./RadioButton";
import {Text} from "react-native";

const onSelect = jest.fn();
const mockContext = {};
const mockProps = {
  layout: "row",
  size: 10,
  thickness: 2,
  color: "red",
  highlightColor: "blue",
  onSelect,
  selectedIndex: 0,
  style: "",
};
const mockOptions = [
  {
    label: "Yes",
    value: "1",
  },
  {
    label: "No",
    value: "0",
  },
];

describe("RadioGroup", () => {
  const wrapper = shallow(
    <RadioGroup {...mockProps}>
      {mockOptions.map(option => {
        return (
          <RadioButton
            key={`${option.value}_${option.label}`}
            value={option.value}
          >
            <Text>{option.label}</Text>
          </RadioButton>
        );
      })}
    </RadioGroup>,
    {
      context: mockContext,
    },
  );

  it("<RadioGroup /> exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders properly RadioButton", () => {
    expect(wrapper.find(RadioButton)).toHaveLength(mockOptions.length);
  });

  it("check RadioButtons on correct value", () => {
    const radioButtons = wrapper.find(RadioButton);

    radioButtons.forEach(radioBtn => {
      const value = radioBtn.prop("value");
      const option = mockOptions.find(o => {
        return value === o.value;
      });
      expect(value).toBe(option.value);
    });
  });

  it("check RadioButtons on correct label", () => {
    const textComponent = wrapper.find(Text);

    textComponent.forEach(text => {
      const {children} = text.props();
      const option = mockOptions.find(o => {
        return children === o.label;
      });
      expect(children).toBe(option.label);
    });
  });
});
