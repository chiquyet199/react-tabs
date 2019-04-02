import React from "react";
import {shallow} from "enzyme";
import {Text, TouchableWithoutFeedback} from "react-native";
import {SelectedRadio} from "./RadioButton.style";

import RadioButton from "./RadioButton";

const onSelect = jest.fn();
const mockText = "This is mock text";
const mockContext = {
  size: 10,
  thickness: 1,
  color: "red",
  onSelect,
};
const mockProps = {
  disabled: false,
  layout: "row",
  index: 1,
  value: "1",
  style: "",
  isSelected: true,
  children: <Text>{mockText}</Text>,
  color: "red",
};

describe("RadioButton", () => {
  const wrapper = shallow(<RadioButton {...mockProps} />, {
    context: mockContext,
  });
  describe("<TouchableWithoutFeedback />", () => {
    it("renders properly TouchableWithoutFeedback", () => {
      expect(wrapper.find(TouchableWithoutFeedback)).toHaveLength(1);
    });
    it("TouchableWithoutFeedback onPress", () => {
      const btn = wrapper.find(TouchableWithoutFeedback);
      btn.simulate("press");
      expect(onSelect).toHaveBeenCalled();
    });
    it("check if TouchableWithoutFeedback disabled", () => {
      expect(wrapper.find(TouchableWithoutFeedback).prop("disabled")).toEqual(
        mockProps.disabled,
      );
    });
  });

  describe("Test children", () => {
    it("renders properly Text", () => {
      expect(wrapper.find(Text)).toHaveLength(1);
    });

    it("check mock text into Text", () => {
      expect(wrapper.find(Text).props().children).toEqual(mockText);
    });
  });

  describe("Test selected item", () => {
    it("check if RadioButton selected", () => {
      expect(wrapper.find(SelectedRadio)).toHaveLength(1);
    });
  });
});
