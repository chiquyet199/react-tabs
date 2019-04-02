import React, {Component} from "react";
import {Platform} from "react-native";
import {string, func} from "prop-types";
import {localeOptions} from "../../utils/locales/index";
import Picker from "../Picker";
import {styles} from "./LocalePicker.style";
import Button from "../../components/Button";

export class LocalePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  onLocaleChange = locale => {
    this.setState({isOpen: false});
    this.props.setLocale(locale);
  };

  openPicker = () => this.setState({isOpen: true});

  render() {
    const {currentLocale} = this.props;
    const {isOpen} = this.state;

    if (!isOpen && Platform.OS === "ios") {
      return (
        <Button
          type="secondary"
          middle="Select locale"
          onClick={this.openPicker}
        />
      );
    }

    return (
      <Picker
        style={[styles.picker]}
        currentValue={currentLocale}
        options={localeOptions}
        onChange={this.onLocaleChange}
      />
    );
  }
}

LocalePicker.propTypes = {
  currentLocale: string,
  setLocale: func,
};
