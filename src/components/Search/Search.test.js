import React from "react";
import {Search, ThemedIconButton} from "./Search";
import {shallow} from "enzyme";
import configureStore from "redux-mock-store";
import {initialState} from "../../__mocks__/initialState";
import {Platform} from "react-native";
import {SearchInput} from "./Search.styles";
import theme from "../../constants/theme";
import {extend} from "underscore";
import {ENTER_KEY, WAIT_INTERVAL} from "../../constants/search";

const exampleValue = "port";
jest.useFakeTimers();
const mockStore = configureStore();

describe("Search component", () => {
  it("Search snapshot test on - " + Platform.OS, () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
  describe("Search Input functionality", () => {
    it("passes the right arguments to `setFilterQuery`", async () => {
      const setFilterQuery = jest.fn();
      const component = getComponent({setFilterQuery});
      const input = component.find(SearchInput);
      const searchButton = component.find(ThemedIconButton);
      input.simulate("change", {target: {value: exampleValue}});
      searchButton.simulate("click");
      expect(setFilterQuery).toHaveBeenCalledWith(exampleValue);
    });
    describe("when onChange is called on the Search Input", () => {
      it("updates the search input value", () => {
        const component = getComponent();
        component
          .find(SearchInput)
          .simulate("change", {target: {value: exampleValue}});
        expect(component.find(SearchInput).props().value).toBe(exampleValue);
      });
      it("fires `setFilterQuery` after pending call to the trigger", () => {
        const component = getComponent();
        component
          .find(SearchInput)
          .simulate("change", {target: {value: exampleValue}});
        expect(setTimeout).toHaveBeenCalled();
        expect(setTimeout).toHaveBeenCalledWith(
          component.instance().triggerChange,
          WAIT_INTERVAL,
        );
      });
      it("calls `setFilterQuery` only once with the arguments provided by the second call", () => {
        jest.useFakeTimers();
        const setFilterQuery = jest.fn();
        const exampleValue2 = "starboard";
        const component = getComponent({setFilterQuery});
        const onChange = component.find(SearchInput).prop("onChange");
        onChange({target: {value: exampleValue2}});
        onChange({target: {value: exampleValue}});
        jest.runAllTimers();
        expect(setFilterQuery).toHaveBeenCalledTimes(1);
        expect(setFilterQuery).toHaveBeenCalledWith(exampleValue);
      });
      it("triggers search when user presses `Enter` on his keyboard", () => {
        const setFilterQuery = jest.fn();
        const component = getComponent({setFilterQuery});
        component
          .find(SearchInput)
          .simulate("change", {target: {value: exampleValue}});
        component.find(SearchInput).simulate("keyDown", {keyCode: ENTER_KEY});
        expect(setFilterQuery).toHaveBeenCalledWith(exampleValue);
      });
    });
  });
  const getComponent = props => {
    const parsedProps = extend(
      {
        placeholder: "A placeholder",
        theme,
        setFilterQuery: () => {},
      },
      props,
    );

    return shallow(<Search {...parsedProps} />, {
      context: {store: mockStore(initialState)},
    });
  };
});
