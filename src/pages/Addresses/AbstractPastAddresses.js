import React, {Component} from "react";
import {View, Text} from "react-native";
import AddressSchema from "../../schemas/PastAddressSchema";
import FormPage from "../../components/FormPage";
import _ from "underscore";
import {func, array, shape, string} from "prop-types";
import styled from "styled-components/native";

export const ManualAddressEntryWrapper = styled(View)`
  position: absolute;
  top: 0;
  right: 17px;
  z-index: 3;
`;
export const ManualAddressEntry = styled(Text)`
  color: ${({theme}) => theme.colors.white};
  font-weight: bold;
  line-height: 52px;
  position: relative;
  cursor: pointer;
`;

class AbstractPastAddresses extends Component {
  static defaultProps = {
    addresses: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      addresses: props.addresses,
      selectedManualEntry: false,
      country: "GB",
      newAddress: null,
    };
  }

  handleCountryChange = country => {
    this.setState({country});
  };

  handleAddressSelected = () => {
    throw new Error("should be implemented in subclass");
  };

  handleAddressNotListed = () => {
    this.enableManualEntry();
  };

  hasNoAddressHistory() {
    return !this.state.addresses.length;
  }

  hasPartialAddressHistory() {
    return (
      this.state.addresses.length > 0 &&
      this.state.addresses.length < 3 &&
      this.state.addresses.reduce((accumulator, {durationAtAddress}) => {
        return accumulator + durationAtAddress; // presume durationAtAddress is years expressed as a decimal
      }, 0) < 3
    );
  }

  enableManualEntry() {
    this.setState({
      selectedManualEntry: true,
    });
  }

  ukPostcodeEntry() {
    return !this.state.selectedManualEntry && this.state.country === "GB";
  }

  ukManualEntry() {
    return this.state.selectedManualEntry && this.state.country === "GB";
  }

  internationalEntry() {
    return this.state.country !== "GB";
  }

  hasPendingAddress() {
    return this.state.newAddress !== null;
  }

  onPostcodeEntryView() {
    return !this.hasPendingAddress() && this.ukPostcodeEntry();
  }

  isLivingSituation(submitValues) {
    const keys = Object.keys(submitValues);

    return keys.includes("livedHereSince") && keys.includes("residenceType");
  }

  save = submitValues => {
    const {next, goTo} = this.props;

    if (this.isLivingSituation(submitValues)) {
      next({
        values: [_.extend({address: this.state.newAddress}, submitValues)],
      });
      switch (submitValues.residenceType) {
        case "rentFromAgent":
        case "rentFromLandlord":
          goTo("/request-property-reference");

          return;
        default:
          goTo("/address-added");
      }
    } else {
      this.setState({newAddress: submitValues});
    }
  };

  getBasicSchema() {
    if (this.hasPendingAddress()) {
      if (this.hasNoAddressHistory()) {
        return AddressSchema.livingSituationCurrent;
      }

      return AddressSchema.livingSituationPast;
    }
    if (this.ukPostcodeEntry()) {
      return AddressSchema.ukPostcodeEntry;
    }
    if (this.ukManualEntry()) {
      return AddressSchema.ukManualEntry;
    }
    if (this.internationalEntry()) {
      return AddressSchema.internationalEntry;
    }
    throw new Error("No valid schema available");
  }

  getHeader() {
    const {translations} = this.props;
    if (this.hasPendingAddress()) {
      return this.hasNoAddressHistory()
        ? translations.current_living_situation_header
        : translations.previous_living_situation_header;
    }

    return this.hasNoAddressHistory()
      ? translations.currently_live_header
      : translations.previously_live_header;
  }

  getExtendedSchema() {
    const schema = this.getBasicSchema();
    const extensions = {header: this.getHeader()};

    if (schema.properties.country) {
      const country = _.extend(schema.properties.country, {
        onChange: this.handleCountryChange,
      });
      extensions.properties = _.extend(schema.properties, {country});
    }

    if (schema.properties.postcode) {
      const postcode = _.extend(schema.properties.postcode, {
        onAddressSelected: this.handleAddressSelected,
        onAddressNotListed: this.handleAddressNotListed,
      });
      extensions.properties = _.extend(schema.properties, {postcode});
    }

    return _.extend(schema, extensions);
  }

  render() {
    const schema = this.getExtendedSchema();
    const {translations} = this.props;

    return (
      <React.Fragment>
        <ManualAddressEntryWrapper>
          <ManualAddressEntry
            onClick={() => {
              this.enableManualEntry();
            }}
          >
            {translations.add_address_manually}
          </ManualAddressEntry>
        </ManualAddressEntryWrapper>
        <FormPage
          schema={schema}
          onSubmit={this.save}
          omitSubmit={this.onPostcodeEntryView()}
        />
      </React.Fragment>
    );
  }
}

AbstractPastAddresses.propTypes = {
  next: func.isRequired,
  goTo: func.isRequired,
  addresses: array,
  translations: shape({
    add_address_manually: string.isRequired,
    currently_live_header: string.isRequired,
    previously_live_header: string.isRequired,
    current_living_situation_header: string.isRequired,
    previous_living_situation_header: string.isRequired,
  }),
};

export default AbstractPastAddresses;
