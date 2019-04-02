import React from "react";
import {View} from "react-native";
import {withTheme} from "styled-components";
import {
  PageContainer,
  ButtonBar,
  PageTitle,
  TextParagraph,
  TextLink,
  PageHeader,
} from "../../components/common/layout";
import Button from "../../components/Button";
import styled from "styled-components/native";
import Modal from "../../components/Modal";

import RentPassportList from "../../components/RentPassportList";

export const RentPassport = ({
  schema,
  showModal,
  user,
  go,
  globaltheme,
  theme,
}) => (
  <React.Fragment>
    <Modal />

    <PageHeader globaltheme={globaltheme} theme={theme}>
      {schema.header}
    </PageHeader>
    <PageContainer full="true" style={{margin: 0}}>
      <TitleSpace>
        <PageTitle globaltheme={globaltheme} theme={theme} left="true">
          {schema.greeting} {user.firstName}
        </PageTitle>
        <TextParagraph globaltheme={globaltheme} theme={theme}>
          {schema.info}
        </TextParagraph>
        <TextLink onClick={() => showModal("whatIsARentPassport")}>
          {schema.linkText}
        </TextLink>
      </TitleSpace>
      <RentPassportList items={schema.listItems} />
      <View
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <ButtonBar>
          <Button
            middle={schema.button.text}
            type={schema.button.type}
            right="arrow-right"
            onClick={() =>
              go(user.openBanking ? "/your-profile" : "/start-rent-passport")
            }
          />
        </ButtonBar>
      </View>
    </PageContainer>
  </React.Fragment>
);

const TitleSpace = styled.View`
    flex: 3
    width: 100%
    justify-content: flex-end
    flex-direction: column
`;

export default withTheme(RentPassport);
