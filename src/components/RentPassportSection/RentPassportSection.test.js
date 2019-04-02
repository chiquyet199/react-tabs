import React from "react";
import {shallow} from "enzyme";
import RentPassportSection from "./";
import ListItem from "../RentPassportsPreview/RentPassportsPreview";
import {Switch} from "react-native";

describe("RENT PASSPORT SECTION", () => {
  describe("List", () => {
    it("matches snapshot", () => {
      const wrapper = shallow(
        <RentPassportSection
          data={sharedItem}
          id="RentPassportList"
          addPassportsToShare={() => {}}
          {...mockProps()}
        />,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("renders the correct number of items", () => {
      const wrapper = shallow(
        <RentPassportSection
          data={sharedItem}
          id="RentPassportList"
          addPassportsToShare={() => {}}
          {...mockProps()}
        />,
      );
      expect(wrapper.find(ListItem)).toHaveLength(sharedItem.length);
    });

    it("clicking checkbox calls onChange function", () => {
      const mockFunc = jest.fn();
      const wrapper = shallow(
        <RentPassportSection
          data={sharedItem}
          id="RentPassportList"
          addPassportsToShare={mockFunc}
          {...mockProps()}
        />,
      );
      const listItem = wrapper.find(ListItem).dive();
      listItem.find(Switch).simulate("change");
      expect(mockFunc).toHaveBeenCalled();
    });

    it("renders the correct pending Passport without checkbox when selectedPassport is shared", () => {
      const wrapper = shallow(
        <RentPassportSection
          data={pendingItem}
          id="RentPassportList"
          addPassportsToShare={() => {}}
          {...mockProps()}
        />,
      );
      const listItem = wrapper.find(ListItem).dive();
      expect(listItem.contains(<Switch />)).toBe(false);
    });
  });
});

const sharedItem = [
  {
    id: 777,
    name: "Jonathan Beaumont",
    status: "Fully referenced",
    selected: false,
  },
];
const pendingItem = [
  {
    id: 134,
    name: "bob_marley66@hotmail.com",
    pending: true,
    selected: false,
  },
];

const mockProps = () => {
  return {
    title: "test",
    selectedPassport: "shared",
    id: "RentPassportList",
    translations: {
      shared: "test",
      pending: "test",
    },
    theme: {textColor: "#fff"},
  };
};
