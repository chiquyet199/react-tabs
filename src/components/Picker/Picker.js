import React from "react";
import {string, array, func} from "prop-types";
import NativePicker from "./NativePicker";

export const Picker = props => <NativePicker {...props} />;

Picker.propTypes = {
  currentValue: string.isRequired,
  onChange: func.isRequired,
  options: array.isRequired,
  style: array,
};

export default Picker;
