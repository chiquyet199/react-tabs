import React, {Component} from "react";
import {Text} from "react-native";
import styled from "styled-components/native";

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.lightBlue};
`;

export class NotFound extends Component {
  render() {
    return (
      <StyledView>
        <Text>404 Page Not Found</Text>
      </StyledView>
    );
  }
}

export default NotFound;
