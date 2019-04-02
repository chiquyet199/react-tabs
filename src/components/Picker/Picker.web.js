import React from "react";
import {string, array, func} from "prop-types";
import WebPicker from "./WebPicker";

export const Picker = props => <WebPicker {...props} />;

Picker.propTypes = {
  currentValue: string.isRequired,
  onChange: func.isRequired,
  options: array.isRequired,
  style: array,
};

export default Picker;
