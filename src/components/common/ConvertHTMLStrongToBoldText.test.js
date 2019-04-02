import React from "react";
import {Text} from "react-native";
import {shallow} from "enzyme";
import ConvertHTMLStrongToText, {
  StyledView,
} from "./ConvertHTMLStrongToBoldText";

const mockHtmlStringWithoutText = "Text without strong text";

describe("ConvertHTMLStrongToText tests", () => {
  it("wraps result in StyledView", () => {
    expect(getComponent(mockHtmlStringWithoutText).find(StyledView)).toExist();
  });

  it("creates single Text element where there are no strong tags", () => {
    const wrapper = getComponent(mockHtmlStringWithoutText);
    expect(wrapper.find(Text)).toHaveProp(
      "children",
      mockHtmlStringWithoutText,
    );
  });

  it("with bold text", () => {
    const testCases = [
      {
        text: "text with a <strong>single</strong> strong tag",
        assertations: [
          {element: Text, text: "text with a "},
          {element: Text, text: "single"},
          {element: Text, text: " strong tag"},
        ],
      },
      {
        text:
          "text with <strong>two</strong> tags lorem <strong>ipsum</strong>",
        assertations: [
          {element: Text, text: "text with "},
          {element: Text, text: "two"},
          {element: Text, text: " tags lorem "},
          {element: Text, text: "ipsum"},
        ],
      },
      {
        text:
          "Lorem ipsum dolor <strong>sit amet, consectetur</strong> adipiscing <strong>elit</strong>, sed do<strong> eiusmod tempor</strong> incididunt ut labore et dolore magna aliqua.",
        assertations: [
          {element: Text, text: "Lorem ipsum dolor "},
          {element: Text, text: "sit amet, consectetur"},
          {element: Text, text: " adipiscing "},
          {element: Text, text: "elit"},
          {element: Text, text: ", sed do"},
          {element: Text, text: " eiusmod tempor"},
          {
            element: Text,
            text: " incididunt ut labore et dolore magna aliqua.",
          },
        ],
      },
    ];
    for (let x = 0; x < testCases.length; x += 1) {
      const testCase = testCases[x];
      const wrapper = getComponent(testCase.text).find(StyledView);
      expect(wrapper.children()).toHaveLength(testCase.assertations.length);
      for (let y = 0; y < wrapper.children().length; y += 1) {
        const assertation = testCase.assertations[y];
        const child = wrapper.childAt(y);
        expect(child.type()).toEqual(assertation.element);
        expect(child).toHaveProp("children", assertation.text);
      }
    }
  });

  const getComponent = text => {
    return shallow(<ConvertHTMLStrongToText htmlString={text} />);
  };
});
