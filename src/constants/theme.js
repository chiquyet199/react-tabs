import {isIos, isX} from "../utils/common";
export const padding = {
  top: (isIos && ((isX && 40) || 20)) || 0,
};
export const colors = {
  // shades of grey
  white: "#ffffff",
  black: "#000000",
  grey: "#6e7c91",
  canopySteel: "#6b7c93", // hq color
  canopySoftSteel: "#8999ab",
  steel: "#b9c7d6",
  lightSteel: "#e3eaf2",
  canopySoftSteelOverlay: "#f3f7fc",
  lightBackground: "rgba(255, 255, 255, 0.2)",
  shadowColor: "rgba(107, 124, 147, 0.4)",
  semiTransparent: "rgba(0, 0, 0, 0.12)",
  darkOverlay: "rgba(0, 0, 0, 0.8)",
  darkTransparent: "rgba(0, 0, 0, 0.7)",
  none: "rgba(0, 0, 0, 0)",
  primary: "#5ab88e",
  hqBlue: "#5ab1b8", // hq color
  lightBlue: "#42c8ce", // hq color
  lightTeal: "#37b3ba", // hq color for 'body link'
  veryLightSteel: "#f6f9fc", // hq color
  blueGray: "#455363", // hq colour
  blueGreen: "#3c7087",

  facebook: "#3b5998",
  dark: "#010202",
  canopyGreen: "#5ab88e",
  darkGreen: "#236a6d",
  darkestGreen: "#011e24", // not in zep, used to make gradient
  green: "#398d7f",
  lightGreen: "#58dfa3",
  successGreen: "#5dc471",
  darkConcrete: "#455363",
  whiteTransparent: "rgba(255, 255, 255, 0.2)",

  red: "#e26e59",
  alertRed: "#f16651",
  warning: "#fffcf3",
  orange: "#f1bf51",
  rentPassportErrorBg: "#fff5f5",
  rentPassportWarningBg: "#fffcf3",
};

const _switch = {
  accentColor: colors.successGreen,
  baseColor: colors.white,
};

const buttons = {
  primary: {
    background: colors.canopyGreen,
    border: colors.canopyGreen,
    text: colors.white,
    fontWeight: "bold",
  },
  secondary: {
    background: colors.white,
    border: colors.canopyGreen,
    text: colors.canopyGreen,
    fontWeight: "bold",
  },
  tertiary: {
    background: colors.white,
    border: colors.grey,
    text: colors.grey,
    fontWeight: "bold",
  },
  primary_outlined: {
    background: colors.none,
    border: colors.canopyGreen,
    text: colors.canopyGreen,
    fontWeight: "bold",
  },
  facebook: {
    background: colors.facebook,
    border: colors.facebook,
    text: colors.white,
    fontWeight: "bold",
  },
  danger: {
    background: colors.red,
    border: colors.red,
    text: colors.white,
    fontWeight: "bold",
  },
  danger_outlined: {
    background: colors.white,
    border: colors.red,
    text: colors.red,
    fontWeight: "bold",
  },
  confirmation_danger: {
    background: colors.white,
    border: colors.none,
    text: colors.red,
    fontWeight: "bold",
    fontSize: "18px",
  },
  confirmation_primary: {
    background: colors.white,
    border: colors.none,
    text: colors.hqBlue,
    fontWeight: "bold",
    fontSize: "18px",
  },
  confirmation_cancel: {
    background: colors.white,
    border: colors.none,
    text: colors.canopySteel,
    fontWeight: "bold",
    fontSize: "18px",
  },
  transparent: {
    background: colors.none,
    border: colors.none,
    text: colors.white,
    fontWeight: "bold",
  },
  transparent_green: {
    background: colors.none,
    border: colors.none,
    fontWeight: "bold",
    text: colors.canopyGreen,
    fontSize: "14px",
  },
  transparent_gray: {
    background: colors.none,
    border: colors.none,
    text: colors.canopySteel,
    fontWeight: "bold",
  },
  transparent_white: {
    background: colors.none,
    border: colors.none,
    text: colors.white,
    fontWeight: "bold",
  },
  tabButton: {
    background: colors.white,
    border: colors.lightSteel,
    text: colors.canopySteel,
    fontWeight: "bold",
    fontSize: "14px",
  },
  delete_button: {
    background: colors.white,
    border: colors.steel,
    color: colors.steel,
    fontWeight: "bold",
  },
};

