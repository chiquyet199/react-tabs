import React from "react";
import {shallow} from "enzyme";
import LocalePickerWrapper from "./";
import {LocalePicker} from "./LocalePicker";
import {initialState} from "../../__mocks__/initialState";
import configureStore from "redux-mock-store";
import Button from "../../components/Button";
import Picker from "../../components/Picker";
import {Platform} from "react-native";

describe("LocalPicker", () => {
  let originalPlatform;
  beforeEach(() => {
    originalPlatform = Platform.OS;
  });

  afterEach(() => {
    Platform.OS = originalPlatform;
  });

  it("renders correctly", () => {
    const mockProps = getMockProps();
    const mockStore = configureStore(mockProps);
    const store = mockStore(initialState);
    const wrapper = shallow(<LocalePickerWrapper {...mockProps} />, {
      context: {store},
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("displays picker by default", () => {
    Platform.OS = "web";
    expect(getComponent().type()).toBe(Picker);
  });

  it("displays button by default on iOS", () => {
    Platform.OS = "ios";
    expect(getComponent().type()).toBe(Button);
  });

  it("renders Picker when button is clicked", () => {
    Platform.OS = "ios";
    const component = getComponent();
    component.prop("onClick")();
    component.update();
    expect(component.type()).toBe(Picker);
  });

  it("passes given locale to picker", () => {
    Platform.OS = "web";
    const mockProps = getMockProps();
    expect(getComponent().prop("currentValue")).toBe(mockProps.currentLocale);
  });

  it("calls set locale when picker onChange called", () => {
    Platform.OS = "web";
    const mockProps = getMockProps();
    const locale = "fr-FR";
    const onChange = getComponent(mockProps).prop("onChange");
    onChange(locale);
    expect(mockProps.setLocale).toHaveBeenCalledWith(locale);
  });

  it("closes picker when value changed and shows button again", () => {
    Platform.OS = "ios";
    const component = getComponent();
    component.prop("onClick")();
    component.update();
    component.prop("onChange")("fr-FR");
    component.update();
    expect(component.type()).toBe(Button);
  });

  const getComponent = (props = getMockProps()) => {
    return shallow(<LocalePicker {...props} />);
  };

  const getMockProps = () => ({
    currentLocale: "de-DE",
    setLocale: jest.fn(),
  });
});
