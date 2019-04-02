import React from "react";
import {shallow} from "enzyme";
import Dropzone from "react-dropzone";
import {MAX_DOCUMENT_SIZE} from "../../constants/sizes";
import WebUpload, {BtnContainer} from "./WebUpload";
import {BtnText, ButtonIcon} from "../../components/Button/Button";

const text = "Upload button";
const btnType = "secondary";
const btnIconName = "share";

describe("WebUpload", () => {
  let wrapper;
  beforeEach(() => {
    const mockFunc = jest.fn();
    const changeMockFunc = jest.fn();
    wrapper = shallow(
      <WebUpload
        btnText={text}
        btnType={btnType}
        getFile={mockFunc}
        btnIcon={btnIconName}
        maxSize={MAX_DOCUMENT_SIZE.bytes}
        onChange={changeMockFunc}
      />,
    );
  });
  describe("<WebUpload>", () => {
    describe("Renders with text", () => {
      it("renders Dropzone with Max Size", () => {
        const {bytes} = MAX_DOCUMENT_SIZE;
        expect(wrapper.find(Dropzone).props().maxSize).toEqual(bytes);
      });
    });
  });

  describe("Render check", () => {
    it("renders properly ButtonContainer", () => {
      expect(wrapper.find(BtnContainer)).toHaveLength(1);
    });
    it("renders properly ButtonContainer get type", () => {
      expect(wrapper.find(BtnContainer).props().type).toEqual(btnType);
    });
    it("renders properly BtnText", () => {
      expect(wrapper.find(BtnText)).toHaveLength(1);
    });
    it("renders properly BtnText get type", () => {
      expect(wrapper.find(BtnText).props().type).toEqual(btnType);
    });
    it("renders properly BtnText get text", () => {
      expect(wrapper.find(BtnText).props().children).toEqual(text);
    });
    it("renders properly ButtonIcon get type", () => {
      expect(wrapper.find(ButtonIcon).props().type).toEqual(btnType);
    });
    it("renders properly ButtonIcon get name", () => {
      expect(wrapper.find(ButtonIcon).props().name).toEqual(btnIconName);
    });
  });

  describe("functionality", () => {
    it("trigger onClick callback", () => {
      const mockFunc = jest.fn();
      const tree = shallow(<WebUpload btnText={text} onChange={mockFunc} />);
      const dropzone = tree.find(Dropzone);
      dropzone.simulate("change");
      expect(mockFunc).toHaveBeenCalled();
    });
  });
});
