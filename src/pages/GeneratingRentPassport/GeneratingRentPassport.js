import React, {Component} from "react";
import styled from "styled-components/native";
import {PageTitle, TextParagraph} from "../../components/common/layout";
import {withTheme} from "styled-components";
import {sleep} from "../../utils/common";
import Spinner from "../../components/Spinner";

export class GeneratingRentPassport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  _onLoad = async () => {
    const {goTo} = this.props;
    this.setState({isLoading: true});
    await sleep(5000);
    this.setState({isLoading: false});
    goTo("/rent-passport");
  };

  componentDidMount() {
    this._onLoad();
  }

  render() {
    const {translations, theme, globaltheme} = this.props;
    const {isLoading} = this.state;
    const houseImg = require("../../assets/house/house.png");

    return (
      <Container>
        <Spinner visible={isLoading} color={theme.colors.primary} />
        <ContentContainer>
          <ImgContainer>
            <HouseImage source={houseImg} resize="cover" />
          </ImgContainer>
          <PageTitle theme={theme} globaltheme={globaltheme}>
            {translations.generating_rent_passport_title}
          </PageTitle>
          <SubTitleTextParagraph theme={theme} globaltheme={globaltheme}>
            {translations.generating_rent_passport_sub_title}
          </SubTitleTextParagraph>

          <GreenTextParagraph theme={theme} globaltheme={globaltheme}>
            {translations.generating_rent_passport_action}
          </GreenTextParagraph>
        </ContentContainer>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  flex-basis: initial;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;

const ContentContainer = styled.View`
  max-width: 350px;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
`;

export const HouseImage = styled.Image`
  width: 300px;
  height: 152px;
`;

const ImgContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const SubTitleTextParagraph = styled(TextParagraph)`
  text-align: center;
`;
export const GreenTextParagraph = styled(TextParagraph)`
  text-align: center;
  color: ${({theme}) => theme.colors.canopyGreen};
`;

export default withTheme(GeneratingRentPassport);
