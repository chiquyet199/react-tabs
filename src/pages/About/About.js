import React from "react";
import {Text} from "react-native";
import styled from "styled-components/native";
import Diverge from "../../components/Diverge/index.js";
import {responsive} from "../../utils/common";

const About = () => (
  <MyView>
    <Text>About Page</Text>
    <Diverge mobile={MobileComponent} web={WebComponent} />
  </MyView>
);

const MobileComponent = () => <Text>I am on a Mobile</Text>;
const WebComponent = () => <Text>I am on a Browser</Text>;

const MyView = responsive(styled.View`
    flex: 1
    justify-content: center
    align-items: center
    background-color: ${({theme}) => theme.colors.red}
`)({
  S: `
        background-color: ${({theme}) => theme.colors.white}
    `,
});

export default About;
