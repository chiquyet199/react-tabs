import React from "react";
import {Container, Progress} from "./ProgressIndicator";
import {themed} from "../../utils/common";

export const ProgressIndicator = ({theme, globaltheme, value}) => (
  <Container theme={theme}>
    <Progress theme={theme} globaltheme={globaltheme} value={value} />
  </Container>
);

export default themed(ProgressIndicator);
