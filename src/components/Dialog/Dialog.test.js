import React from "react";
import {shallow} from "enzyme";
import {extend} from "underscore";
import {Dialog} from "./Dialog";
import {SimpleDialog} from "./index";
import {
  DialogContainer,
  DialogButtonBar,
  DialogParagraph,
  DialogTitle,
} from "./Dialog.styles";
import Button from "../Button";
import configureStore from "redux-mock-store";
import {initialState} from "../../__mocks__/initialState";
import themes from "../../constants/theme";
const theme = themes.selva;

const mockProps = {
  globaltheme: "light",
  theme,
  title: "Title",
  paragraph: "paragraph",
  cancelButtonText: "cancelButtonText",
  onDialogCancel: jest.fn(),
  onDialogConfirm: jest.fn(),
  confirmButtonText: "confirmButtonText",
};

const mockStore = configureStore(mockProps);

describe("<SimpleDialog />", () => {
  it("SimpleDialog - renders proper snapshot", () => {
    const tree = shallow(<SimpleDialog isOpen {...mockProps} />, {
      context: {store: mockStore(initialState)},
    });
    expect(tree).toMatchSnapshot();
  });
  describe("Opens and Closes", () => {
    it("renders SimpleDialog when open is true", () => {
      const tree = shallow(<SimpleDialog isOpen {...mockProps} />);
      expect(tree.find("OnClickOutside(Dialog)")).toExist();
    });
    it("does not render when open is falsey", () => {
      const tree = shallow(<SimpleDialog isOpen={false} {...mockProps} />);
      expect(tree.find("OnClickOutside(Dialog)")).not.toExist();
    });
  });
});

describe("<Dialog />", () => {
  it("Dialog - renders proper snapshot", () => {
    const tree = shallow(<Dialog {...mockProps} />, {
      context: {store: mockStore(initialState)},
    });
    expect(tree).toMatchSnapshot();
  });
  it("renders Dialog properly", () => {
    const tree = shallow(<Dialog {...mockProps} />);
    expect(tree.find(DialogContainer)).toExist();
    expect(tree.find(DialogButtonBar)).toExist();
    expect(tree.find(DialogParagraph)).toExist();
    expect(tree.find(DialogTitle)).toExist();
    expect(tree.find(DialogParagraph).prop("children")).toEqual(
      mockProps.paragraph,
    );
    expect(tree.find(DialogTitle).prop("children")).toEqual(mockProps.title);
  });

  it("does not render DialogParagraph and DialogTitle if not passed", () => {
    const {title, paragraph, ...newProps} = mockProps;
    const tree = shallow(<Dialog {...newProps} />);
    expect(tree.find(DialogParagraph)).not.toExist();
    expect(tree.find(DialogTitle)).not.toExist();
  });

  it("renders another confirm button with confirmButtonType prop", () => {
    const newProps = extend(mockProps, {confirmButtonType: "danger"});
    const tree = shallow(<Dialog {...newProps} />);
    const button = tree
      .find(Button)
      .findWhere(btn => btn.prop("type") === "danger");
    expect(button).toExist();
  });

  it("functionality - buttons onClick", () => {
    const tree = shallow(<Dialog {...mockProps} />);
    const btns = tree.find(Button);
    expect(btns).toHaveLength(2);
    btns.forEach(btn => {
      btn.simulate("click");
      if (btn.prop("type") === "secondary") {
        expect(btn.prop("middle")).toEqual(mockProps.cancelButtonText);
        expect(mockProps.onDialogCancel).toHaveBeenCalled();
      }
      if (btn.prop("type") === "primary") {
        expect(btn.prop("middle")).toEqual(mockProps.confirmButtonText);
        expect(mockProps.onDialogConfirm).toHaveBeenCalled();
      }
    });
  });
});
