import React from "react";
import {View} from "react-native";
import {
  Container,
  RentPassportListItemContainer,
  RentPassportListItemIcon,
  RentPassportListItemDetails,
  Status,
  StatusIcon,
  StatusText,
  ListItemSpacer,
  Title,
  Info,
} from "./RentPassportList.styles";
import {bool, number, oneOfType, shape, string} from "prop-types";

export default Object.assign(
  ({complete = false, item}) => (
    <Container>
      <RentPassportListItemContainer style={{marginTop: 10}}>
        <ListItemSpacer>
          <RentPassportListItemIcon
            complete={complete}
            source={item.icons.main}
          />
        </ListItemSpacer>
        <RentPassportListItemDetails>
          <View>
            <Title complete={complete}>{item.title}</Title>
            <Info complete={complete}>{item.infoText}</Info>
          </View>
        </RentPassportListItemDetails>
      </RentPassportListItemContainer>
      <RentPassportListItemContainer>
        <ListItemSpacer />
        <Status>
          <StatusIcon
            complete={complete}
            name={complete ? item.icons.complete : item.icons.incomplete}
          />
          <StatusText complete={complete}>
            {complete ? item.statusText.complete : item.statusText.incomplete}
          </StatusText>
        </Status>
      </RentPassportListItemContainer>
    </Container>
  ),
  {
    propTypes: {
      complete: bool.isRequired,
      item: shape({
        title: string.isRequired,
        infoText: string.isRequired,
        icons: shape({
          main: oneOfType([number.isRequired, string.isRequired]),
          complete: string.isRequired,
          incomplete: string.isRequired,
          collapsed: oneOfType([number.isRequired, string.isRequired]),
          open: oneOfType([number.isRequired, string.isRequired]),
        }),
        statusText: shape({
          complete: string.isRequired,
          incomplete: string.isRequired,
        }),
      }),
    },
  },
);
