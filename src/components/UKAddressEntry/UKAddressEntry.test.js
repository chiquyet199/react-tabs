import React from "react";
import {shallow} from "enzyme";
import {Platform} from "react-native";
import UKAddressEntry from "./UKAddressEntry";
import FormPage from "../FormPage";
import AddressSchema from "../../schemas/UKAddressSchema";
import Dialog from "../Dialog";
import _ from "underscore";

describe("UKAddressEntry tests", () => {
  it("renders proper snapshot - " + Platform.OS, () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it("renders Postcode entry by default", () => {
    const form = getComponent().find(FormPage);
    const schemaProps = form.find(FormPage).prop("schema");
    expect(form).toHaveProp("schema");
    expect(schemaProps).toEqual(
      schemaProps,
      expect.objectContaining(AddressSchema.ukPostcodeEntry().properties),
    );
  });

  it("switches to manual entry when onAddressNotListed is invoked", () => {
    const component = getComponent();
    const form = component.find(FormPage);
    const schemaProps = form.find(FormPage).prop("schema");
    form.prop("schema").properties.postcode.onAddressNotListed();
    component.update();
    expect(form).toHaveProp("schema");
    expect(schemaProps).toEqual(
      schemaProps,
      expect.objectContaining(AddressSchema.ukManualEntry().properties),
    );
  });

  it("disables submit button when in postcode entry", () => {
    const form = getComponent().find(FormPage);
    expect(form).toHaveProp("omitSubmit", true);
  });

  it("enables submit button when in manual entry", () => {
    const component = getComponent();
    const form = component.find(FormPage);
    form.prop("schema").properties.postcode.onAddressNotListed();
    component.update();
    expect(component.find(FormPage)).toHaveProp("omitSubmit", false);
  });

  it("passes address selected property to FormPage schema", () => {
    const onAddressSelected = jest.fn();
    const schema = getComponent({onAddressSelected})
      .find(FormPage)
      .prop("schema");
    const schemaAddressSelected = schema.properties.postcode.onAddressSelected;
    const address = {
      line1: "1 High Street",
      line2: "Stillington",
      town: "York",
    };
    schemaAddressSelected(address);
    expect(onAddressSelected).toHaveBeenCalledWith(address);
  });

  it("passes save property to FormPage", () => {
    const save = () => {};
    const form = getComponent({save}).find(FormPage);
    expect(form).toHaveProp("onSubmit", save);
  });

  it("doesn't display confirm dialog by default", () => {
    expect(getComponent().find(Dialog)).toHaveProp("isOpen", false);
  });

  it("displays confirm dialog when address selected", () => {
    expect(getComponentWithDialog().find(Dialog)).toHaveProp("isOpen", true);
  });

  it("dialog confirm submits form", () => {
    const save = jest.fn();
    const address = "1 High Street, Stillington, York, YO60 7PD";
    const component = getComponentWithDialog(getComponent({save}), address);
    const dialog = component.find(Dialog);
    dialog.prop("onDialogConfirm")();
    component.update();
    expect(save).toHaveBeenCalledWith(address);
  });

  it("dialog cancel hides dialog", () => {
    const component = getComponentWithDialog();
    component.find(Dialog).prop("onDialogCancel")();
    component.update();
    expect(component.find(Dialog)).toHaveProp("isOpen", false);
  });

  it("dialog close hides dialog", () => {
    const component = getComponentWithDialog();
    component.find(Dialog).prop("onClose")();
    component.update();
    expect(component.find(Dialog)).toHaveProp("isOpen", false);
  });

  it("passes address to dialog", () => {
    const address = {
      line1: "1 High Street",
      line2: "Stillington",
      town: "York",
      postCode: "YO60 7PD",
    };

    expect(getComponentWithDialog(undefined, address).find(Dialog)).toHaveProp(
      "paragraph",
      "1\u00A0High\u00A0Street, Stillington, York, YO60\u00A07PD",
    );
  });

  it("includes header in schema", () => {
    const header = "header";
    const component = getComponent({header});
    const schema = component.find(FormPage).prop("schema");
    expect(schema.header).toBe(header);
  });

  it("includes infoManual and infoPostcode in schema if provided", () => {
    const infoManual = "infoManual";
    const infoPostcode = "infoPostcode";
    const component = getComponent({
      infoManual,
      infoPostcode,
    });
    const form = component.find(FormPage);
    const schema = form.prop("schema");
    expect(schema.info).toBe(infoPostcode);
    form.prop("schema").properties.postcode.onAddressNotListed();
    component.update();
    const schemaManual = component.find(FormPage).prop("schema");
    expect(schemaManual.info).toBe(infoManual);
  });

  it("use `postcode` key in schema if no fieldName is provided", () => {
    const component = getComponent();
    const schema = component.find(FormPage).prop("schema");
    const [schemaField] = Object.keys(schema.properties);
    expect(schemaField).toBe("postcode");
  });

  it("includes dynamic fieldName in schema as a key", () => {
    const fieldName = "customName";
    const component = getComponent({fieldName});
    const schema = component.find(FormPage).prop("schema");
    const [schemaField] = Object.keys(schema.properties);
    expect(schemaField).toBe(fieldName);
  });

  const getComponentWithDialog = (
    component = getComponent(),
    address = "address",
  ) => {
    const {onAddressSelected} = component
      .find(FormPage)
      .prop("schema").properties.postcode;
    onAddressSelected(address);
    component.update();

    return component;
  };

  const getComponent = props => {
    const parsedProps = _.extend(
      {
        globaltheme: "",
        onAddressSelected: null,
        save: () => {},
        translations: {
          confirm: "confirm",
          chooseAnother: "chooseAnother",
        },
      },
      props,
    );

    return shallow(<UKAddressEntry {...parsedProps} />);
  };
});
