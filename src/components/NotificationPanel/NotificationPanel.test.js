import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";
import {NOTIFICATION_ICON_COLORS} from "../../constants/notifications";
import {NotificationPanel} from "./index";
import {Container, NotificationText} from "./NotificationPanel";
import {extend} from "underscore";
import Icon from "../../components/Icon";

describe("Notification Panel component", () => {
  it("render properly - " + Platform.OS, () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it("Sets proper color props depending on error types", () => {
    const {theme} = getMockProps();
    const colorProps = NOTIFICATION_ICON_COLORS(theme);
    const types = [
      "error",
      "warning",
      "info",
      "rent_passport_info",
      "rent_passport_warning",
      "rent_passport_error",
    ];
    types.forEach(async type => {
      const comp = await getComponent({
        type,
        iconColor: undefined,
        textColor: undefined,
      });
      expect(comp.find(Container).prop("color")).toBe(colorProps[type].bg);
      expect(comp.find(Icon).prop("color")).toBe(colorProps[type].iconColor);
      expect(comp.find(NotificationText).prop("color")).toBe(
        colorProps[type].text,
      );
    });
  });

  it("Renders content if passed", async () => {
    const content = <NotificationText>Text</NotificationText>;
    const comp = await getComponent({
      content,
      text: undefined,
    });
    expect(comp.find(NotificationText)).toExist();
  });

  it("Renders action Icon if handlePress is passed", () => {
    const handlePress = jest.fn();
    const comp = getComponent({
      handlePress,
    });
    expect(comp.find(Icon)).toHaveLength(2);
  });

  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<NotificationPanel {...parsedProps} />);
  };

  const getMockProps = () => ({
    handlePress: () => {},
    text: "Notification text",
    content: undefined,
    textColor: "#ff0000",
    iconColor: "#ff0000",
    iconName: "warning",
    type: "error",
    topmargin: 5,
    bottommargin: 5,
    isTopbar: false,
    theme: {
      colors: {
        lightSteel: "#e3eaf2",
        alertRed: "#f16651",
        warning: "#fffcf3",
        orange: "#f1bf51",
        white: "#ffffff",
        successGreen: "#5dc471",
        rentPassportErrorBg: "#fff5f5",
        rentPassportWarningBg: "#fffcf3",
      },
    },
  });
});
