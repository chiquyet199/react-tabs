import React from "react";
import {shallow} from "enzyme";
import {initialState} from "../../__mocks__/initialState";
import configureStore from "redux-mock-store";
import CreditScoreScale, {
  TextContainer,
  ContentContainer,
  ScaleImage,
  Heading,
  LargeText,
  SmallText,
} from "./CreditScoreScale";
import locale from "../../utils/locales/en-US";
import {SCORE_MAX_VALUE} from "../../constants/credit-score";

const testImgPath = "FAIR.png";

const mockProps = {
  scaleImages: {},
  creditScore: 800,
  translations: {
    credit_score_label: locale.credit_score_label,
    credit_score_out_of: locale.credit_score_out_of,
  },
};

const mockStore = configureStore(mockProps);
describe("CreditScoreScale", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CreditScoreScale {...mockProps} />, {
      context: {store: mockStore(initialState)},
    });
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders properly TextContainer", () => {
    expect(wrapper.find(TextContainer)).toHaveLength(1);
  });
  it("renders properly ContentContainer", () => {
    expect(wrapper.find(ContentContainer)).toHaveLength(1);
  });

  it("renders properly ScaleImage", () => {
    expect(wrapper.find(ScaleImage)).toHaveLength(1);
  });

  it("renders properly Heading", () => {
    expect(wrapper.find(Heading)).toHaveLength(1);
    expect(wrapper.find(Heading).props().children).toEqual(
      mockProps.translations.credit_score_label,
    );
  });

  it("renders properly LargeText", () => {
    expect(wrapper.find(LargeText)).toHaveLength(1);
    expect(wrapper.find(LargeText).props().children).toEqual(
      mockProps.creditScore,
    );
  });

  it("renders properly SmallText", () => {
    expect(wrapper.find(SmallText)).toHaveLength(1);
    expect(wrapper.find(SmallText).props().children).toEqual(
      `${mockProps.translations.credit_score_out_of} ${SCORE_MAX_VALUE}`,
    );
  });

  it("renders FAIR Image according to given credit score", () => {
    expect(wrapper.find(ScaleImage).prop("source")).toEqual(testImgPath);
  });
});
