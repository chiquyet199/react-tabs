import React, {Component} from "react";
import {Dimensions} from "react-native";
import {TabView, SceneMap} from "react-native-tab-view";
import {array, object} from "prop-types";
import {themed} from "../../utils/common";
import {TabItem} from "./TabItem";

export class Tabs extends Component {
  state = {
    index: this.props.index || 0,
    scene: SceneMap(this.props.scene),
    routes: this.props.routes,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.scene !== state.scene) {
      return {
        scene: SceneMap(props.scene),
      };
    }

    return null;
  }

  render() {
    const {theme, globaltheme} = this.props;
    const {index, routes, scene} = this.state;

    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={scene}
        onIndexChange={idx => this.setState({index: idx})}
        initialLayout={{width: Dimensions.get("window").width, height: 47}}
        renderTabBar={props => TabItem({theme, globaltheme, ...props})}
      />
    );
  }
}

Tabs.propTypes = {
  scene: object.isRequired,
  routes: array.isRequired,
};

export default themed(Tabs);
