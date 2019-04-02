import React, {Component} from "react";
import styled from "styled-components/native";
import {array} from "prop-types";
import {themed} from "../../utils/common";

const Container = styled.View`
  flex: 1;
`;

const TabsContainer = styled.View`
  flex-direction: row;
`;

export const TabContainer = themed(styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${({active, globaltheme, theme}) =>
    active
      ? theme[globaltheme].tabs.borderBottom
      : theme.colors.semiTransparent};
`);

const TabText = themed(styled.Text`
  font-weight: bold;
  text-align: center;
  opacity: 1;
  color: ${({active, globaltheme, theme}) =>
    active
      ? theme[globaltheme].tabs.activeText
      : theme[globaltheme].tabs.inactiveText};
  text-transform: none;
`);

export class WebTabs extends Component {
  state = {
    index: this.props.index || 0,
  };

  handleTabChange = (index, onClick) => {
    if (onClick) {
      if (onClick() !== false) {
        this.setState({index});
      }
    } else {
      this.setState({index});
    }
  };

  render() {
    const {children} = this.props;

    if (children === undefined || children.length <= 1) {
      return null;
    }

    return (
      <Container>
        <TabsContainer type="TabsContainer">
          {children.map(({props: {title, onClick}}, index) => (
            <TabContainer
              active={index === this.state.index}
              onPress={() => this.handleTabChange(index, onClick)}
              key={title}
            >
              <TabText active={index === this.state.index}>{title}</TabText>
            </TabContainer>
          ))}
        </TabsContainer>
        <Container type="ContentContainer">
          {children[this.state.index]}
        </Container>
      </Container>
    );
  }
}

WebTabs.propTypes = {
  children: array,
};

export default WebTabs;
