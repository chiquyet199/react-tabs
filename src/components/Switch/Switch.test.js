import React from "react";
import {extend} from "underscore";
import {shallow} from "enzyme";
import {Platform, Switch as SwitchNative} from "react-native";
import {Switch} from "./Switch";

const colors = {
  switchColor: "#5dc471",
  white: "#ffffff",
};
const theme = {
  light: {
    switch: {
      accentColor: colors.switchColor,
      baseColor: colors.white,
    },
  },
};

describe("Switch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders proper snapshot - " + Platform.OS, () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it("renders properly", () => {
    const wrapper = getComponent();
    expect(wrapper.find(SwitchNative)).toHaveLength(1);
  });

  it("has passed props", () => {
    const onChange = jest.fn();
    const wrapper = getComponent({onChange});
    const valueProp = wrapper.find(SwitchNative).props().value;
    const disabledProp = wrapper.find(SwitchNative).props().disabled;
    const activeTrackColor = wrapper
      .find(SwitchNative)
      .prop("activeTrackColor");
    expect(valueProp).toBe(true);
    expect(disabledProp).toBe(false);
    const onValueChangeProp = wrapper.find(SwitchNative).props().onValueChange;
    expect(onValueChangeProp).toBeInstanceOf(Function);
    expect(activeTrackColor).toEqual(colors.switchColor);
  });

  it("calls onChange function when flicked", () => {
    const onChange = jest.fn();
    const wrapper = getComponent({onChange});
    const swn = wrapper.find(SwitchNative);
    const valueProp = swn.props().value;
    swn.props().onValueChange(!valueProp); // trigger
    expect(onChange.mock.calls).toHaveLength(1);
    expect(onChange).toBeCalledWith(false);
    expect(swn.hasClass("active")).toEqual(true);
  });

  it("calls onChangeCallback function if provided with proper object key", () => {
    const fieldName = "test";
    const onChange = () => {};
    const onChangeCallback = jest.fn();
    const comp = getComponent({onChange, onChangeCallback, name: fieldName});
    const swn = comp.find(SwitchNative);
    const valueProp = swn.props().value;
    swn.props().onValueChange(!valueProp); // trigger
    expect(onChangeCallback).toBeCalledWith({[`${fieldName}`]: false});
  });

  it("check class change on false", () => {
    const tree = getComponent({on: false});
    const sw = tree.find(SwitchNative);
    expect(sw.hasClass("active")).toEqual(false);
  });

  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<Switch {...parsedProps} />);
  };
  const getMockProps = () => ({
    on: true,
    onChange: () => {},
    theme,
    globaltheme: "light",
  });
});
