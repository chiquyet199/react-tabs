import {Platform, StyleSheet} from "react-native";
import {colors} from "../../constants/theme";

export const styles = StyleSheet.create({
  picker: {
    ...Platform.select({
      ios: {
        position: "absolute",
        width: "100%",
        left: 0,
      },
      android: {
        margin: 2,
        marginTop: 10,
        width: "25%",
        height: 30,
      },
    }),
    backgroundColor: `${colors.white}`,
  },
  button: {
    margin: 2,
    marginTop: 10,
    justifyContent: "flex-end",
    height: 20,
  },
});
