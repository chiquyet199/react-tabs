import {initialState} from "../../__mocks__/initialState";
import configureStore from "redux-mock-store";
import {shallow} from "enzyme/build/index";
import {GeneratingRentPassport} from "./GeneratingRentPassport";
import React from "react";
import themes from "../../constants/theme";

const theme = themes.selva;
const mockProps = {
  translations: {
    generating_rent_passport_title:
      initialState.locale.translations.generating_rent_passport_title,
    generating_rent_passport_sub_title:
      initialState.locale.translations.generating_rent_passport_sub_title,
    generating_rent_passport_action:
      initialState.locale.translations.generating_rent_passport_action,
  },
  theme,
};

const mockStore = configureStore(mockProps);
describe("Testing TenantReferenceRequestUpload snapshot", () => {
  const wrapper = shallow(<GeneratingRentPassport {...mockProps} />, {
    context: {store: mockStore(initialState)},
  });
  it("renders as expected", () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
