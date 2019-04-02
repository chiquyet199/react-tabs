import React from "react";
import {shallow} from "enzyme";
import {
  PageContainer,
  PageTitle,
  TextParagraph,
} from "../../components/common/layout";
import {CrainPage, PageScrollView, MyButtonBar} from "./CrainPage";
import Button from "../../components/Button";
import locale from "../../utils/locales/en-US";

const baseRoute = "/rent-passport";
const testLoc = "/generating-rent-passport";

describe("CrainPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CrainPage {...mockProps} />);
  });

  it("renders properly PageScrollView", () => {
    expect(wrapper.find(PageScrollView)).toHaveLength(1);
  });
  it("renders properly PageContainer", () => {
    expect(wrapper.find(PageContainer)).toHaveLength(1);
  });
  it("renders properly MyButtonBar", () => {
    expect(wrapper.find(MyButtonBar)).toHaveLength(1);
  });
  it("renders properly Buttons", () => {
    const buttons = wrapper.find(Button);
    buttons.forEach(button => {
      expect(button).toHaveLength(1);
    });
  });

  describe("has passed proper text props", () => {
    it("renders properly PageTitle", () => {
      expect(wrapper.find(PageTitle).props().children).toEqual(
        locale.crain.crain_header,
      );
    });
    it("renders properly TextParagraph", () => {
      const textParagraphArray = wrapper.find(TextParagraph);
      textParagraphArray.forEach(item => {
        const properString = mockTextArray.find(
          string => string === item.props().children,
        );
        if (properString && properString.length) {
          expect(item.props().children).toEqual(properString);
        }
      });
    });
  });

  describe("functionality", () => {
    it("trigger onClick callback and passes props to buttons", () => {
      const buttonsArray = wrapper.find(Button);
      buttonsArray.forEach(btn => {
        const properString = buttonsTextArray.find(
          string => string === btn.props().middle,
        );
        if (properString && properString.length) {
          expect(btn.props().middle).toEqual(properString);
        }
        btn.simulate("click");
        if (btn.props().type === "secondary") {
          expect(mockProps.goTo).toHaveBeenCalledWith(baseRoute);
        }

        if (btn.props().type === "primary") {
          expect(mockProps.generateRentPassport).toHaveBeenCalled();
          expect(mockProps.generateRentPassport).toHaveBeenCalledWith({
            values: mockProps.form.DynamicForm.values,
            nextLoc: testLoc,
          });
        }
      });
    });
  });
});

describe("CrainPage with no form", () => {
  it("trigger no submit if no Dynamic form passed", () => {
    const comp = shallow(<CrainPage {...mockPropsWithoutForm} />);
    const button = comp
      .find(Button)
      .findWhere(btn => btn.props().type === "primary");
    button.simulate("click");
    expect(mockPropsWithoutForm.generateRentPassport).not.toHaveBeenCalled();
  });
});

const mockProps = {
  goTo: jest.fn(),
  generateRentPassport: jest.fn(),
  translations: {
    crain_header: locale.crain.crain_header,
    crain_version: locale.crain.crain_version,
    crain_bold_text: locale.crain.crain_bold_text,
    crain_text: locale.crain.crain_text,
    accept: locale.accept,
    decline: locale.decline,
  },
  form: {
    DynamicForm: {
      values: {
        firstNameRentPassport: "Test name",
        lastNameRentPassport: "Test Lastname",
      },
    },
  },
};

const mockPropsWithoutForm = {
  goTo: () => {},
  generateRentPassport: jest.fn(),
  translations: {
    crain_header: locale.crain.crain_header,
    crain_version: locale.crain.crain_version,
    crain_bold_text: locale.crain.crain_bold_text,
    crain_text: locale.crain.crain_text,
    accept: locale.accept,
    decline: locale.decline,
  },
  form: {},
};

const mockTextArray = [
  `${locale.crain.crain_version}`,
  `${locale.crain.crain_bold_text}`,
  `${locale.crain.crain_text}`,
];

const buttonsTextArray = [`${locale.accept}`, `${locale.decline}`];
