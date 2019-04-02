import React from "react";
import {Platform, Text, TouchableOpacity, View} from "react-native";
import {shallow} from "enzyme";
import Collapsible from "react-native-collapsible";
import {Accordion, CompatibleCollapsible} from "./Accordion";
import {isWeb} from "../../utils/common";

describe("Accordion test", () => {
  it(`matches snapshot on ${Platform.OS}`, () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it("passes collapsed as default to title", () => {
    const component = getComponent();
    expect(component.find(SampleTitle)).toHaveProp("collapsed", true);
  });

  it("changes collapsed to false on title after click on TouchableOpacity", () => {
    const component = getComponent();
    component.find(TouchableOpacity).simulate("press");
    expect(component.find(SampleTitle)).toHaveProp("collapsed", false);
  });

  it("passes collapsed as default to CompatibleCollapsible", () => {
    const component = getComponent();
    expect(component.find(CompatibleCollapsible)).toHaveProp("collapsed", true);
  });

  it("changes collapsed to false on CompatibleCollapsible after click on TouchableOpacity", () => {
    const component = getComponent();
    component.find(TouchableOpacity).simulate("press");
    expect(component.find(CompatibleCollapsible)).toHaveProp(
      "collapsed",
      false,
    );
  });

  describe("CompatibleCollapsible tests", () => {
    it(`CompatibleCollapsible matches snapshot on ${Platform.OS}`, () => {
      expect(getCompatibleCollapsible()).toMatchSnapshot();
    });

    it("doesn't render children on web / passes collapsed as true on native when collapsed is true", () => {
      const collapsed = true;
      const component = getCompatibleCollapsible(collapsed);
      if (isWeb) {
        expect(component.find(View).children()).not.toExist();
      } else {
        expect(component.find(Collapsible)).toHaveProp("collapsed", collapsed);
      }
    });

    const getCompatibleCollapsible = (collapsed = false) => {
      return shallow(
        <CompatibleCollapsible collapsed={collapsed}>
          <View>
            <Text>Lorem ipsum dolor sic amet</Text>
          </View>
        </CompatibleCollapsible>,
      );
    };
  });

  const getComponent = (
    props,
    children = (
      <View>
        <Text>Lorem ipsum</Text>
      </View>
    ),
  ) => {
    const parsedProps = {
      title: SampleTitle,
      props,
    };

    return shallow(<Accordion {...parsedProps}>{children}</Accordion>);
  };

  const SampleTitle = ({collapsed}) => (
    <View style={{opacity: collapsed ? 0.5 : 1}}>
      <Text>Sample title</Text>
    </View>
  );
});
