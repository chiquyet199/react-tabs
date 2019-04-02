import React, {Fragment} from "react";
import {connect} from "react-redux";
import {shape, string} from "prop-types";
import styledNative from "styled-components/native";
import LeaseSpec from "../../utils/api/specs/LeaseSpec";
import {Accordion, AccordionWithIconTitle} from "../Accordion";
import {
  HorizontalStack,
  Section,
  ThemedIcon,
  ThemedText,
} from "./ActiveTenancy.styles";

const UserName = styledNative(ThemedText)`
  font-size: 16;
  font-weight: bold;
`;

export const Housemates = ({lease, translations}) => (
  <Accordion
    title={({collapsed}) => (
      <AccordionWithIconTitle
        headerIconName="group"
        title={translations.title}
        subTitle={translations.subTitle}
        collapsed={collapsed}
      />
    )}
  >
    <Fragment>
      {lease.renters.map(renter => (
        <Section key={renter.userId}>
          <HorizontalStack>
            <ThemedIcon name="rent-passport" size={46} />
            <UserName>{`${renter.firstName} ${renter.lastName}`}</UserName>
          </HorizontalStack>
        </Section>
      ))}
    </Fragment>
  </Accordion>
);

Housemates.propTypes = {
  lease: LeaseSpec,
  translations: shape({
    title: string.isRequired,
    subTitle: string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  translations: state.locale.translations.common.housemates,
});

export default connect(mapStateToProps)(Housemates);
