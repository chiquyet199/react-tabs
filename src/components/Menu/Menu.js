import React from "react";
import {View, StyleSheet, TouchableHighlight, Text} from "react-native";
import {withTheme} from "styled-components";

export const routes = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/About",
    label: "About",
  },
  {
    to: "/TermsAndConditions",
    label: "Terms & Conditions",
  },
  {
    to: "/Contact",
    label: "Contact",
  },
  {
    to: "/welcome",
    label: "Welcome",
  },
];

export const Menu = ({isLoggedIn, showMenu, goTo, goBack}) =>
  isLoggedIn &&
  showMenu && (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => goBack(1)}>
        <Text>Back</Text>
      </TouchableHighlight>
      {routes.map(route => (
        <TouchableHighlight
          onPress={() => goTo(route.to)}
          key={`menuLink_${route.label}`}
          style={styles.link}
        >
          <Text>{route.label}</Text>
        </TouchableHighlight>
      ))}
      {/* <LocalePicker /> */}
    </View>
  );

export const styles = StyleSheet.create({
  container: {
    height: "70px",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  link: {
    margin: "2px",
    marginTop: "10px",
    height: "20px",
  },
  linkText: {
    color: "#04f",
    fontSize: 16,
  },
});

export default withTheme(Menu);
