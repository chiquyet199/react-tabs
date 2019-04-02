import AddressSchema from "../../schemas/PastAddressSchema";
import AddressEntry from "./PastAddresses";
import {ManualAddressEntry} from "./AbstractPastAddresses";
import FormPage from "../../components/FormPage/";
import React from "react";
import {shallow} from "enzyme";
import {Alert} from "react-native";
import {isWeb} from "../../utils/common";
import _ from "underscore";

describe("Address page tests", () => {
  const u = undefined;
  it("starts on uk postcode entry address page", () => {
    const formPage = getComponent().find(FormPage);
    expect(formPage.prop("schema")).toEqual(
      expect.objectContaining(AddressSchema.ukPostcodeEntry),
    );
  });

  it("passes address selected handler to postcode component", () => {
    const formPage = getComponent().find(FormPage);
    expect(
      formPage.prop("schema").properties.postcode.onAddressSelected,
    ).toBeInstanceOf(Function);
  });

  it("hides submit button when on postcode component", () => {
    const formPage = getComponent().find(FormPage);
    expect(formPage.prop("omitSubmit")).toBeTruthy();
  });

  it("shows submit button when not on postcode component", () => {
    const component = getComponent();
    const manualEntrySwitch = component.find(ManualAddressEntry);
    manualEntrySwitch.simulate("click");
    component.update();
    expect(component.find(FormPage).prop("omitSubmit")).toBeFalsy();
  });

  it("displays current address heading when no addresses provided", () => {
    const translations = getMockTranslations();
    const schema = getComponent(u, u, u, translations)
      .find(FormPage)
      .prop("schema");
    expect(schema.header).toBe(translations.currently_live_header);
  });

  it("displays previous address heading when addresses provided", () => {
    const translations = getMockTranslations();
    const addresses = [
      {
        address: {
          addressLine1: "3 High Street",
          addressLine2: "Stillington",
          settlement: "York",
          postcode: "YO61 1LG",
        },
        residenceType: "rentFromLandlord",
        livedHereSince: "2018-1-1",
      },
    ];
    const schema = getComponent(u, u, addresses, translations)
      .find(FormPage)
      .prop("schema");
    expect(schema.header).toBe(translations.previously_live_header);
  });

  it("displays current living situation heading when no addresses provided", () => {
    const translations = getMockTranslations();
    const component = getComponent(u, u, u, translations);
    const schema = windForward(component, [
      {address: "3 High Street, Stillington, York. YO61 1LG"},
    ]);
    expect(schema.header).toBe(translations.current_living_situation_header);
  });

  it("displays previous living situation heading when addresses provided", () => {
    const translations = getMockTranslations();
    const addresses = [
      {
        address: {
          addressLine1: "3 High Street",
          addressLine2: "Stillington",
          settlement: "York",
          postcode: "YO61 1LG",
        },
        residenceType: "rentFromLandlord",
        livedHereSince: "2018-1-1",
      },
    ];
    const component = getComponent(u, u, addresses, translations);
    const schema = windForward(component, [
      {address: "1 High Street, Stillington, York. YO61 1LG"},
    ]);
    expect(schema.header).toBe(translations.previous_living_situation_header);
  });

  it("displays confimation when address selected", () => {
    const alertSpy = jest.fn();
    if (isWeb) {
      global.confirm = alertSpy;
    } else {
      Alert.alert = alertSpy;
    }
    const formPage = getComponent().find(FormPage);
    const address = "Any old where";
    formPage.prop("schema").properties.postcode.onAddressSelected(address);
    if (isWeb) {
      expect(alertSpy).toHaveBeenCalledWith(address);
    } else {
      expect(alertSpy).toHaveBeenCalledWith(
        address,
        u,
        expect.arrayContaining([
          {text: "Choose Another", style: "cancel"},
          {text: "Continue", onPress: expect.any(Function)},
        ]),
      );
    }
  });

  it("displays manual entry when onAddressNotListed raised", () => {
    const component = getComponent();
    component
      .find(FormPage)
      .prop("schema")
      .properties.postcode.onAddressNotListed();
    component.update();
    expect(component.find(FormPage).prop("schema")).toEqual(
      expect.objectContaining(AddressSchema.ukManualEntry),
    );
  });

  it("switches to current living situation when alert is positively dismissed", () => {
    const alertSpy = jest.fn();
    let okAction;
    if (isWeb) {
      alertSpy.mockReturnValue(true);
      global.confirm = alertSpy;
    } else {
      alertSpy.mockImplementation((address, message, buttons) => {
        okAction = buttons[1].onPress;
      });
      Alert.alert = alertSpy;
    }
    const component = getComponent();
    component
      .find(FormPage)
      .prop("schema")
      .properties.postcode.onAddressSelected("Any old where");
    if (okAction) {
      okAction();
    }
    component.update();
    expect(component.find(FormPage).prop("schema")).toEqual(
      expect.objectContaining(AddressSchema.livingSituationCurrent),
    );
  });

  it("web - doesn't switch to current living situation when alert is negatively dismissed", () => {
    if (isWeb) {
      const alertSpy = jest.fn();
      alertSpy.mockReturnValue(false);
      global.confirm = alertSpy;
      const component = getComponent();
      component
        .find(FormPage)
        .prop("schema")
        .properties.postcode.onAddressSelected("Any old where");
      component.update();
      expect(component.find(FormPage).prop("schema")).toEqual(
        expect.objectContaining(AddressSchema.ukPostcodeEntry),
      );
    }
  });

  it("native - cancel action doesn't provide any onPress callback", () => {
    if (!isWeb) {
      const alertSpy = jest.fn();
      Alert.alert = alertSpy;
      const formPage = getComponent().find(FormPage);
      formPage
        .prop("schema")
        .properties.postcode.onAddressSelected("Any old where");
      const [firstCall] = alertSpy.mock.calls;
      const buttonsParam = firstCall[2];
      const cancelButtonParams = buttonsParam.find(
        param => param.style === "cancel",
      );
      expect(cancelButtonParams.onPress).toBeUndefined();
    }
  });

  it("switches to manual address entry when relevant text clicked", () => {
    const component = getComponent();
    const manualEntrySwitch = component.find(ManualAddressEntry);
    manualEntrySwitch.simulate("click");
    component.update();
    expect(component.find(FormPage).prop("schema")).toEqual(
      expect.objectContaining(AddressSchema.ukManualEntry),
    );
  });

  it("switches to international address entry when a country other than the UK is selected", () => {
    const component = getComponent();
    const schema = component.find(FormPage).prop("schema");
    schema.properties.country.onChange("US");
    component.update();
    expect(component.find(FormPage).prop("schema")).toEqual(
      expect.objectContaining(AddressSchema.internationalEntry),
    );
  });

  it("switches to current living situation on first address submitted", () => {
    const component = getComponent();
    const schema = windForward(component, [
      {address: "3 High Street, Stillington, York. YO61 1LG"},
    ]);
    expect(schema).toEqual(
      expect.objectContaining(AddressSchema.livingSituationCurrent),
    );
  });

  it("switches to current living situation on manual address entry submitted", () => {
    const component = getComponent();
    const schema = windForward(component, [
      {
        addressLine1: "3 High Street",
        addressLine2: "Stillington",
        settlement: "York",
        postcode: "YO61 1LG",
      },
    ]);
    expect(schema).toEqual(
      expect.objectContaining(AddressSchema.livingSituationCurrent),
    );
  });

  it("dispatches next after selecting address and entering living situation", () => {
    const next = jest.fn();
    const component = getComponent(next);
    const formValues = [
      "3 High Street, Stillington, York. YO61 1LG",
      {residenceType: "rentFromLandlord", livedHereSince: "2018-1-1"},
    ];
    windForward(component, formValues);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        values: expect.arrayContaining([
          _.extend({address: formValues[0]}, formValues[1]),
        ]),
      }),
    );
  });

  it("dispatches next after manual address entry and living situation", () => {
    const next = jest.fn();
    const component = getComponent(next);
    const formValues = [
      {
        addressLine1: "3 High Street",
        addressLine2: "Stillington",
        settlement: "York",
        postcode: "YO61 1LG",
      },
      {residenceType: "rentFromLandlord", livedHereSince: "2018-1-1"},
    ];
    windForward(component, formValues);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        values: expect.arrayContaining([
          _.extend({address: formValues[0]}, formValues[1]),
        ]),
      }),
    );
  });

  describe("Page navigation after saving", () => {
    it("dispatches goTo to /request-property-reference after entering living situation where residenceType is rentFromLandlord", () => {
      const goTo = jest.fn();
      const component = getComponent(u, goTo);
      const formValues = [
        {address: "3 High Street, Stillington, York. YO61 1LG"},
        {residenceType: "rentFromLandlord", livedHereSince: "2018"},
      ];
      windForward(component, formValues);
      expect(goTo).toHaveBeenCalledWith("/request-property-reference");
    });

    it("dispatches goTo to /request-property-reference after entering living situation where residenceType is rentFromAgent", () => {
      const goTo = jest.fn();
      const component = getComponent(u, goTo);
      const formValues = [
        {address: "3 High Street, Stillington, York. YO61 1LG"},
        {residenceType: "rentFromAgent", livedHereSince: "2018"},
      ];
      windForward(component, formValues);
      expect(goTo).toHaveBeenCalledWith("/request-property-reference");
    });

    it("dispatches goTo to /address-added after entering living situation where residenceType is anything else", () => {
      const goTo = jest.fn();
      const component = getComponent(u, goTo);
      const formValues = [
        {address: "3 High Street, Stillington, York. YO61 1LG"},
        {residenceType: "anyOtherType", livedHereSince: "2018"},
      ];
      windForward(component, formValues);
      expect(goTo).toHaveBeenCalledWith("/address-added");
    });
  });

  const windForward = (component, submitValues) => {
    for (let x = 0; x < submitValues.length; x += 1) {
      const formSubmit = component.find(FormPage).prop("onSubmit");
      formSubmit(submitValues[x]);
      component.update();
    }

    return component.find(FormPage).prop("schema");
  };

  const getComponent = (
    next = () => {},
    goTo = () => {},
    addresses = [],
    translations = getMockTranslations(),
  ) => {
    return shallow(
      <AddressEntry
        next={next}
        goTo={goTo}
        addresses={addresses}
        translations={translations}
      />,
    );
  };

  const getMockTranslations = () => {
    return {
      add_address_manually: "Add address manually",
      currently_live_header: "currently_live_header",
      previously_live_header: "previously_live_header",
      current_living_situation_header: "current_living_situation_header",
      previous_living_situation_header: "previous_living_situation_header",
    };
  };
});
