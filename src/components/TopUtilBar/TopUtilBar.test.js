import React from "react";
import {shallow} from "enzyme";
import {TopBar} from "./TopUtilBar";
import {initialState} from "../../__mocks__/initialState";
import configureStore from "redux-mock-store";
import ProgressBar from "../ProgressIndicator";
import {TopBarContainer} from "../common/layout";
import NotificationPanel from "../NotificationPanel";
import {
  Container,
  RightButton,
  StyledButton,
  ThemedCanopyHqTextMiddle,
} from "./TopUtilBar.styles";
import themes from "../../constants/theme";
const theme = themes.selva;
const text = "Back";

const mockProps = {
  progress: 20,
  notification: {type: "error", message: "Error"},
  haveTopbar: initialState.topbar.haveTopbar,
  topbarBtn: initialState.topbar.topbarBtn,
  isLoggedIn: initialState.auth.isLoggedIn,
  goBack: jest.fn(),
  topbarCenterText: initialState.topbar.topbarCenter.topbarCenterText,
  topbarLeftText: initialState.topbar.topbarLeft.topbarLeftText,
  theme,
  globaltheme: "light",
  hideBackButton: false,
};

const mockStore = configureStore(mockProps);

describe("<TopBar />", () => {
  describe("TopBar props are passed", () => {
    it("renders properly", () => {
      const tree = shallow(<TopBar {...mockProps} />, {
        context: {store: mockStore(initialState)},
      });
      expect(tree.find(NotificationPanel).prop("text")).toBe(
        mockProps.notification.message,
      );
    });

    it("does not render notification  when notification is false", () => {
      const {notification, ...otherProps} = mockProps;
      const tree = shallow(<TopBar {...otherProps} />, {
        context: {store: mockStore(initialState)},
      });

      expect(tree.find(NotificationPanel)).toHaveLength(0);
    });

    it("does not render StyledButton when topbarBtn is false", () => {
      const {topbarBtn, ...otherProps} = mockProps;
      const tree = shallow(<TopBar {...otherProps} />, {
        context: {store: mockStore(initialState)},
      });

      expect(tree.find(StyledButton)).toHaveLength(0);
    });

    it("does not render ProgressBar when progress = 0", () => {
      const progress = {progress: 0};
      const newProps = {...mockProps, ...progress};
      const tree = shallow(<TopBar {...newProps} />, {
        context: {store: mockStore(initialState)},
      });
      expect(tree.find(ProgressBar)).not.toExist();
    });

    it("passes correct props to RightButton", () => {
      const tree = shallow(
        <TopBar
          globaltheme="dark"
          iconsize={30}
          theme={theme}
          topbarLeftText={text}
          haveTopbar
        />,
        {
          context: {store: mockStore(initialState)},
        },
      );
      expect(tree.find(RightButton).props().middle).toEqual(text);
      expect(tree.find(RightButton).props().iconsize).toEqual(30);
      expect(tree.find(RightButton).props().type).toEqual("transparent_white");
    });

    it("passes layout prop to component", () => {
      const tree = shallow(
        <TopBar
          globaltheme="dark"
          iconsize={30}
          theme={theme}
          topbarLeftText={text}
          haveTopbar
          topbarBtn={{
            haveTopbarButton: true,
            topbarButtonText: "Close",
            topbarButtonIcon: "close",
          }}
          layout="hq"
        />,
        {
          context: {store: mockStore(initialState)},
        },
      );
      expect(tree.find(RightButton)).toHaveProp("layout", "hq");
      expect(tree.find(StyledButton)).toHaveProp("layout", "hq");
      expect(tree.find(Container)).toHaveProp("layout", "hq");
    });

    it("sets right `ThemedCanopyHqTextMiddle` color when topbarCenterText were passed", () => {
      const tree = shallow(
        <TopBar
          topbarCenterText={text}
          globaltheme="light"
          theme={theme}
          haveTopbar
        />,
        {
          context: {store: mockStore(initialState)},
        },
      );
      expect(tree.find(ThemedCanopyHqTextMiddle).props().children).toEqual(
        text,
      );
    });

    it("renders back button when hideBackButton is falsey", () => {
      const tree = shallow(<TopBar {...mockProps} />, {
        context: {store: mockStore(initialState)},
      });

      expect(tree.find(RightButton)).toExist();
    });

    it("doesn't render back button when hideBackButton is truthy", () => {
      const props = Object.assign(mockProps, {hideBackButton: true});

      const tree = shallow(<TopBar {...props} />, {
        context: {store: mockStore(initialState)},
      });

      expect(tree.find(RightButton)).not.toExist();
    });

    it("when topbarButtonText is `Close` display icon to the left of it", () => {
      const topbarProps = {
        topbarBtn: {
          haveTopbarButton: true,
          topbarButtonText: "Close",
          topbarButtonIcon: "close",
        },
      };
      const props = Object.assign(mockProps, topbarProps);
      const tree = shallow(<TopBar {...props} />, {
        context: {store: mockStore(initialState)},
      });

      expect(tree.find(StyledButton).prop("left")).toEqual("close");
    });

    it("when topbarButtonText is `Skip` display icon to the right of it", () => {
      const topbarProps = {
        topbarBtn: {
          haveTopbarButton: true,
          topbarButtonText: "Skip",
          topbarButtonIcon: "arrow-right",
        },
      };
      const props = Object.assign(mockProps, topbarProps);
      const tree = shallow(<TopBar {...props} />, {
        context: {store: mockStore(initialState)},
      });

      expect(tree.find(StyledButton).prop("right")).toEqual("arrow-right");
      expect(tree.find(StyledButton).prop("left")).not.toEqual("arrow-right");
    });
  });

  describe("Testing TopBar snapshot", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<TopBar {...mockProps} />, {
        context: {store: mockStore(initialState)},
      });
    });

    it("renders as expected", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("renders as expected inner wrapper", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("always renders a Progress Bar", () => {
      expect(wrapper.find(ProgressBar)).toHaveLength(1);
    });

    it("always renders a Notification Panel", () => {
      expect(wrapper.find(NotificationPanel)).toHaveLength(1);
    });

    it("contains everything else that gets rendered", () => {
      const divs = wrapper.find(TopBarContainer);

      const wrappingDiv = divs.first();

      expect(wrappingDiv.children()).toEqual(wrapper.children());
    });
  });
});
