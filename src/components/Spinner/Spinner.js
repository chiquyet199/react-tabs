import React from "react";
import {string, bool, oneOf} from "prop-types";
import NativeSpinner from "./NativeSpinner";
import {themed} from "../../utils/common";

const ANIMATION = ["none", "slide", "fade"];
const SIZES = ["small", "normal", "large"];

export const Spinner = props => <NativeSpinner {...props} />;

Spinner.propTypes = {
  visible: bool,
  cancelable: bool,
  textContent: string,
  color: string,
  animation: oneOf(ANIMATION),
  size: oneOf(SIZES),
  overlayColor: string,
};

export default themed(Spinner);
