import React, {Component} from "react";
import {TouchableOpacity, View} from "react-native";
import {bool, func} from "prop-types";
import Collapsible from "react-native-collapsible";
import {isWeb} from "../../utils/common";

export const CompatibleCollapsible = props => {
  return isWeb ? (
    <View>{props.collapsed ? null : props.children}</View>
  ) : (
    <Collapsible {...props}>{props.children}</Collapsible>
  );
};
CompatibleCollapsible.propTypes = {
  collapsed: bool,
};

export class Accordion extends Component {
  state = {
    collapsed: true,
  };

  handlePress = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const {title: Title} = this.props;

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Title collapsed={this.state.collapsed} />
        <CompatibleCollapsible collapsed={this.state.collapsed}>
          {this.props.children}
        </CompatibleCollapsible>
      </TouchableOpacity>
    );
  }
}

Accordion.propTypes = {
  title: func.isRequired,
};

export default Accordion;
