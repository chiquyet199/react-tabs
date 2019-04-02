import React from "react";
import styled from "styled-components/native";
import {TabBar} from "react-native-tab-view";
import {themed} from "../../utils/common";

const StyledLabel = themed(styled.Text`
  margin: 8px;
  color: ${({theme, globaltheme, active}) =>
    active
      ? theme[globaltheme].tabs.activeText
      : theme[globaltheme].tabs.inactiveText};
  font-weight: bold;
`);

const StyledTabs = styled(TabBar)`
  background-color: ${({theme, globaltheme}) =>
    theme[globaltheme].tabs.background};
`;

export const TabItem = ({active, theme, globaltheme, ...props}) => {
  return (
    <StyledTabs
      theme={theme}
      globaltheme={globaltheme}
      {...props}
      indicatorStyle={{
        backgroundColor: theme[globaltheme].tabs.indicator,
      }}
      renderLabel={({route}) => (
        <StyledLabel
          active={
            active ||
            props.navigationState.routes[props.navigationState.index].title ===
              route.title
          }
        >
          {route.title}
        </StyledLabel>
      )}
    />
  );
};

export default themed(TabItem);
