import React from "react";
import {Text, Platform} from "react-native";
import {
  IconWithContent,
  Image,
  FontIcon,
  TextContent,
  IconBasedContainer,
} from "./IconWithContent";
import Icon from "../Icon";
import {shallow} from "enzyme";
import {extend} from "underscore";

const themeProps = {theme: {}, globaltheme: "light"};
const exampleChildNode = <Text {...themeProps}>Landlords name.</Text>;

describe("Icon with content component", () => {
  test("IconWithContent snapshot test on - " + Platform.OS, () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test("passes correct props to the `IconBasedContainer`", () => {
    const component = getComponent({disabled: true, width: 777});
    expect(component.find(IconBasedContainer).prop("disabled")).toBe(true);
    expect(component.find(IconBasedContainer).prop("width")).toBe(777);
  });

  test("render an `Image` when `icon` is passed", () => {
    const component = getComponent({icon: 123});
    expect(component.find(Image)).toHaveLength(1);
    expect(component.find(Image).prop("source")).toBe(123);
  });

  test("does not render an `Image` when `icon` is not passed", () => {
    const component = getComponent({icon: null});
    expect(component.find(Image)).toHaveLength(0);
  });

  test("render an `FontIcon` when `icon` is passed", () => {
    const component = getComponent({iconName: "employment"});
    expect(component.find(FontIcon)).toHaveLength(1);
    expect(component.find(Icon).prop("name")).toBe("employment");
  });

  test("does not render an `FontIcon` when `icon` is not passed", () => {
    const component = getComponent({icon: 123, iconName: null});
    expect(component.find(FontIcon)).toHaveLength(0);
  });

  test("renders `children` when they are passed into the component", () => {
    const component = getComponent();
    expect(component.find(Text)).toHaveLength(1);
  });

  test("when `children` are not passed, render `TextContent` instead", () => {
    const component = getComponent({
      children: null,
      bold: "true",
      text: "A sample text.",
    });
    expect(component.find(Text)).toHaveLength(0);
    expect(component.find(TextContent)).toHaveLength(1);
    expect(component.find(TextContent).prop("bold")).toBe("true");
    expect(component.find(TextContent).prop("children")).toBe("A sample text.");
  });

  const mockProps = () => ({
    icon: null,
    iconSize: 32,
    iconName: null,
    text: "text",
    children: exampleChildNode,
    theme: {},
    globaltheme: "hqApp",
  });

  const getComponent = props => {
    const parsedProps = extend(mockProps(), props);

    return shallow(<IconWithContent {...parsedProps} />);
  };
});
