import React from "react";
import {View, Text} from "react-native";
import {shallow} from "enzyme";
import {extend} from "underscore";
import {NativeCarousel} from "./index";
import {WebCarousel} from "./index.web";
import {Container} from "./Carousel.style";
import {isNative} from "../../utils/common";
import ReactNativeSnapCarousel from "react-native-snap-carousel";

describe("Carousel - page tests", () => {
  it("matches snapshot", () => {
    const comp = isNative ? getNativeComponent() : getWebComponent();
    expect(comp).toMatchSnapshot();
  });

  it("renders with fullWidth prop ", () => {
    const screenWidth = 1000;
    if (isNative) {
      const comp = getNativeComponent({
        fullWidth: true,
        screenWidth,
      });
      expect(comp.find(Container).prop("width")).toBe("100%");
      expect(comp.find(ReactNativeSnapCarousel)).toHaveProp(
        "sliderWidth",
        screenWidth,
      );
    } else {
      const comp = getWebComponent({
        fullWidth: true,
        screenWidth,
      });
      expect(comp.find(Container).prop("width")).toBe("100%");
    }
  });

  const getWebComponent = props => {
    const parsedProps = extend(getWebMockProps(), props);

    return shallow(<WebCarousel {...parsedProps} />);
  };

  const getNativeComponent = props => {
    const parsedProps = extend(getNativeMockProps(), props);

    return shallow(<NativeCarousel {...parsedProps} />);
  };

  const getBaseProps = () => ({
    slides: [
      {
        title: "title1",
        thumbnail: "test.jpg",
        text: "text text",
        node: (
          <View>
            <Text>Lorem</Text>
            <Text>ipsum</Text>
          </View>
        ),
      },
      {
        title: "title2",
        thumbnail: "test2.jpg",
        text: "text text",
        node: <Text>Lorem ipsum</Text>,
      },
    ],
    dots: "light",
    theme: {colors: {white: "#fff", canopySteel: "#888"}},
  });

  const getNativeMockProps = () => {
    return extend(getBaseProps(), {sliderWidth: 500, itemWidth: 500});
  };

  const getWebMockProps = () => {
    return extend(getBaseProps(), {wrapAround: true});
  };
});
