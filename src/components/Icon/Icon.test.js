import React from "react";
// import renderer from 'react-test-renderer';
// import { Platform } from 'react-native';
import {shallow} from "enzyme";
import Icon from "./";

const iconComp = <Icon name="menu" size={30} color="red" />;

describe("Icon", () => {
  //  Snapshot failing tester
  // it('renders properly - ' + Platform.OS, () => {
  //   const tree = renderer.create(iconComp);
  //   expect(tree.toJSON()).toMatchSnapshot();
  // });
  it("created according to passed props", () => {
    const wrapper = shallow(iconComp);
    expect(wrapper.prop("style")).toEqual([
      {fontSize: 30, color: "red"},
      undefined,
      {
        fontFamily: "fontello",
        fontWeight: "normal",
        fontStyle: "normal",
      },
    ]);
  });
});
