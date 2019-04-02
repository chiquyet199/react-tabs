import React from "react";
import {Platform, Text, View} from "react-native";
import {shallow} from "enzyme";
import {AccordionWithCount} from "./AccordionWithCount";

describe("AccordionWithCount", () => {
  it(`matches snapshot on ${Platform.OS}`, () => {
    expect(getComponent()).toMatchSnapshot();
  });

  const getComponent = props => {
    const parsedProps = {
      children: (
        <View>
          <Text>Lorem ipsum</Text>
        </View>
      ),
      headerIconName: "rentpassport",
      headerCount: 99,
      title: "title",
      ...props,
    };

    return shallow(<AccordionWithCount {...parsedProps} />);
  };
});
