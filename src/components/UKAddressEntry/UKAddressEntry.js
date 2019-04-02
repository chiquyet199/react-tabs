import React, {Component} from "react";
import FormPage from "../FormPage";
import {
  UKAddressEntrySchemaFragmentGenerator,
  AddressEntryStateEnum,
} from "../../utils/SchemaFragmentGenerators/SchemaFragmentGenerators";
import {func, shape, string} from "prop-types";
import Dialog from "../Dialog";
import {formatAddress} from "../../utils/string";

export default class UKAddressEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressEntry: AddressEntryStateEnum.POSTCODE,
      addressToConfirm: "",
      confirmedAddress: "",
    };
  }

  handleOnAddressSelected = addressToConfirm => {
    const {onAddressSelected} = this.props;
    if (onAddressSelected) {
      onAddressSelected(addressToConfirm);
    }

    this.setState({
      addressToConfirm,
    });
  };

  handleOnAddressNotListed = () => {
    this.setState({
      addressEntry: AddressEntryStateEnum.MANUAL,
    });
  };

  handleDialogConfirm = () => {
    this.setState(
      {
        confirmedAddress: this.state.addressToConfirm,
      },
      () => {
        this.props.save(this.state.confirmedAddress);
      },
    );
  };

  handleDialogCancel = () => {
    this.setState({
      addressToConfirm: "",
    });
  };

  render() {
    const {
      globaltheme,
      save,
      translations,
      fieldName = "postcode",
      header,
      infoManual,
      infoPostcode,
    } = this.props;
    const schema = UKAddressEntrySchemaFragmentGenerator(
      this.state.addressEntry,
      this.handleOnAddressSelected,
      this.handleOnAddressNotListed,
      header,
      infoManual,
      infoPostcode,
      fieldName,
    );

    const omitSubmit =
      this.state.addressEntry === AddressEntryStateEnum.POSTCODE;

    return (
      <React.Fragment>
        <Dialog
          cancelButtonText={translations.chooseAnother}
          confirmButtonText={translations.confirm}
          globaltheme={globaltheme}
          onClose={this.handleDialogCancel}
          onDialogConfirm={this.handleDialogConfirm}
          onDialogCancel={this.handleDialogCancel}
          paragraph={formatAddress(this.state.addressToConfirm, true)}
          isOpen={this.state.addressToConfirm !== ""}
        />
        <FormPage schema={schema} omitSubmit={omitSubmit} onSubmit={save} />
      </React.Fragment>
    );
  }
}

UKAddressEntry.propTypes = {
  globaltheme: string.isRequired,
  onAddressSelected: func,
  save: func.isRequired,
  header: string,
  infoManual: string,
  infoPostcode: string,
  fieldName: string,
  translations: shape({
    confirm: string,
    chooseAnother: string,
  }),
};
