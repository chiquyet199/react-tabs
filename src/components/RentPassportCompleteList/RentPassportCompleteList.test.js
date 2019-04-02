import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";
import {initialState} from "../../__mocks__/initialState";
import {
  RentPassportCompleteList,
  RentPassportList,
} from "./RentPassportCompleteList";
import {
  RentPassportListItemIcon,
  Title,
  ToggleIcon,
} from "./RentPassportCompleteList.styles";
import Icon from "../../components/Icon";
import translations from "../../utils/locales/en-US";
import profile from "../../assets/profile.png";
import upArrow from "../../assets/ic_up_arrow_gray/ic_up_arrow_gray.png";
import downArrow from "../../assets/ic_down_arrow_gray/ic_down_arrow_gray.png";

const MockDate = require("mockdate");
const frameTime = 10;

global.requestAnimationFrame = cb => {
  // Default implementation of requestAnimationFrame calls setTimeout(cb, 0),
  // which will result in a cascade of timers
  // Jest watches the number of timers created and assume an infinite recursion situation
  // if the number gets too large.
  // Setting the timeout simulates a frame every 1/100th of a second
  setTimeout(cb, frameTime);
};

global.timeTravel = (time = frameTime) => {
  const tickTravel = () => {
    // The React Animations module looks at the elapsed time for each frame to calculate its new position
    const now = Date.now();
    MockDate.set(new Date(now + frameTime));
    // Run the timers forward
    jest.advanceTimersByTime(frameTime);
  };
  // Step through each of the frames
  const frames = time / frameTime;
  for (let framesEllapsed = 0; framesEllapsed < frames; framesEllapsed += 1) {
    tickTravel();
  }
};
const colors = {
  error: "#f16651",
  green: "#5ab88e",
};
const compTranslations = translations.rent_passport_complete;
const testListItems = [
  {
    title: "About you",
    infoText: "Full name, birthday and rental preferences",
    icons: {
      main: profile,
      complete: "tick-circle",
      incomplete: "close-circle",
      collapsed: downArrow,
      open: upArrow,
    },
    statusText: {complete: "Complete", incomplete: "Incomplete"},
    uiComponent: "aboutYou",
  },
];

const mockProps = {
  items: testListItems,
  translations: compTranslations,
  rentPassport: initialState.rentPassport,
  scaleImages: {},
  fullWidthContentDivider: true,
  detailsMargin: 14,
  iconMargin: 14,
  collapsedByDefault: true,
};
const [item] = testListItems;

const listProps = {
  item,
  key: item.title,
  translations: compTranslations,
  rentPassport: initialState.rentPassport,
  scaleImages: {},
};

describe("RentPassportCompleteList", () => {
  let wrapper;
  let completeList;
  beforeEach(() => {
    MockDate.set(0);
    // Need to fake the timers for timeTravel to work
    jest.useFakeTimers();

    wrapper = shallow(<RentPassportList {...mockProps} />);
    completeList = shallow(
      <RentPassportCompleteList complete {...listProps} />,
    );
  });

  describe("RentPassportComplete render", () => {
    it("renders properly - " + Platform.OS, () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("RentPassportCompleteList render", () => {
    it("renders properly - " + Platform.OS, () => {
      expect(completeList).toMatchSnapshot();
    });
  });

  describe("RentPassportCompleteList", () => {
    describe("Complete", () => {
      it("passes correct props to <RentPassportListItemIcon />", () => {
        expect(completeList.find(RentPassportListItemIcon).props()).toEqual({
          complete: true,
          source: item.icons.main,
        });
      });
      it("passes correct props to <Title/>", () => {
        expect(completeList.find(Title).props()).toEqual({
          complete: true,
          children: item.title,
        });
      });
      it("passes correct props to  Status Icon", () => {
        expect(completeList.find(Icon).props()).toEqual({
          allowFontScaling: false,
          name: item.icons.complete,
          size: 24,
          color: colors.green,
        });
      });
    });
  });

  it("changes animation values for ToggleIcon", () => {
    expect(completeList.find(ToggleIcon)).toHaveLength(1);
    completeList.setState({isCollapsed: false});
    completeList.update();
    // Test Animated view animation
    // changing values
    global.timeTravel(500);
    const name = completeList.find(ToggleIcon).prop("source");
    expect(name).toEqual(item.icons.open);
    completeList.setState({isCollapsed: true});
    completeList.update();
    global.timeTravel(500);
    const newName = completeList.find(ToggleIcon).prop("source");
    expect(newName).toEqual(item.icons.collapsed);
  });
});
