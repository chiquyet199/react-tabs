import React from "react";
import {View, Text, Dimensions} from "react-native";
import {shallow} from "enzyme";
import {extend} from "underscore";
import {isWeb} from "../../utils/common";
import {Tabs} from "./Tabs";
import {WebTabs, TabContainer} from "./Tabs.web";
import {TabItem} from "./TabItem";

const page1 = () => (
  <View>
    <Text>page1</Text>
  </View>
);
const page2 = () => (
  <View>
    <Text>page1</Text>
  </View>
);

const mockTheme = {
  light: {
    background: ["#ffffff", "#ffffff"],
    accentColor: "#5ab88e",
  },
};

jest.mock("./TabItem");

const initialLayout = {width: Dimensions.get("window").width, height: 47};

describe("Tabs - page tests", () => {
  it("matches snapshot", () => {
    const expectedComponent = isWeb ? getWebComponent() : getNativeComponent();
    expect(expectedComponent).toMatchSnapshot();
  });

  if (isWeb) {
    it("If web tabs zero children", () => {
      const nullChild = getWebComponentZeroChild();
      expect(nullChild.props().children).toBeUndefined();
    });

    it("Check if correct content page", () => {
      const defTabs = getWebComponent();
      const content = defTabs
        .dive()
        .find(View)
        .findWhere(tab => tab.props().type === "ContentContainer");
      const contentView = content.find(View).find(Text);
      expect(contentView.props().children).toEqual("Page 1");
    });

    it("Check if correct default tab active", () => {
      const defTabs = getWebComponent();
      const tabs = defTabs
        .dive()
        .find(View)
        .findWhere(tab => tab.props().type === "TabsContainer");

      const defTab = tabs.find(TabContainer);

      defTab.forEach((view, index) => {
        if (index === 0) {
          expect(view.prop("active")).toBe(true);
        } else {
          expect(view.prop("active")).toBe(false);
        }
      });
    });

    it("Check if correct changes content page", () => {
      const defTabs = getWebComponent();
      const tabs = defTabs
        .dive()
        .find(View)
        .findWhere(tab => tab.props().type === "TabsContainer");
      const defTab = tabs.find(TabContainer);

      defTab.forEach((view, index) => {
        if (index === 1) {
          view.simulate("press");
        }
      });

      defTabs.update();

      const newContent = defTabs
        .dive()
        .find(View)
        .findWhere(tab => tab.props().type === "ContentContainer");

      const newContentView = newContent.find(View).find(Text);

      expect(newContentView.props().children).toEqual("Page 2");
    });

    it("Check if correct switch active tab", () => {
      const defTabs = getWebComponent();
      const tabs = defTabs
        .dive()
        .find(View)
        .findWhere(tab => tab.props().type === "TabsContainer");

      const defTab = tabs.find(TabContainer);

      defTab.forEach((view, index) => {
        if (index === 1) {
          view.simulate("press");
        }
      });

      defTabs.update();

      const updatedTabs = defTabs
        .dive()
        .find(View)
        .findWhere(tab => tab.props().type === "TabsContainer");

      const newDefTab = updatedTabs.find(TabContainer);

      newDefTab.forEach((view, index) => {
        if (index === 0) {
          expect(view.prop("active")).toBe(false);
        } else {
          expect(view.prop("active")).toBe(true);
        }
      });
    });
  } else {
    it("Check native tab onIndexChange ", () => {
      const comp = getNativeComponent();
      comp.prop("onIndexChange")(1);
      comp.update();
      expect(comp).toHaveProp(
        "navigationState",
        expect.objectContaining({
          index: 1,
        }),
      );
    });

    it("Check native tab initialLayout ", () => {
      const comp = getNativeComponent();
      expect(comp.prop("initialLayout")).toEqual(initialLayout);
    });

    it("passes right props to renderTabBar", () => {
      const comp = getNativeComponent();
      const expectedProps = {
        globaltheme: "dark",

        0: {key: "first", title: "My Home"},
        1: {key: "second", title: "Rent Passport shares"},

        theme: {
          light: {accentColor: "#5ab88e", background: ["#ffffff", "#ffffff"]},
        },
      };

      comp.prop("renderTabBar")({
        0: {key: "first", title: "My Home"},
        1: {key: "second", title: "Rent Passport shares"},
      });
      expect(TabItem).toHaveBeenCalledWith(
        expect.objectContaining(expectedProps),
      );
    });
  }

  const getNativeComponent = props => {
    const parsedProps = extend(getNativeMockProps(), props);

    return shallow(<Tabs {...parsedProps} />);
  };

  const getWebComponent = props => {
    const parsedProps = extend({}, props);

    return shallow(
      <WebTabs {...parsedProps}>
        <View title="WELCOME">
          <Text>Page 1</Text>
        </View>
        <View title="NATIVE">
          <Text>Page 2</Text>
        </View>
      </WebTabs>,
    );
  };

  const getWebComponentZeroChild = props => {
    const parsedProps = extend({}, props);

    return shallow(<WebTabs {...parsedProps} />);
  };

  const getNativeMockProps = () => ({
    globaltheme: "dark",
    theme: mockTheme,
    scene: {first: page1, second: page2},
    routes: [
      {key: "first", title: "My Home"},
      {key: "second", title: "Rent Passport shares"},
    ],
    initialLayout: {width: Dimensions.get("window").width, height: 47},
  });
});