export default {
  hq: {
    light: {
      background: [colors.white, colors.veryLightSteel],
      form: {
        accentColor: colors.hqBlue,
        baseColor: colors.grey,
      },
      topbar: {
        background: colors.white,
        baseColor: colors.canopySteel,
        headerButtonColour: "transparent_blue",
        progressBar: colors.lightBlue,
      },
      tabs: {
        background: colors.white,
        borderBottom: colors.hqBlue,
        activeText: colors.hqBlue,
        inactiveText: colors.canopySteel,
        indicator: colors.hqBlue,
        label: colors.hqBlue,
      },
      switch: _switch,
      accentColor: colors.hqBlue,
      baseColor: colors.canopySteel,
      textColor: colors.canopySteel,
      altTextColor: colors.white,
      activeTabColor: colors.hqBlue,
      inactiveTabColor: colors.lightSteel,
      dividerColor: colors.lightSteel,
      lineBreakColor: colors.lightSteel,
      errorColor: colors.red,
      boxBorder: colors.lightSteel,
    },
    dark: {
      background: [colors.white, colors.white],
      form: {
        accentColor: colors.hqBlue,
        baseColor: colors.grey,
      },
      topbar: {
        background: colors.none,
        baseColor: colors.white,
        headerButtonColour: "transparent_blue",
        progressBar: colors.lightBlue,
      },
      switch: _switch,
      accentColor: colors.hqBlue,
      baseColor: colors.white,
      textColor: colors.white,
      activeTabColor: colors.hqBlue,
      inactiveTabColor: colors.lightSteel,
      dividerColor: colors.lightSteel,
      lineBreakColor: colors.lightSteel,
    },
    buttons: {
      ...buttons,
      primary: {
        background: colors.hqBlue,
        border: colors.hqBlue,
        text: colors.white,
        fontWeight: "bold",
      },
      secondary: {
        background: colors.white,
        border: colors.hqBlue,
        text: colors.hqBlue,
        fontWeight: "bold",
      },
      outlined: {
        background: colors.none,
        border: colors.hqBlue,
        text: colors.hqBlue,
        fontWeight: "bold",
      },
      site_page_util_bar_primary: {
        background: colors.hqBlue,
        border: colors.hqBlue,
        fontWeight: "bold",
        text: colors.white,
      },
      site_page_util_bar_outlined: {
        background: colors.white,
        border: colors.hqBlue,
        fontWeight: "bold",
        text: colors.hqBlue,
      },
      transparent_blue: {
        background: colors.none,
        border: colors.none,
        fontWeight: "bold",
        text: colors.hqBlue,
      },
      transparent_green: {
        background: colors.none,
        border: colors.none,
        fontWeight: "bold",
        text: colors.hqBlue,
        fontSize: "14px",
      },
    },
    colors,
    padding,
  },
  selva: {
    dark: {
      background: [colors.darkGreen, colors.darkestGreen],
      form: {
        accentColor: colors.canopyGreen,
        baseColor: colors.white,
        bounceButton: "transparent",
      },
      topbar: {
        background: colors.none,
        baseColor: colors.white,
        headerButtonColour: "transparent_white",
        progressBar: colors.lightGreen,
      },
      tabs: {
        background: colors.white,
        borderBottom: colors.canopyGreen,
        activeText: colors.canopyGreen,
        inactiveText: colors.canopySteel,
        indicator: colors.canopyGreen,
        label: colors.canopyGreen,
      },
      switch: _switch,
      accentColor: colors.canopyGreen,
      baseColor: colors.veryLightSteel,
      textColor: colors.veryLightSteel,
      dividerColor: colors.lightSteel,
    },
    light: {
      background: [colors.white, colors.white],
      form: {
        accentColor: colors.canopyGreen,
        baseColor: colors.canopySteel,
        bounceButton: "transparent_green",
      },
      topbar: {
        background: colors.white,
        baseColor: colors.canopySteel,
        headerButtonColour: "transparent_green",
        progressBar: colors.lightGreen,
        fontSize: 18,
      },
      tabs: {
        background: colors.white,
        borderBottom: colors.canopyGreen,
        activeText: colors.canopyGreen,
        inactiveText: colors.canopySteel,
        indicator: colors.canopyGreen,
        label: colors.canopyGreen,
      },
      switch: _switch,
      accentColor: colors.canopyGreen,
      baseColor: colors.canopySteel,
      textColor: colors.canopySteel,
      errorTextColor: colors.alertRed,
      dividerColor: colors.lightSteel,
    },
    colors,
    buttons,
    padding,
  },
  hqApp: {
    light: {
      background: [colors.white, colors.white],
      form: {
        accentColor: colors.hqBlue,
        baseColor: colors.grey,
      },
      topbar: {
        background: colors.darkConcrete,
        baseColor: colors.white,
        fontSize: 18,
        headerButtonColour: "transparent_white",
        progressBar: colors.lightBlue,
      },
      tabs: {
        background: colors.white,
        borderBottom: colors.hqBlue,
        activeText: colors.hqBlue,
        inactiveText: colors.canopySteel,
        indicator: colors.hqBlue,
        label: colors.hqBlue,
      },
      switch: _switch,
      accentColor: colors.hqBlue,
      baseColor: colors.canopySteel,
      textColor: colors.canopySteel,
      boxBorder: colors.lightSteel,
      altBoxBorder: colors.veryLightSteel,
      lightBackground: colors.veryLightSteel,
      disabledTextColor: colors.steel,
      altTextColor: colors.white,
      activeTab: colors.canopyGreen,
      inactiveTab: colors.lightSteel,
      dividerColor: colors.lightSteel,
      dangerText: colors.red,
      successText: colors.successGreen,
      rentStatusTab: {
        green: colors.successGreen,
        yellow: colors.orange,
        red: colors.red,
      },
      selectedBoxBorder: colors.lightBlue,
      slideoutMenu: {
        background: colors.blueGreen,
      },
      activeTenancy: {
        propertySummaryBackground: colors.lightBackground,
      },
      lineBreakColor: colors.canopySteel,
      errorColor: colors.red,
    },
    dark: {
      background: [colors.darkConcrete, colors.darkConcrete],
      form: {
        accentColor: colors.hqBlue,
        baseColor: colors.grey,
      },
      topbar: {
        background: colors.darkConcrete,
        baseColor: colors.white,
        fontSize: 18,
        headerButtonColour: "transparent_white",
      },
      switch: _switch,
      accentColor: colors.hqBlue,
      baseColor: colors.white,
      textColor: colors.white,
      boxBorder: colors.lightSteel,
      lightBackground: colors.veryLightSteel,
      disabledTextColor: colors.steel,
      altTextColor: colors.white,
      activeTab: colors.canopyGreen,
      inactiveTab: colors.lightSteel,
    },
    buttons: {
      ...buttons,
      primary: {
        background: colors.hqBlue,
        border: colors.hqBlue,
        text: colors.white,
        fontWeight: "bold",
      },
      primary_outlined: {
        background: colors.none,
        border: colors.hqBlue,
        text: colors.hqBlue,
        fontWeight: "bold",
      },
      secondary: {
        background: colors.white,
        border: colors.hqBlue,
        text: colors.hqBlue,
        fontWeight: "bold",
      },
      outlined: {
        background: colors.none,
        border: colors.hqBlue,
        text: colors.hqBlue,
        fontWeight: "bold",
      },
    },
    colors,
    padding,
  },
};
