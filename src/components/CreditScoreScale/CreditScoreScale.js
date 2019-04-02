import React, {Component} from "react";
import styled from "styled-components/native";
import {colors} from "../../constants/theme";
import {PageTitle} from "../../components/common/layout";
import {getScoreLevel, SCORE_MAX_VALUE} from "../../constants/credit-score";

export const TextContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ContentContainer = styled.View`
  max-width: 300px;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  align-self: center;
  position: relative;
`;

export const ScaleImage = styled.Image`
  width: 220px;
  height: 178px;
`;

export const Heading = styled(PageTitle)`
  font-size: 20px;
  line-height: 20px;
  color: ${colors.dark};
  font-weight: 300;
  margin-bottom: 5px;
`;

export const LargeText = styled(PageTitle)`
  font-size: 55px;
  line-height: 55px;
  color: ${colors.dark};
`;

export const SmallText = styled.Text`
  font-size: 9px;
  line-height: 10px;
  color: ${colors.dark};
  padding-top: 3px;
  padding-horizontal: 15px;
  text-align: ${({left}) => (left ? "left" : "center")};
`;

export default class CreditScoreScale extends Component {
  getScaleImg = scoreLevel => {
    let scaleImg;
    switch (scoreLevel) {
      case "POOR":
        scaleImg = require("../../assets/rent_passport/financial/POOR.png");
        break;
      case "GOOD":
        scaleImg = require("../../assets/rent_passport/financial/GOOD.png");
        break;
      case "FAIR":
        scaleImg = require("../../assets/rent_passport/financial/FAIR.png");
        break;
      case "EXCELLENT":
        scaleImg = require("../../assets/rent_passport/financial/EXCELLENT.png");
        break;
      default:
        scaleImg = require("../../assets/rent_passport/financial/VERY_POOR.png");
    }

    return scaleImg;
  };

  renderScale = () => {
    const {translations, creditScore} = this.props;

    return (
      <TextContainer>
        <Heading>{translations.credit_score_label}</Heading>
        <LargeText>{creditScore}</LargeText>
        <SmallText>{`${
          translations.credit_score_out_of
        } ${SCORE_MAX_VALUE}`}</SmallText>
      </TextContainer>
    );
  };

  render() {
    const {creditScore, scaleImages} = this.props;
    let scaleImg;
    if (Object.keys(scaleImages).length) {
      scaleImg = scaleImages[getScoreLevel(creditScore)];
    } else {
      scaleImg = this.getScaleImg(getScoreLevel(creditScore));
    }

    return (
      <ContentContainer>
        <ScaleImage source={scaleImg} />
        {this.renderScale()}
      </ContentContainer>
    );
  }
}
