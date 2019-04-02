import {injectGlobal} from "styled-components";
import {AppRegistry} from "react-native";
import iconFont from "react-native-vector-icons/Fonts/FontAwesome.ttf";
import CanopyIcons from "./resources/fonts/fontello.ttf";
import App from "./App";
import {isWeb} from "./utils/common";
import {colors} from "./constants/theme";

/*
Icons for web; grabbing FA, though package has other choices
 */
/* eslint-disable */
injectGlobal`
  @font-face {
    src: url(${iconFont});
    font-family: FontAwesome;
  }
  @font-face {
    src: url(${CanopyIcons});
    font-family: fontello;
  }
  ${isWeb &&
  `input {
    outline: none;
    width: 100%;
    background-color: ${colors.none};
    height: 38px;
    padding-top: 2px;
    border: 0 none;
    font-size: 16px;
    line-height: 36px;
    color: inherit;
    padding-right: 8px;
  }
  select {
    appearance: none;
    font-family: inherit;
    background-color: transparent;
    width: 100%;
    padding: 4px 0;
    font-size: 16px;
    color: #808080;
    border: none;
    border-bottom: 1px solid #808080;
    height: 40px;
    border-radius: 0;
    + div {
      pointer-events: none;
    }
  }
  select:focus {
    outline: none;
  }
 `}
`;


/* eslint-enable */

AppRegistry.registerComponent("rnwStarterApp", () => App);
AppRegistry.runApplication("rnwStarterApp", {
  initialProps: {},
  rootTag: document.getElementById("root"),
});
