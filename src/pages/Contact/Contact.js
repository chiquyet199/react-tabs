import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import {colors} from "../../constants/theme.js";

export class Contact extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Contact Page</Text>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
  },
});

export default Contact;
