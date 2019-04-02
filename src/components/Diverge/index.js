import React from "react";
import {Platform} from "react-native";

const errorMessage = "You must provide a valid component to <Diverge />";

export const Diverge = props => {
  const Component = props[Platform.OS] || props.mobile;

  if (!Component) {
    throw new Error(errorMessage);
  }

  /* eslint object-curly-newline: ["error", { "multiline": true }] */
  const {android, ios, mobile, web, ...otherProps} = props;

  return <Component {...otherProps} />;
};

export default Diverge;
