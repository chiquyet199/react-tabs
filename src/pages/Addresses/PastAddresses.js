import AbstractPastAddresses from "./AbstractPastAddresses";
import {Alert} from "react-native";

class PastAddresses extends AbstractPastAddresses {
  handleAddressSelected = address => {
    Alert.alert(address, undefined, [
      {text: "Choose Another", style: "cancel"},
      {
        text: "Continue",
        onPress: () => {
          this.save(address);
        },
      },
    ]);
  };
}

export default PastAddresses;
