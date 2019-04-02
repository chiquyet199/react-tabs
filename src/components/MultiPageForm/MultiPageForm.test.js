import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";
import {MultiPageForm} from "./";
import {extend} from "underscore";
import FormPage from "../FormPage";
import {isRequired} from "../../utils/validators/common";

describe("MultiPageForm", () => {
  it("MultiPageForm snapshot test on - " + Platform.OS, () => {
    expect(
      getComponent({
        schema: getMockSchema({
          properties: {
            email: {
              type: "string",
              title: "Test",
              validations: [isRequired],
            },
          },
        }),
      }),
    ).toMatchSnapshot();
  });

  it("redirects to form start page if stage 'prev' same as stage name and no DynamicForm is present", () => {
    const goTo = jest.fn();
    getComponent({
      goTo,
      schema: getMockSchema(),
    });
    expect(goTo).toHaveBeenCalledWith("/base/test");
  });

  it("does not redirects to form start page if stage 'prev' differs from stage name and if DynamicForm is present", () => {
    const goTo = jest.fn();
    const form = {DynamicForm: {}};
    const schema = getMockSchema();
    schema.test.prev = "testNew";
    getComponent({
      goTo,
      form,
      schema,
    });
    expect(goTo).not.toHaveBeenCalled();
  });

  it("calls revalidate if partial form values and Dynamic form values doesn't match", async () => {
    const goTo = jest.fn();
    const form = {};
    const partialForm = {values: {test2: "2"}};
    const schema = getMockSchema();

    await getComponent({
      goTo,
      form,
      partialForm,
      schema,
    });
    await expect(goTo).toHaveBeenCalled();
  });

  it("shows expected text for page title", () => {
    const pageTitle = "pageTitle";
    const showTopbarCenterText = jest.fn();
    const schema = getMockSchema();
    schema.test.pageTitle = pageTitle;
    getComponent({
      showTopbarCenterText,
      schema,
    });
    expect(showTopbarCenterText).toHaveBeenCalledWith(pageTitle);
  });

  it("Shows topbar button on mount with proper props", async () => {
    const schema = getMockSchema();
    schema.test.skippable = true;
    schema.test.next = "/loc";
    const showTopbarButton = jest.fn();
    const updateTopbarButton = jest.fn();
    const redirectAction = () => getMockProps().goTo(schema.test.next);
    await getComponent({schema, showTopbarButton, updateTopbarButton});
    await expect(showTopbarButton).toHaveBeenCalled();
    await expect(JSON.stringify(updateTopbarButton.mock.calls[0])).toEqual(
      JSON.stringify([
        true,
        getMockProps().skipText,
        redirectAction,
        "transparent_green",
        null,
      ]),
    );
  });

  it("updates progress as expected", () => {
    const updateProgress = jest.fn();
    const schema = getMockSchema();
    const {progress} = schema.test;
    getComponent({
      updateProgress,
      schema,
    });
    expect(updateProgress).toHaveBeenCalledWith(progress);
  });

  it("moves to next page", () => {
    const next = jest.fn();
    const nextPage = "/here/is/another/page";
    const schema = getMockSchema();
    schema.test.next = nextPage;
    const component = getComponent({
      next,
      schema,
    });
    component.find(FormPage).prop("onSubmit")();
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({nextLoc: nextPage}),
    );
  });

  it("calls showTopbarCenterText when the component mounts", () => {
    const showTopbarCenterText = jest.fn();
    getComponent({showTopbarCenterText});
    expect(showTopbarCenterText).toHaveBeenCalled();
  });

  it("calls updateProgress when the component mounts", () => {
    const updateProgress = jest.fn();
    getComponent({updateProgress});
    expect(updateProgress).toHaveBeenCalled();
  });

  it("hides topbar center text on unmount", () => {
    const hideTopbarCenterText = jest.fn();
    const component = getComponent({hideTopbarCenterText});
    expect(hideTopbarCenterText).not.toHaveBeenCalled();
    component.unmount();
    expect(hideTopbarCenterText).toHaveBeenCalled();
  });

  it("clears progress on unmount", () => {
    const clearProgress = jest.fn();
    const component = getComponent({clearProgress});
    expect(clearProgress).not.toHaveBeenCalled();
    component.unmount();
    expect(clearProgress).toHaveBeenCalled();
  });

  it("Hide topbar button and reset it if schema is skippable", async () => {
    const schema = getMockSchema();
    schema.test.skippable = true;
    const hideTopbarButton = jest.fn();
    const updateTopbarButton = jest.fn();
    const component = getComponent({
      schema,
      hideTopbarButton,
      updateTopbarButton,
    });
    await component.unmount();
    await expect(hideTopbarButton).toHaveBeenCalled();
    await expect(updateTopbarButton).toHaveBeenCalledWith(
      false,
      "",
      undefined,
      undefined,
      null,
    );
  });

  describe("toggleSkipButton", () => {
    it("calls showTopbarButton", () => {
      const showTopbarButton = jest.fn();
      getComponentWithSkippableSchema({showTopbarButton});
      expect(showTopbarButton).toHaveBeenCalled();
    });

    it("calls updateTopbarButton with expected arguments", () => {
      const props = {
        updateTopbarButton: jest.fn(),
        skipText: "skipText",
        globaltheme: "dark",
      };
      getComponentWithSkippableSchema(props);
      expect(props.updateTopbarButton).toHaveBeenCalledWith(
        true,
        props.skipText,
        expect.any(Function),
        "transparent_white",
        null,
      );
    });

    it("calls updateTopbarButton with btnType of 'transparent_green' when globaltheme isn't 'dark'", () => {
      const globaltheme = "light";
      const updateTopbarButton = jest.fn();
      getComponentWithSkippableSchema({globaltheme, updateTopbarButton});
      expect(updateTopbarButton).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.any(String),
        expect.any(Function),
        "transparent_green",
        null,
      );
    });

    it("passes redirectAction to updateTopbarButton which, when called, calls go passing schema.next", () => {
      const next = "/a/random/path";
      const goTo = jest.fn();
      const updateTopbarButton = jest.fn();
      getComponent({
        schema: getMockSchema({skippable: true, next}),
        updateTopbarButton,
        goTo,
      });
      const redirectAction = updateTopbarButton.mock.calls[0][2];
      redirectAction();
      expect(goTo).toHaveBeenCalledWith(next);
    });

    describe("toggle skip button after props update", () => {
      it("calls showTopbarButton after props update", () => {
        const showTopbarButton = jest.fn();
        const component = getComponentWithTwoStageSchema({showTopbarButton});
        showTopbarButton.mockClear();
        component.setProps({match: {params: {stage: "test1"}}});
        expect(showTopbarButton).toHaveBeenCalled();
      });

      it("calls updateTopbarButton after props update with expected arguments", () => {
        const props = {
          updateTopbarButton: jest.fn(),
          skipText: "skipText",
          globaltheme: "dark",
        };
        const component = getComponentWithTwoStageSchema(props);
        props.updateTopbarButton.mockClear();
        component.setProps({match: {params: {stage: "test1"}}});
        expect(props.updateTopbarButton).toHaveBeenCalledWith(
          true,
          props.skipText,
          expect.any(Function),
          "transparent_white",
          null,
        );
      });

      it("calls updateTopbarButton after props update with btnType of 'transparent_green' when globaltheme isn't 'dark'", () => {
        const globaltheme = "light";
        const updateTopbarButton = jest.fn();
        const component = getComponentWithTwoStageSchema({
          globaltheme,
          updateTopbarButton,
        });
        updateTopbarButton.mockClear();
        component.setProps({match: {params: {stage: "test1"}}});
        expect(updateTopbarButton).toHaveBeenCalledWith(
          expect.any(Boolean),
          expect.any(String),
          expect.any(Function),
          "transparent_green",
          null,
        );
      });

      it("passes redirectAction to updateTopbarButton after props update which, when called, calls go passing schema.next", () => {
        const next = "/a/random/path";
        const goTo = jest.fn();
        const updateTopbarButton = jest.fn();
        const component = getComponent({
          schema: getTwoStageSchema({skippable: true, next}),
          updateTopbarButton,
          goTo,
        });
        updateTopbarButton.mockClear();
        component.setProps({match: {params: {stage: "test1"}}});
        const redirectAction = updateTopbarButton.mock.calls[0][2];
        redirectAction(true);
        expect(goTo).toHaveBeenCalledWith(next);
      });

      it("hides skip button if next stage isn't skippable", () => {
        const hideTopbarButton = jest.fn();
        const component = getComponent({
          schema: getTwoStageSchema({skippable: false}),
          hideTopbarButton,
        });
        hideTopbarButton.mockClear();
        component.setProps({match: {params: {stage: "test1"}}});
        expect(hideTopbarButton).toHaveBeenCalled();
      });

      it("resets top bar button if next stage isn't skippable", () => {
        const updateTopbarButton = jest.fn();
        const component = getComponent({
          schema: getTwoStageSchema({skippable: false}),
          updateTopbarButton,
        });
        updateTopbarButton.mockClear();
        component.setProps({match: {params: {stage: "test1"}}});
        expect(updateTopbarButton).toHaveBeenCalledWith(
          false,
          "",
          undefined,
          undefined,
          null,
        );
      });
    });

    describe("no topbar button interaction by default", () => {
      it("doesn't call showTopbarButton", () => {
        const showTopbarButton = jest.fn();
        getComponent({showTopbarButton});
        expect(showTopbarButton).not.toHaveBeenCalled();
      });

      it("doesn't call updateTopbarButton", () => {
        const updateTopbarButton = jest.fn();
        getComponent({updateTopbarButton});
        expect(updateTopbarButton).not.toHaveBeenCalled();
      });
    });

    describe("updates theme", () => {
      it("updates theme on mount", () => {
        const globaltheme = "light";
        const pagetheme = "dark";
        const updateTheme = jest.fn();
        getComponent({globaltheme, pagetheme, updateTheme});
        expect(updateTheme).toHaveBeenCalledWith(pagetheme);
      });

      it("doesn't update theme on mount if it's the same as the globaltheme", () => {
        const globaltheme = "dark";
        const pagetheme = "dark";
        const updateTheme = jest.fn();
        getComponent({globaltheme, pagetheme, updateTheme});
        expect(updateTheme).not.toHaveBeenCalledWith(pagetheme);
      });

      it("doesn't update theme on mount if pagetheme isn't specified", () => {
        const globaltheme = "dark";
        const updateTheme = jest.fn();
        getComponent({globaltheme, updateTheme});
        expect(updateTheme).not.toHaveBeenCalled();
      });

      it("switches theme back on unmount", () => {
        const globaltheme = "light";
        const pagetheme = "dark";
        const updateTheme = jest.fn();
        const component = getComponent({globaltheme, pagetheme, updateTheme});
        component.setProps({globaltheme: pagetheme}); // mimic the updating of the global theme...
        updateTheme.mockClear();
        component.unmount();
        expect(updateTheme).toHaveBeenCalledWith(globaltheme);
      });

      it("doesn't switch theme back on unmount if theme wasn't changed", () => {
        const globaltheme = "light";
        const updateTheme = jest.fn();
        const component = getComponent({globaltheme, updateTheme});
        component.unmount();
        expect(updateTheme).not.toHaveBeenCalled();
      });
    });

    const getComponentWithSkippableSchema = props => {
      return getComponent(
        extend({schema: getMockSchema({skippable: true})}, props),
      );
    };

    const getTwoStageSchema = (secondStage = {skippable: true}) =>
      extend(getMockSchema(), {
        test1: getMockSchema(secondStage).test,
      });

    const getComponentWithTwoStageSchema = props => {
      const schema = getTwoStageSchema();

      return getComponent(extend({schema}, props));
    };
  });

  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<MultiPageForm {...parsedProps} />);
  };

  const getMockProps = () => ({
    goTo: () => {},
    next: () => {},
    updateProgress: () => {},
    clearProgress: () => {},
    showTopbarCenterText: () => {},
    hideTopbarCenterText: () => {},
    updateTopbarButton: () => {},
    hideTopbarButton: () => {},
    showTopbarButton: () => {},
    updateTheme: () => {},
    globaltheme: "light",
    schema: getMockSchema(),
    match: {params: {stage: "test"}},
    location: {pathname: "base/test"},
    form: {},
    partialForm: {},
    skipText: "Skip",
  });

  const getMockSchema = schema => ({
    test: extend(
      {
        pageTitle: "Test",
        progress: 50,
        prev: "test",
        next: "test1",
        type: "object",
        title: "test",
        header: "Test header",
        info: "Test info",
        skippable: false,
        properties: {
          email: {
            type: "string",
            title: "Test",
          },
        },
      },
      schema,
    ),
  });
});
