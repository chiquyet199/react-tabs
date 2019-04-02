import React from "react";
import {shallow} from "enzyme";
import RentPassportList from "./";
import RentPassportSection from "../RentPassportSection";

describe("RentPassportList", () => {
  describe("List", () => {
    it("matches snapshot", () => {
      const wrapper = shallow(
        <RentPassportList data={sharedItem} {...mockProps()} />,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("renders RentPasportSection", () => {
      const wrapper = shallow(
        <RentPassportList data={sharedItem} {...mockProps()} />,
      );
      const section = wrapper.find(RentPassportSection);
      expect(section).toExist();
    });
  });
});

const sharedItem = [
  {
    id: 777,
    name: "Jonathan Beaumont",
    status: "Fully referenced",
  },
];

const mockProps = () => {
  return {
    title: "test",
    addPassportsToShare: () => {},
    selectedPassport: "shared",
    id: "RentPassportList",
    translations: {
      shared: "test",
      pending: "test",
    },
    theme: {textColor: "#fff"},
  };
};
