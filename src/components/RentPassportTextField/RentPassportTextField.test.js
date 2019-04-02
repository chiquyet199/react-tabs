import {Platform} from "react-native";
import React from "react";
import {shallow} from "enzyme";

import configureStore from "redux-mock-store";
import Translations from "../../utils/locales/en-US";
import RentPassportTextField, {PageHeader} from "./RentPassportTextField";

const mockProps = {
  title: Translations.what_you_do,
  value: ["Employed", "Employed", "Employed"],
  width: 50,
  fontStyle: "none",
  fontSize: 18,
  align: "right",
  error: true,
};
const value = "n/a";
const testOutputString = mockProps.value.join("\n");
const mockStore = configureStore(mockProps);
const textFieldComp = <RentPassportTextField {...mockProps} />;
const wrapper = shallow(textFieldComp, {
  context: {store: mockStore(mockProps)},
});

const mockPropsValues = [
  ["Employed", "Employed", "Employed"],
  ["Employed", "Employed", "Employed", "Employed", "Employed"],
  "          ",
  "",
];

const expectedValues = [
  mockPropsValues[0].join("\n"),
  mockPropsValues[1].join("\n"),
  "",
  "",
];

describe("RentPassportTextField component", () => {
  it("renders properly - " + Platform.OS, () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("check if called function joinN", () => {
    const spy = jest.spyOn(wrapper.instance(), "joinN");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledWith(mockProps.value);
  });

  it("check RentPassportTextField with default value", () => {
    const wrapperNA = shallow(<RentPassportTextField {...mockProps} />);
    expect(wrapperNA.find(PageHeader).props().children).toEqual(
      testOutputString,
    );
  });

  it("check RentPassportTextField with n/a value", () => {
    mockProps.value = value;
    const wrapperNA = shallow(<RentPassportTextField {...mockProps} />);
    expect(wrapperNA.find(PageHeader).props().children).toEqual(value);
  });

  it("Check if in PageHeader has a array", () => {
    mockPropsValues.forEach((item, index) => {
      mockProps.value = item;
      const wrapperNA = shallow(<RentPassportTextField {...mockProps} />);
      expect(wrapperNA.find(PageHeader).props().children).toEqual(
        expectedValues[index],
      );
    });
  });
});
