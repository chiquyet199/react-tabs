import React from "react";
import {shallow} from "enzyme";
import {Collapse, CollapseContent} from "../../components/Collapse";
import {Platform, Text, View} from "react-native";
import configureStore from "redux-mock-store";
import {initialState} from "../../__mocks__/initialState";

const mockProps = {
  onToggle: jest.fn(),
  collapsed: true,
};

const mockStore = configureStore(mockProps);

describe("Collapse", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <Collapse {...mockProps}>
        <CollapseContent padding="10px 0" type="header">
          <Text>Test text header</Text>
        </CollapseContent>
        <CollapseContent padding="10px" type="body">
          <Text>Test text body</Text>
        </CollapseContent>
      </Collapse>,
      {
        context: store,
      },
    );
  });

  it("renders proper snapshot - " + Platform.OS, () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("has passed props to Collapse component", () => {
    const collapsedProp = wrapper.props().collapsed;
    expect(collapsedProp).toEqual(mockProps.collapsed);
    const onToggleProp = wrapper.props().onToggle;
    expect(onToggleProp).toBe(mockProps.onToggle);
  });

  it("calls onToggle function when clicked", () => {
    wrapper.props().onToggle(); // trigger
    expect(mockProps.onToggle).toHaveBeenCalled();
  });

  it("calls onToggle function when component mounts", () => {
    expect(mockProps.onToggle).toHaveBeenCalled();
  });

  describe("Collapse Content", () => {
    it("has onLayout function", () => {
      const views = wrapper.find(View); // trigger
      views.forEach(view => {
        expect(view.props().onLayout).toHaveLength(1);
        expect(view.prop("onLayout")).toBeInstanceOf(Function);
      });
    });
    it("renders CollapseContent", () => {
      const contents = wrapper.find(CollapseContent);
      expect(contents).toHaveLength(2);
      contents.forEach(content => {
        expect(content.find(Text)).toHaveLength(1);
        if (content.prop("type") === "header") {
          expect(content.prop("padding")).toEqual("10px 0");
          expect(content.find(Text).props().children).toEqual(
            "Test text header",
          );
        }
        if (content.prop("type") === "body") {
          expect(content.prop("padding")).toEqual("10px");
          expect(content.find(Text).props().children).toEqual("Test text body");
        }
      });
    });
  });
});
