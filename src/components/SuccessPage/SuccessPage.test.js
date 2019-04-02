import React from "react";
import {shallow} from "enzyme";
import {CenterIconImage} from "../common/images";
import {SubTitle, PageTitle, TextParagraph} from "../common/layout";
import Button from "../Button";
import {SuccessPage} from "./SuccessPage";
import {extend} from "underscore";
import theme from "../../constants/theme";

const defaultProps = {
  translations: {
    title: "title",
    button: "button",
    body: "body text",
    bodyFragment: "... following text",
  },
  subTitle: {text: "11 Valencia House, London, E20 1EW"},
  go: jest.fn(),
  next: "next",
  image: "image",
  globaltheme: "light",
  theme,
  clearProgress: () => {},
  hideTopbar: () => {},
  showTopbar: () => {},
  body: {
    textFragment: "Body fragment",
  },
};

describe("SuccessPage", () => {
  it("clears progress and hides topbar on mount", () => {
    const clearProgress = jest.fn();
    const hideTopbar = jest.fn();
    getComponent({
      clearProgress,
      hideTopbar,
    });
    expect(clearProgress).toHaveBeenCalled();
    expect(hideTopbar).toHaveBeenCalled();
  });

  it("shows topbar on unmount", () => {
    const showTopbar = jest.fn();
    const component = getComponent({showTopbar});
    expect(showTopbar).not.toHaveBeenCalled();
    component.unmount();
    expect(showTopbar).toHaveBeenCalled();
  });

  it("it displays the title", () => {
    const component = getComponent();
    expect(component.find(PageTitle)).toHaveProp(
      "children",
      defaultProps.translations.title,
    );
  });

  it("it displays the Subtitle", () => {
    const component = getComponent();
    expect(component.find(SubTitle)).toHaveProp(
      "children",
      defaultProps.subTitle.text,
    );
  });

  it("it displays the info paragraph", () => {
    const component = getComponent();

    expect(component.find(TextParagraph).props().children).toBe(
      `${defaultProps.translations.body} ${defaultProps.body.textFragment} ${
        defaultProps.translations.bodyFragment
      }`,
    );
  });

  it("it displays the image", () => {
    const component = getComponent();
    expect(component.find(CenterIconImage)).toHaveProp(
      "source",
      defaultProps.image,
    );
  });

  it("displays correct button text", () => {
    const component = getComponent();
    expect(component.find(Button)).toHaveProp(
      "middle",
      defaultProps.translations.button,
    );
  });

  it("calls _go on button click", () => {
    const component = getComponent();
    component.find(Button).simulate("click");
    expect(defaultProps.go).toHaveBeenCalledWith(defaultProps.next);
  });

  it("matches snapshot", () => {
    const component = getComponent();

    expect(component).toMatchSnapshot();
  });

  const getComponent = props => {
    const parsedProps = extend(
      {
        ...defaultProps,
      },
      props,
    );

    return shallow(<SuccessPage {...parsedProps} />);
  };
});
