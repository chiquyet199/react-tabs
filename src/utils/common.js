import {Dimensions, Platform} from "react-native";
import React from "react";
import {connect} from "react-redux";
import styled from "styled-components/native";
import styledWeb, {withTheme} from "styled-components";

export const isWeb = Platform.OS === "web";
export const isNative = Platform.OS === "ios" || Platform.OS === "android";
export const isIos = Platform.OS === "ios";
export const isDev = process.env.NODE_ENV !== "production";
export const extractValueFromEvent = event =>
  event.target ? event.target.value : event;
export const extractKeyFromEvent = event =>
  event.nativeEvent ? event.nativeEvent.key : event.key;

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const cleanProps = props => {
  // List of attributes to skip.
  const BLACKLISTED_PROPS = ["dispatch"];
  // Initialize the `cleanProps` as an empty object.
  const ownCleanProps = {};
  // Iterate over all the properties (Eslint - loops should be avoided in favor of array iterations)
  Object.keys(props).forEach(propKey => {
    // Check if the key is not in the blacklisted array.
    if (BLACKLISTED_PROPS.indexOf(propKey) === -1) {
      // Append the attribute to the clean object.
      ownCleanProps[propKey] = props[propKey];
    }
  });

  // Return the cleaned properties.
  return ownCleanProps;
};

export const responsive = Component => styles => {
  const ResponsiveComponent = styled(Component)`
    ${({size}) => styles[size]};
  `;

  const ResponsiveWrapper = props => {
    const ownProps = cleanProps(props);

    return <ResponsiveComponent {...ownProps} />;
  };

  return connect(state => ({
    size: state.dimensions.size,
  }))(ResponsiveWrapper);
};

export const responsiveWeb = Component => styles => {
  const ResponsiveWebComponent = styledWeb(Component)`
    ${({size}) => styles[size]};
  `;

  const ResponsiveWebWrapper = props => {
    const ownProps = cleanProps(props);

    return <ResponsiveWebComponent {...ownProps} />;
  };

  return connect(state => ({
    size: state.dimensions.size,
  }))(ResponsiveWebWrapper);
};

export const isX = (() => {
  const d = Dimensions.get("window");
  const {height, width} = d;

  return (
    // This has to be iOS duh
    Platform.OS === "ios" &&
    // Accounting for the height in either orientation
    (height === 812 || width === 812)
  );
})();

// Use theme fallback because Selva has another reducer
export const themed = Component =>
  connect(({globaltheme, theme}) => ({
    globaltheme: globaltheme || theme,
  }))(withTheme(Component));

export const redirectToBaseRoute = (
  goTo,
  form,
  location = {},
  prefixOnly = false,
) => {
  const {pathname} = location;
  const urlArr = pathname.split("/").filter(i => i !== "");
  const [baseUrl] = urlArr;
  if (prefixOnly) {
    return baseUrl;
  }
  const {DynamicForm} = form;
  if (!DynamicForm) {
    goTo(`/${baseUrl}`);
  }

  return true;
};

export const parseStyle = style => {
  return Object.keys(style).reduce((previousValue, currentValue) => {
    const starter = previousValue ? `${previousValue};\n` : "";

    return `${starter}${currentValue}: ${style[currentValue]}`;
  }, "");
};

export const applyStyleObjectToStyledComponent = (style, component) => {
  if (!style || Object.keys(style).length === 0) {
    return component;
  }

  const parsedStyles = parseStyle(style);

  return styled(component)`
    ${parsedStyles};
  `;
};
