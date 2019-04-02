import React, {Fragment} from "react";
import {connect} from "react-redux";
import {shape, string} from "prop-types";
import styledNative from "styled-components/native";
import LeaseSpec from "../../utils/api/specs/LeaseSpec";
import {Accordion, AccordionWithIconTitle} from "../Accordion";
import {
  HorizontalStack,
  Section,
  SectionTitle,
  SectionText,
  ThemedIcon,
} from "./ActiveTenancy.styles";
import {keyFromString} from "../../utils/string";

const DepositDocumentDetails = styledNative.View`
  flex-grow: 1;
`;

export const DepositFree = ({lease, translations}) => (
  <Accordion
    title={({collapsed}) => (
      <AccordionWithIconTitle
        headerIconName="claims"
        title={translations.title}
        subTitle={translations.subTitle}
        collapsed={collapsed}
      />
    )}
  >
    <Fragment>
      {lease.documents.map(document => (
        <Section key={keyFromString(document.type)}>
          <HorizontalStack>
            <DepositDocumentDetails>
              <SectionTitle>{translations.title}</SectionTitle>
              <SectionText>
                {translations.documentTypes[document.type]}
              </SectionText>
            </DepositDocumentDetails>
            <ThemedIcon name="legal" size={32} />
          </HorizontalStack>
        </Section>
      ))}
    </Fragment>
  </Accordion>
);

DepositFree.propTypes = {
  lease: LeaseSpec,
  translations: shape({
    subTitle: string.isRequired,
    title: string.isRequired,
    documentTypes: shape({
      POLICY_SCHEDULE: string.isRequired,
      STATEMENT_OF_FACTS: string.isRequired,
      POLICY_WORDING: string.isRequired,
      INSURANCE_PRODUCT_INFORMATION_DOCUMENT: string.isRequired,
      INSURANCE_SERVICE_INFORMATION_DOCUMENT: string.isRequired,
      AST: string.isRequired,
    }),
  }),
};

const mapStateToProps = state => ({
  translations: state.locale.translations.common.depositFree,
});

export default connect(mapStateToProps)(DepositFree);
