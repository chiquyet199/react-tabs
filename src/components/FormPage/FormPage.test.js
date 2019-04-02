import React from "react";
import {BaseFormPage} from "./FormPage";
import {shallow} from "enzyme";
import {
  ScrollButtonBar,
  PageContainer,
  ErrorMessage,
  ScrollContentContainer,
} from "../common/layout";
import themes from "../../constants/theme";
import {extend} from "underscore";
import {validate} from "../../utils/validators/common";
import DynamicForm from "../DynamicForm";
const layout = "hq";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {initialState} from "../../__mocks__/initialState";
import Button from "../Button";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const theme = themes.selva;
jest.mock("../../utils/validators/common");

describe("FormPage tests", () => {
  it("renders to correct snapshot", () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it("Pass initial values to Dynamic Form", () => {
    const initialValues = {info: "test"};
    const component = getComponent({initialValues});
    expect(component.find(DynamicForm).prop("initialValues")).toEqual(
      initialValues,
    );
  });

  it("Shows button bar if omitSubmit property set to false", () => {
    const component = getComponent({omitSubmit: false});
    expect(component.find(ScrollButtonBar)).toExist();
  });

  it("Hides button bar if omitSubmit property set to true", () => {
    const component = getComponent({omitSubmit: true});
    expect(component.find(ScrollButtonBar)).not.toExist();
  });

  it("Sets button type when provided in schema", () => {
    const schema = mockSchema();
    schema.buttonType = "big, red button";
    const component = getComponent({schema});
    expect(component.find(Button)).toHaveProp("type", schema.buttonType);
  });

  describe("when `layout` prop is passed", () => {
    it("applies appropriate prop to the `PageContainer`", () => {
      const component = getComponent();
      const container = component
        .find(PageContainer)
        .findWhere(node => node.prop("layout") === "hq");
      expect(container).toHaveLength(1);
    });
  });

  describe("when `size` prop is passed", () => {
    it("applies appropriate prop to the `ScrollContentContainer`", () => {
      const screenSize = "S";
      const component = getComponent({screenSize});
      const sizeProp = component.find(ScrollContentContainer).prop("size");
      expect(sizeProp).toBe(screenSize);
    });
  });

  describe("displayMultiSwitchError", () => {
    it("displays an error when `DynamicForm` encountered `branch_` error", async () => {
      validate.mockImplementation(() => {
        const branchesErrors = {
          branch_Islington_permission: "Please select at least 1",
        };

        return Promise.resolve(branchesErrors);
      });
      const component = getComponent();
      const onSubmit = component.find(DynamicForm).prop("onSubmit");
      try {
        await onSubmit(() => {}, {branch_Islington_permission: false});
      } catch (e) {
        // we're expecting a SubmissionError, we need to swallow it so the test can continue...
      } finally {
        component.update();
        expect(component.find(ErrorMessage)).toExist();
      }
    });
  });

  const getComponent = props => {
    const parsedProps = extend(
      {
        schema: mockSchema(),
        omitSubmit: false,
        globaltheme: "light",
        theme,
        translations: {
          validationErrors: {
            onlyLetters: "onlyLetters",
            required: "required",
            selectAtLeastOne: "selectAtLeastOne",
            invalidEmail: "invalidEmail",
            emailTaken: "emailTaken",
            onlyNumbers: "onlyNumbers",
            invalidNumber: "invalidNumber",
            invalidPassword: "invalidPassword",
            passwordsDontMatch: "passwordsDontMatch",
            invalidPhoneNumber: "invalidPhoneNumber",
          },
        },
      },
      props,
    );

    return shallow(<BaseFormPage {...parsedProps} />, {
      context: {store: mockStore(initialState)},
    });
  };
});

const mockSchema = () => ({
  layout,
  progress: 33,
  next: "password",
  type: "object",
  title: "about",
  header: "About you",
  info: "Test info",
  initialValues: {
    firstName: "Benedict",
    lastName: "Cumberland",
  },
  properties: {
    info: {
      type: "string",
      title: "A title",
      uiComponent: "text",
      align: "left",
    },
    firstName: {
      type: "string",
      title: "First name",
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    email: {
      type: "string",
      title: "address",
    },
    receive_emails: {
      type: "boolean",
      title: "emails",
      uiComponent: "switch",
    },
  },
  required: ["firstName", "lastName", "email"],
});
