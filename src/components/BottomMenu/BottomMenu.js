import React from "react";
import {ButtonBar} from "../common/layout";
import {MenuButton} from "../Button";
import {themed} from "../../utils/common";

const generateMenuButtonKey = (item, location) => {
  const text = item.text.replace(" ", "_");
  const type = location.startsWith(item.routePrefix) ? "secondary" : "tertiary";

  return `key_${text}_${type}`;
};

export const BottomMenu = ({items, location, go, theme}) =>
  (items.find(item => item.routePrefix === location) || null) && (
    <ButtonBar isMenu>
      {items.map(item => (
        <MenuButton
          theme={theme}
          key={generateMenuButtonKey(item, location)}
          type={
            location.startsWith(item.routePrefix) ? "secondary" : "tertiary"
          }
          name={item.icon}
          onClick={() => go(item.routePrefix)}
        >
          {item.text}
        </MenuButton>
      ))}
    </ButtonBar>
  );

export default themed(BottomMenu);
