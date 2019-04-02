import React from "react";
import {shallow} from "enzyme";
import {initialState} from "../../__mocks__/initialState";
import {TruelayerAuth} from "./TruelayerAuthPage";
import configureStore from "redux-mock-store";
import Button from "../../components/Button";
import locale from "../../utils/locales/en-US";
import {isNative} from "../../utils/common";
import {WebView} from "react-native";
import {_openAuthWindow} from "./";

const mockFunc = jest.fn();
const mockProps = {
  translations: {
    truelayer_auth_title: locale.truelayer.truelayer_auth_title,
    authorize: locale.authorize,
  },
  openAuthWindow: mockFunc,
};

const mockPropsWithWWindow = {
  translations: {
    truelayer_auth_title: locale.truelayer.truelayer_auth_title,
    authorize: locale.authorize,
  },
  openAuthWindow: _openAuthWindow,
};

const mockStore = configureStore(mockProps);
describe("Testing TruelayerAuth snapshot", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TruelayerAuth {...mockProps} />, {
      context: {store: mockStore(initialState)},
    });
  });
  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });

  if (isNative) {
    it("renders webview", () => {
      const webview = wrapper.find(WebView);
      expect(webview).toHaveLength(1);
    });
  }

  if (!isNative) {
    describe("functionality", () => {
      it("trigger submit callback", () => {
        const btn = wrapper.dive().find(Button);
        expect(btn).toHaveLength(1);
        expect(btn.prop("middle")).toBe(locale.authorize);
        expect(btn.prop("onClick")).toBe(mockProps.openAuthWindow);
        btn.simulate("click");
        expect(mockProps.openAuthWindow).toHaveBeenCalled();
      });
    });

    describe("check _openAuthWindow method", () => {
      const tree = shallow(<TruelayerAuth {...mockPropsWithWWindow} />, {
        context: {store: mockStore(initialState)},
      });
      it("triggers open and focus", () => {
        global.open = jest.fn();
        global.focus = jest.fn();
        const btn = tree.find(Button);
        btn.simulate("click");
        expect(global.open).toHaveBeenCalled();
        expect(global.focus).toHaveBeenCalled();
      });
    });
  }
});
