import React from "react";
import {shallow} from "enzyme";
import InputFieldComponent from "./inputField";
import configureStore from "redux-mock-store";
import {initialState} from "../../__mocks__/initialState";
import {extend} from "underscore";

const getMockProps = () => ({
  onChangeText: jest.fn(),
  showPassword: jest.fn(),
  label: "label",
  password: false,
  shownPassword: false,
  errorText: "",
  defaultValue: "",
  textColor: "#6b7c93",
  tintColor: "#6b7c93",
  keyboardType: null,
  multiline: false,
  autoCapitalize: "sentences",
  prefix: "",
  theme: {
    colors: {
      alertRed: "red",
    },
  },
});
const mockStore = configureStore(getMockProps());

const getComponent = props => {
  const parsedProps = extend(getMockProps(), props);

  return shallow(<InputFieldComponent {...parsedProps} />, {
    context: {store: mockStore(initialState)},
  });
};

describe("<InputField/> component", () => {
  it("check snapshot", () => {
    expect(getComponent()).toMatchSnapshot();
  });
});
