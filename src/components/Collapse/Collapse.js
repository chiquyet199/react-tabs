import React, {Component} from "react";
import {View, TouchableOpacity, Animated, StyleSheet} from "react-native";
import {colors} from "../../constants/theme";
import {func, bool} from "prop-types";
import {isWeb} from "../../utils/common";

export class Collapse extends Component {
  state = {
    animation: new Animated.Value(),
    minHeight: 0,
    maxHeight: 0,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.collapsed !== this.props.collapsed;
  }

  _onToggle = () => {
    const {animation} = this.state;
    const {collapsed, onToggle} = this.props;
    const initialValue = collapsed
      ? this.state.minHeight
      : this.state.maxHeight + this.state.minHeight;

    const finalValue = collapsed
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight;

    animation.setValue(initialValue);
    Animated.spring(animation, {
      toValue: finalValue,
    }).start();
    onToggle();
  };

  _setMinHeight = event => {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  };

  _setMaxHeight = event => {
    this.setState({
      maxHeight: event.nativeEvent.layout.height,
    });
    const {animation, minHeight} = this.state;
    const {collapsed} = this.props;
    if (collapsed && isWeb) {
      animation.setValue(minHeight);
      Animated.spring(animation, {
        toValue: minHeight,
      }).start();
    }
  };

  render() {
    let header = null;
    let body = null;
    React.Children.forEach(this.props.children, child => {
      if (child.props.type === "header") {
        header = (
          <TouchableOpacity onPress={this._onToggle}>{child}</TouchableOpacity>
        );
      } else if (child.props.type === "body") {
        body = child;
      }
    });

    return (
      <Animated.View
        {...this.props}
        style={[styles.container, {height: this.state.animation}]}
      >
        <View onLayout={this._setMinHeight}>{header}</View>
        <View onLayout={this._setMaxHeight}>{body}</View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: 10,
    overflow: "hidden",
  },
});

Collapse.propTypes = {
  collapsed: bool.isRequired,
  onToggle: func.isRequired,
};

export default Collapse;
