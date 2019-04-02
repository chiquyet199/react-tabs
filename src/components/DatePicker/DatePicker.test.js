import React from "react";
import {shallow} from "enzyme";
import {DatePicker} from "./DatePicker.web";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {initialState} from "../../__mocks__/initialState";
import configureStore from "redux-mock-store";
import MomentLocaleUtils from "react-day-picker/moment";

const mockProps = {
  borderColor: "#ffffff",
  disableOnClickOutside: jest.fn(),
  enableOnClickOutside: jest.fn(),
  date: "",
  children: undefined,
  errorText: false,
  eventTypes: ["mousedown", "touchstart"],
  inputProps: {name: "birthday"},
  label: undefined,
  onChange: jest.fn(),
  onChangeText: jest.fn(),
  outsideClickIgnoreClass: "ignore-react-onclickoutside",
  preventDefault: false,
  stopPropagation: false,
  textColor: "#ffffff",
  value: "",
  style: [132, undefined],
};

const mockStore = configureStore(mockProps);

describe("<DatePicker />", () => {
  const wrapper = shallow(<DatePicker {...mockProps} />, {
    context: {store: mockStore(initialState)},
  });

  it("renders `DayPickerInput` component", () => {
    expect(wrapper.find(DayPickerInput)).toHaveLength(1);
  });

  it("has passed `showOverlay` prop", () => {
    const valueProp = wrapper.find(DayPickerInput).props().showOverlay;
    expect(valueProp).toBe(true);
  });

  it("always renders a `DayPickerInput` with a ref", () => {
    expect(wrapper.find(DayPickerInput)).toHaveLength(1);
    expect(wrapper.instance().setDayPickerRef).toBeTruthy();
  });
});

describe("DatePicker loads correct range of years", () => {
  it("renders `DayPickerInput` with 1900 as start year by default", () => {
    const startYear = 1900;

    const wrapper = shallow(<DatePicker {...mockProps} />, {
      context: {store: mockStore(initialState)},
    });
    const {captionElement} = wrapper
      .find(DayPickerInput)
      .prop("dayPickerProps");
    const yearMonthForm = shallow(
      captionElement({date: new Date(), localeUtils: MomentLocaleUtils}),
    );
    const yearSelect = yearMonthForm.prop("children")[1]; // in a form, [0] is month, [1] is year
    const yearOption = shallow(yearSelect)
      .find("select")
      .prop("children")[0];
    const optionValue = shallow(yearOption).prop("value");
    expect(optionValue).toEqual(startYear);
  });

  it("renders `DayPickerInput` with year list starting from the earliestYear prop", () => {
    const startYear = 1926;
    const wrapper = shallow(
      <DatePicker {...mockProps} earliestYear={startYear} />,
      {
        context: {store: mockStore(initialState)},
      },
    );
    const {captionElement} = wrapper
      .find(DayPickerInput)
      .prop("dayPickerProps");
    const yearMonthForm = shallow(
      captionElement({date: new Date(), localeUtils: MomentLocaleUtils}),
    );
    const yearSelect = yearMonthForm.prop("children")[1];
    const yearOption = shallow(yearSelect)
      .find("select")
      .prop("children")[0];
    const optionValue = shallow(yearOption).prop("value");
    expect(optionValue).toEqual(startYear);
  });
});
