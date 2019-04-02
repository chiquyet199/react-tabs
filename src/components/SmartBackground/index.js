import React from "react";
import {connect} from "react-redux";
import styled from "styled-components/native";
import LinearGradient from "./LinearGradient";
import {withTheme} from "styled-components";

const SmartBackground = ({globaltheme, theme, ...props}) => (
  <LinearGradient colors={theme[globaltheme].background} {...props} />
);

const mapStateToProps = state => ({
  globaltheme: state.theme || state.globaltheme,
});
const ConnectedSmartBackground = connect(mapStateToProps)(
  withTheme(SmartBackground),
);

export default styled(ConnectedSmartBackground)`
  flex: 1;
  min-height: 100%;
`;
