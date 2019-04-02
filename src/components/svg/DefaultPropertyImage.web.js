import React from "react";
import {Image} from "react-native";
import defaultPropertyImage from "./DefaultPropertyImage.svg";

export default () => {
  return <Image source={{uri: defaultPropertyImage}} />;
};
