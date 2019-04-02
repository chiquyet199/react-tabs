import React from "react";
import {Platform, Text, View} from "react-native";
import {shallow} from "enzyme";
import {AccordionOpenIndicator, ThemedIcon} from "./AccordionCommon.styles";
import AccordionWithCountTitle from "./AccordionWithCountTitle";
import AccordionWithIconTitle from "./AccordionWithIconTitle";

describe("Accordion Title Tests", () => {
  describe("AccordionOpenIndicator tests", () => {
    it(`matches snapshot on ${Platform.OS}`, () => {
      expect(getComponent()).toMatchSnapshot();
    });

    it("creates arrow pointing down when collapsed", () => {
      const component = getComponent(true);
      expect(component.find(ThemedIcon)).toHaveProp("name", "chevron-down");
    });

    it("creates arrow pointing up when not collapsed", () => {
      const component = getComponent(false);
      expect(component.find(ThemedIcon)).toHaveProp("name", "chevron-up");
    });

    const getComponent = (collapsed = true) => {
      return shallow(
        <AccordionOpenIndicator collapsed={collapsed}>
          {getSampleChildren()}
        </AccordionOpenIndicator>,
      );
    };
  });

  describe("Title snapshot tests", () => {
    it(`AccordionWithCountTitle matches snapshot on ${Platform.OS}`, () => {
      expect(
        shallow(
          <AccordionWithCountTitle
            headerIconName="rentpassport"
            headerCount={99}
            title="title"
          >
            {getSampleChildren()}
          </AccordionWithCountTitle>,
        ),
      ).toMatchSnapshot();
    });

    it(`AccordionWithIconTitle matches snapshot on ${Platform.OS}`, () => {
      expect(
        shallow(
          <AccordionWithIconTitle
            headerIconName="group"
            title="title"
            subTitle="subTitle"
          >
            {getSampleChildren()}
          </AccordionWithIconTitle>,
        ),
      ).toMatchSnapshot();
    });
  });

  const getSampleChildren = () => (
    <View>
      <Text>Lorem ipsum</Text>
    </View>
  );
});
