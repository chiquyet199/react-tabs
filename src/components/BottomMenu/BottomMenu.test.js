import React from "react";
import {shallow} from "enzyme";
import {BottomMenu} from "./BottomMenu";
import {MenuButton} from "../Button";

const testMenuSchema = [
  {
    routePrefix: "/test1",
    icon: "test1",
    text: "test1",
  },
  {
    routePrefix: "/test2",
    icon: "test2",
    text: "test2",
  },
];

const mockGo = jest.fn();

const testProps = {
  items: testMenuSchema,
  go: mockGo,
};

describe("<BottomMenu />", () => {
  it("returns null when location does not match a prefix", () => {
    const wrapper = shallow(<BottomMenu {...testProps} location="" />);

    expect(wrapper.children()).toHaveLength(0);
  });
  it("renders the correct number of items", () => {
    const wrapper = shallow(<BottomMenu {...testProps} location="/test1" />);

    expect(wrapper.find(MenuButton)).toHaveLength(testMenuSchema.length);
  });
  it("sets the correct item to active based on location", () => {
    const wrapper = shallow(<BottomMenu {...testProps} location="/test1" />);

    expect(
      wrapper
        .find(MenuButton)
        .first()
        .props().type,
    ).toEqual("secondary");
  });
});
