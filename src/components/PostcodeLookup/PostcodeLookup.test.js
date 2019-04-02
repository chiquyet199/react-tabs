import React from "react";
import {PostcodeLookup, AddressOption, AddressWrapper} from "./PostcodeLookup";
import {shallow} from "enzyme";
import InputField from "../InputField/inputField";
import Button from "../Button";
import _ from "underscore";

describe("PostcodeLookup", () => {
  it("renders a text input for the postcode", () => {
    const wrapper = createElement();
    expect(wrapper.find(InputField)).toHaveLength(1);
  });

  it("labels postcode text input correctly", () => {
    const translations = generateSampleTranslations({postcode: "Postcode"});
    const wrapper = createElement({translations});
    expect(wrapper.find(InputField).prop("label")).toBe(translations.postcode);
  });

  it("doesn't render any address options when no addresses provided", () => {
    const wrapper = createElement();
    expect(wrapper.find(AddressOption)).toHaveLength(0);
  });

  it("creates AddressOption for each address", () => {
    const addresses = generateSampleAddresses(10);
    const wrapper = createElement({addresses});
    expect(wrapper.find(AddressOption)).toHaveLength(addresses.length);
  });

  it("calls the address selected prop on click", () => {
    const addresses = generateSampleAddresses();
    const onAddressSelected = jest.fn();
    const wrapper = createElement({addresses, onAddressSelected});
    wrapper
      .find(AddressWrapper)
      .at(1)
      .simulate("press");
    expect(onAddressSelected).toHaveBeenCalledWith(addresses[1]);
  });

  it("renders primary button to lookup the postcode", () => {
    const wrapper = createElement();
    const button = wrapper.find(Button).first();
    expect(button.prop("type")).toBe("primary");
  });

  it("primary button has translated text", () => {
    const translations = generateSampleTranslations({
      find_address: "find_address",
    });
    const wrapper = createElement({translations});
    expect(wrapper.find(Button).prop("middle")).toBe(translations.find_address);
  });

  it("primary button click fires requestPostcodeLookup", () => {
    const requestPostcodeLookup = jest.fn();
    const wrapper = createElement({requestPostcodeLookup});
    wrapper.find(Button).simulate("click");
    expect(requestPostcodeLookup).toHaveBeenCalled();
  });

  it("displays secondary button once addresses are received", () => {
    const wrapper = createElement({addresses: generateSampleAddresses()});
    expect(wrapper.find(Button).prop("type")).toBe("secondary");
  });

  it("secondary button has translated text", () => {
    const translations = generateSampleTranslations({
      address_not_listed: "address_not_listed",
    });
    const wrapper = createElement({
      addresses: generateSampleAddresses(),
      translations,
    });
    expect(wrapper.find(Button).prop("middle")).toBe(
      translations.address_not_listed,
    );
  });

  it("secondary button click fires addressNotListed", () => {
    const onAddressNotListed = jest.fn();
    const wrapper = createElement({
      addresses: generateSampleAddresses(),
      onAddressNotListed,
    });
    wrapper.find(Button).simulate("click");
    expect(onAddressNotListed).toHaveBeenCalled();
  });

  it("passes entered postcode to requestPostcodeLookup", () => {
    const samplePostcode = "yo61 1lg";
    const requestPostcodeLookup = jest.fn();
    const wrapper = createElement({requestPostcodeLookup});
    const postcodeEntry = wrapper.find(InputField).prop("onChangeText");
    postcodeEntry(samplePostcode);
    wrapper.find(Button).simulate("click");
    expect(requestPostcodeLookup).toHaveBeenCalledWith(
      samplePostcode,
      expect.any(String),
    );
  });

  it("passes GB as country to requestPostcodeLookup", () => {
    const requestPostcodeLookup = jest.fn();
    const samplePostcode = "yo61 1lg";
    const wrapper = createElement({requestPostcodeLookup});
    const postcodeEntry = wrapper.find(InputField).prop("onChangeText");
    postcodeEntry(samplePostcode);
    wrapper.find(Button).simulate("click");
    expect(requestPostcodeLookup).toHaveBeenCalledWith(
      expect.any(String),
      "GB",
    );
  });

  it("calls onChange when address selected", () => {
    const addresses = generateSampleAddresses();
    const onChange = jest.fn();
    const wrapper = createElement({addresses, onChange});
    wrapper
      .find(AddressWrapper)
      .first()
      .simulate("press");
    expect(onChange).toHaveBeenCalledWith(addresses[0]);
  });

  it("requests lookup clear on unmount", () => {
    const clearAddressLookup = jest.fn();
    const wrapper = createElement({clearAddressLookup});
    wrapper.unmount();
    expect(clearAddressLookup).toHaveBeenCalled();
  });
});

const generateSampleTranslations = (translations = {}) => {
  return _.extend(
    {find_address: "", postcode: "", address_not_listed: ""},
    translations,
  );
};

const generateSampleAddresses = (number = 3) => {
  const sampleAddresses = [];
  for (let counter = 0; counter < number; counter += 1) {
    sampleAddresses.push(`${counter + 1} Main Street, Stillington, York`);
  }

  return sampleAddresses;
};

const createElement = props => {
  const parsedProps = {
    addresses: [],
    translations: generateSampleTranslations(),
    requestPostcodeLookup: () => {},
    onAddressSelected: () => {},
    onAddressNotListed: () => {},
    clearAddressLookup: () => {},
    globaltheme: "dark",
    theme: {
      dark: {form: {baseColor: "black", accentColor: "white"}},
      light: {form: {baseColor: "white", accentColor: "black"}},
    },
    onChange: () => {},
    ...props,
  };

  return shallow(<PostcodeLookup {...parsedProps} />);
};
