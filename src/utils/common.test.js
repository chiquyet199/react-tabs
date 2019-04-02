import {connect} from "react-redux";
import {withTheme} from "styled-components";
import styledNative from "styled-components/native";
import {
  isX,
  redirectToBaseRoute,
  sleep,
  themed,
  parseStyle,
  applyStyleObjectToStyledComponent,
} from "./common";

jest.useFakeTimers();
jest.unmock("react-redux");
const redux = require("react-redux");
redux.connect = jest.fn().mockReturnValue(jest.fn());

jest.unmock("styled-components");
const styled = require("styled-components");
styled.withTheme = jest.fn();

// Messy, but the only way I could see to mock destructured es6 imports
// from node modules

describe("Test common helper functions", () => {
  it("test sleep method", () => {
    expect.assertions(1);
    const pendingPromise = sleep(1000).then(resolved => {
      expect(resolved).toBeUndefined();
    });
    jest.runAllTimers();

    return pendingPromise;
  });
  it("test if IphoneX check method", () => {
    expect(isX).toBe(false);
  });

  describe("themed", () => {
    const testComponent = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      themed(testComponent);
    });

    it("calls connect", () => {
      expect(connect).toHaveBeenCalled();
    });
    it("calls withTheme", () => {
      expect(withTheme).toHaveBeenCalledWith(testComponent);
    });
    it("calls connect with a function that extracts and returns globaltheme key and pop", () => {
      const [func] = connect.mock.calls[0];
      const testState = {globaltheme: "globaltheme", xxx: "xxx"};
      expect(func(testState)).toEqual({globaltheme: "globaltheme"});
    });
    it("calls the curried function in connect with the result of withTheme", () => {
      expect(connect()).toHaveBeenCalledWith(withTheme(testComponent));
    });
  });

  describe("parseStyleProps", () => {
    it("parses style array to one that will work with styled components", () => {
      const testCases = [
        {
          style: {
            "padding-top": "10px",
            "margin-left": "20px",
            position: "relative",
          },
          parsedStyle:
            "padding-top: 10px;\nmargin-left: 20px;\nposition: relative",
        },
        {
          style: {
            position: "absolute",
            bottom: "0",
            width: "100%",
          },
          parsedStyle: "position: absolute;\nbottom: 0;\nwidth: 100%",
        },
      ];

      for (let x = 0; x < testCases.length; x += 1) {
        const testCase = testCases[x];
        expect(parseStyle(testCase.style)).toBe(testCase.parsedStyle);
      }
    });

    it("returns component if empty object is passed", () => {
      const SampleComponent = styledNative.View`
        margin-right: 10px;
      `;
      expect(applyStyleObjectToStyledComponent({}, SampleComponent)).toBe(
        SampleComponent,
      );
    });

    it("returns component if no styles are passed", () => {
      const SampleComponent = styledNative.View`
        margin-right: 10px;
      `;
      expect(
        applyStyleObjectToStyledComponent(undefined, SampleComponent),
      ).toBe(SampleComponent);
    });
  });

  describe("redirectToBaseRoute", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("calls goTo parent route if no Dynamic form provided", () => {
      const goTo = jest.fn();
      const location = {pathname: "/route/test"};
      redirectToBaseRoute(goTo, {}, location);
      expect(goTo).toHaveBeenCalledWith("/route");
    });

    it("returns only prefix", () => {
      const goTo = jest.fn();
      const form = {DynamicForm: {}};
      const location = {pathname: "/route/test"};
      const prefix = redirectToBaseRoute(goTo, form, location, true);
      expect(prefix).toBe("route");
    });

    it("doesn't call goTo if there is Dynamic form", () => {
      const goTo = jest.fn();
      const form = {DynamicForm: {}};
      const location = {pathname: "/route/test"};
      const comp = redirectToBaseRoute(goTo, form, location);
      expect(comp).toBe(true);
      expect(goTo).not.toHaveBeenCalled();
    });
  });
});
