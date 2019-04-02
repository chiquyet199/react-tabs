import React from "react";
import {View} from "react-native";
import {shallow} from "enzyme";
import {SimpleModal} from "./";
import {
  ModalContainer,
  ModalTitle,
  ModalTextParagraph,
  ModalSubTitle,
} from "./Modal";

import themes from "../../constants/theme";
const themeProps = {theme: themes.selva, globaltheme: "light"};

describe("<Modal />", () => {
  describe("Opens and Closes", () => {
    it("renders Modal when open is true", () => {
      const tree = shallow(<SimpleModal openModal {...themeProps} />);

      expect(tree.find(ModalContainer)).toExist();
    });

    it("does not render when open is falsey", () => {
      const tree = shallow(<SimpleModal {...themeProps} />);

      expect(tree.find(ModalContainer)).not.toExist();
    });
  });

  describe("Title", () => {
    it("display when present", () => {
      const modalContent = {title: "testTitle"};
      const tree = shallow(
        <SimpleModal modalContent={modalContent} openModal {...themeProps} />,
      );

      expect(tree.find(ModalTitle)).toExist();
    });
    it("does not display when not present", () => {
      const tree = shallow(
        <SimpleModal modalContent={{}} openModal {...themeProps} />,
      );

      expect(tree.find(ModalTitle)).not.toExist();
    });
  });

  describe("ModalSubTitle", () => {
    it("display when present", () => {
      const modalContent = {subTitle: "testTitle"};
      const tree = shallow(
        <SimpleModal modalContent={modalContent} openModal {...themeProps} />,
      );

      expect(tree.find(ModalSubTitle)).toExist();
    });
    it("does not display when not present", () => {
      const tree = shallow(
        <SimpleModal modalContent={{}} openModal {...themeProps} />,
      );

      expect(tree.find(ModalSubTitle)).not.toExist();
    });
  });

  describe("Children", () => {
    it("display text when has text key", () => {
      const modalContent = {text: "test"};
      const tree = shallow(
        <SimpleModal modalContent={modalContent} openModal {...themeProps} />,
      );

      expect(tree.find(ModalTextParagraph)).toExist();
    });
    it("does not display text when not present", () => {
      const tree = shallow(
        <SimpleModal modalContent={{}} openModal {...themeProps} />,
      );

      expect(tree.find(ModalTextParagraph)).not.toExist();
    });
    it("displays children when passed children", () => {
      const tree = shallow(
        <SimpleModal modalContent={{}} openModal {...themeProps}>
          <View />
        </SimpleModal>,
      );
      expect(tree.find(View)).toExist();
    });
  });
});
