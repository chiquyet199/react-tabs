import React from "react";
import {number, string} from "prop-types";
import AccordionWithCountTitle from "./AccordionWithCountTitle";
import {Accordion} from "./Accordion";

export const AccordionWithCount = props => (
  <Accordion
    title={({collapsible}) => (
      <AccordionWithCountTitle
        {...{
          ...props,
          collapsible,
        }}
      />
    )}
  >
    {props.children}
  </Accordion>
);

AccordionWithCount.propTypes = {
  headerIconName: string.isRequired,
  headerCount: number.isRequired,
  title: string.isRequired,
};

export default AccordionWithCount;
