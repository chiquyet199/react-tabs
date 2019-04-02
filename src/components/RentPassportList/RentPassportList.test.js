import React from "react";
import {shallow} from "enzyme";
import RentPassportList from "./";
import ListItem from "./RentPassportList";
import {
  RentPassportListItemIcon,
  Title,
  Info,
  StatusIcon,
  StatusText,
} from "./RentPassportList.styles";

const testListItems = [
  {
    title: "test1",
    infoText: "testInfo",
    icons: {main: "mainIcon1", complete: "tick-circle", incomplete: "error"},
    statusText: {complete: "Complete", incomplete: "Incomplete"},
  },
  {
    title: "test2",
    infoText: "testInfo2",
    icons: {main: "mainIcon2", complete: "tick-circle", incomplete: "error"},
    statusText: {complete: "Complete", incomplete: "Incomplete"},
  },
];

describe("RentPassportList", () => {
  describe("List", () => {
    it("renders the correct number of items", () => {
      const wrapper = shallow(
        <RentPassportList items={testListItems} complete={false} />,
      );
      expect(wrapper.find(ListItem)).toHaveLength(testListItems.length);
    });
  });

  describe("ListItem", () => {
    describe("Complete", () => {
      const item = testListItems[0];
      const wrapper = shallow(<ListItem item={item} complete />);
      it("passes correct props to <RentPassportListItemIcon />", () => {
        expect(wrapper.find(RentPassportListItemIcon).props()).toEqual({
          complete: true,
          source: item.icons.main,
        });
      });
      it("passes correct props to <Title/>", () => {
        expect(wrapper.find(Title).props()).toEqual({
          complete: true,
          children: item.title,
        });
      });
      it("passes correct props to <Info/>", () => {
        expect(wrapper.find(Info).props()).toEqual({
          complete: true,
          children: item.infoText,
        });
      });
      it("passes correct props to <StatusIcon/>", () => {
        expect(wrapper.find(StatusIcon).props()).toEqual({
          complete: true,
          name: item.icons.complete,
        });
      });
      it("passes correct props to <StatusText/>", () => {
        expect(wrapper.find(StatusText).props()).toEqual({
          complete: true,
          children: item.statusText.complete,
        });
      });
    });
    describe("Incomplete", () => {
      const item = testListItems[0];
      const wrapper = shallow(<ListItem item={item} complete={false} />);
      it("passes correct props to <RentPassportListItemIcon />", () => {
        expect(wrapper.find(RentPassportListItemIcon).props()).toEqual({
          complete: false,
          source: item.icons.main,
        });
      });
      it("passes correct props to <Title/>", () => {
        expect(wrapper.find(Title).props()).toEqual({
          complete: false,
          children: item.title,
        });
      });
      it("passes correct props to <Info/>", () => {
        expect(wrapper.find(Info).props()).toEqual({
          complete: false,
          children: item.infoText,
        });
      });
      it("passes correct props to <StatusIcon/>", () => {
        expect(wrapper.find(StatusIcon).props()).toEqual({
          complete: false,
          name: item.icons.incomplete,
        });
      });
      it("passes correct props to <StatusText/>", () => {
        expect(wrapper.find(StatusText).props()).toEqual({
          complete: false,
          children: item.statusText.incomplete,
        });
      });
    });
  });
});
