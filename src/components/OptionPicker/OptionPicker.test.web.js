import React from "react";
import {shallow} from "enzyme";
import Picker from "../Picker";
import {Platform} from "react-native";
import renderer from "react-test-renderer";
import OptionPicker from "./";
import {defaultValues} from "./defaultValues";

const type = "genders";
const onChange = jest.fn();
const optionComp = (
  <OptionPicker options={defaultValues} type={type} onChange={onChange} />
);
const wrapper = shallow(optionComp);

describe("OptionPicker", () => {
  it("renders proper snapshot - " + Platform.OS, () => {
    const tree = renderer.create(optionComp);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("has passed props", () => {
    const valueProp = wrapper.find(Picker).props().type;
    expect(valueProp).toEqual(type);
    const onValueChangeProp = wrapper.find(Picker).props().onChange;
    expect(onValueChangeProp).toBeInstanceOf(Function);
  });
  it("calls onChange function when clicked", () => {
    const options = defaultValues[type];
    const optPicker = wrapper.find(Picker);
    optPicker.props().onChange(options[1].label); // trigger
    expect(onChange).toBeCalledWith(options[1].label);
  });
});
