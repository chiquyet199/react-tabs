import React from "react";
import {ListSpace} from "./RentPassportList.styles";
import RentPassportItem from "./RentPassportList";

const RentPassportList = ({items, complete}) => (
  <ListSpace>
    {items.map(item => (
      <RentPassportItem key={item.title} item={item} complete={complete} />
    ))}
  </ListSpace>
);

RentPassportList.defaultProps = {
  items: [],
};

export default RentPassportList;
