import {Platform, Modal} from "react-native";
import React from "react";
import {shallow} from "enzyme";
import {Spinner} from "./Spinner";

import {TextContent, Container} from "./Spinner.style";
import configureStore from "redux-mock-store";
import theme, {colors} from "../../constants/theme";
import {isWeb, isNative} from "../../utils/common";
import WebSpinner from "./WebSpinner";
import NativeSpinner from "./NativeSpinner";
import {TextParagraph} from "../common/layout";

const text = "TEST";

const mockProps = {
  visible: true,
  cancelable: true,
  textContent: text,
  animation: "none",
  color: colors.white,
  size: "large",
  overlayColor: colors.semiTransparent,
  theme,
};

const mockPropsHidden = {
  visible: false,
  cancelable: false,
  textContent: text,
  animation: "none",
  color: colors.white,
  size: "large",
  overlayColor: colors.semiTransparent,
  theme,
};

const mockStore = configureStore(mockProps);

describe("Spinner component", () => {
  it("renders properly - " + Platform.OS, () => {
    const wrapper = shallow(<Spinner {...mockProps} />, {
      context: {store: mockStore(mockProps)},
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe("Props Spinner testing", () => {
    it("test visibility", async () => {
      const shallowWrapper = shallow(<Spinner {...mockPropsHidden} />).dive();
      expect(shallowWrapper.get(0)).toBeFalsy();
    });
  });

  describe("visible tree functionality", () => {
    it("check _renderDefaultContent method", () => {
      const expectedType = isWeb ? WebSpinner : NativeSpinner;
      const shallowWrapper = shallow(<Spinner {...mockProps} />);
      const type = shallowWrapper.find(expectedType);
      expect(type).toHaveLength(1);
      expect(type.props().textContent).toEqual(text);
      expect(shallowWrapper.dive().find(TextContent)).toHaveLength(1);
    });
  });

  describe("passes children to Spinner", () => {
    it("check not _renderDefaultContent Container", () => {
      const expectedType = isWeb ? WebSpinner : NativeSpinner;
      const shallowWrapper = shallow(<Spinner {...mockProps} />);
      const type = shallowWrapper.find(expectedType);
      expect(type).toHaveLength(1);
      expect(shallowWrapper.dive().find(Container)).toHaveLength(2);
    });

    it("check not _renderDefaultContent TextParagraph", () => {
      const expectedType = isWeb ? WebSpinner : NativeSpinner;
      const shallowWrapper = shallow(
        <Spinner {...mockProps}>
          <TextParagraph theme={theme} globaltheme="light">
            {text}
          </TextParagraph>
        </Spinner>,
      );
      const type = shallowWrapper.find(expectedType);
      expect(type).toHaveLength(1);
      expect(shallowWrapper.dive().find(TextParagraph)).toHaveLength(1);
      expect(
        shallowWrapper
          .dive()
          .find(TextParagraph)
          .props().children,
      ).toEqual(text);
    });
    if (isNative) {
      it("check onRequestClose", () => {
        const shallowWrapper = shallow(<Spinner {...mockProps} />).dive();
        const onClose = shallowWrapper.find(Modal).prop("onRequestClose");
        onClose();
        shallowWrapper.update();
        expect(shallowWrapper.state("visible")).toBeFalsy();
        expect(shallowWrapper.find(Modal)).toHaveLength(0);
      });
    }
  });
});
