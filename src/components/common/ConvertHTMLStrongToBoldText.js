import React from "react";
import {Text} from "react-native";
import styled from "styled-components/native";

export const StyledView = styled(Text)`
  display: inline;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default ({htmlString}) => {
  const parsed = [];
  let cursor = 0;
  let searchingFor = "<strong>";
  while (cursor < htmlString.length) {
    let endPoint = htmlString.indexOf(searchingFor, cursor);
    endPoint = endPoint === -1 ? htmlString.length : endPoint;
    const token = htmlString.substring(cursor, endPoint);
    if (searchingFor === "<strong>") {
      parsed.push(<Text key={token}>{token}</Text>);
    } else {
      // Styled-components seems to ignore font-weight here
      parsed.push(
        <Text style={{fontWeight: "bold"}} key={token}>
          {token}
        </Text>,
      );
    }
    cursor = endPoint + searchingFor.length;
    searchingFor = searchingFor === "<strong>" ? "</strong>" : "<strong>";
  }

  return <StyledView>{parsed}</StyledView>;
};
