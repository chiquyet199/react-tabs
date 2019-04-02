import React, {Fragment} from "react";
import {connect} from "react-redux";
import {shape, string} from "prop-types";
import LeaseSpec from "../../utils/api/specs/LeaseSpec";
import {Accordion, AccordionWithIconTitle} from "../Accordion";
import {
  Section,
  SectionTitle,
  SectionText,
  SectionTextSmall,
} from "./ActiveTenancy.styles";
import moment from "moment";

const getTenancyDates = (lease, ongoing) => {
  const {
    duration: {startDate, durationMonths},
  } = lease;
  const dateFormat = "DD.MM.YYYY";
  const formattedStartDate = moment(startDate).format(dateFormat);
  const endDate = durationMonths
    ? moment(startDate)
        .add(durationMonths, "M")
        .format(dateFormat)
    : ongoing;

  return `${formattedStartDate} - ${endDate}`;
};

export const TenancyTerms = ({lease, translations}) => (
  <Accordion
    title={({collapsed}) => (
      <AccordionWithIconTitle
        headerIconName="legal"
        title={translations.title}
        subTitle={translations.subTitle}
        collapsed={collapsed}
      />
    )}
  >
    <Fragment>
      <Section>
        <SectionTitle>{translations.totalRentTitle}</SectionTitle>
        <SectionText>
          {translations.currency_symbol +
            lease.rentAmount +
            translations[lease.rentFrequency]}
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>{translations.termTitle}</SectionTitle>
        <SectionText>
          {getTenancyDates(lease, translations.ongoing)}
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>{translations.additionalInfoTitle}</SectionTitle>
        <SectionTextSmall>{lease.conditionsFreeText}</SectionTextSmall>
      </Section>
    </Fragment>
  </Accordion>
);
TenancyTerms.propTypes = {
  lease: LeaseSpec,
  translations: shape({
    additionalInfoTitle: string.isRequired,
    currency_symbol: string.isRequired,
    ongoing: string.isRequired,
    subTitle: string.isRequired,
    termTitle: string.isRequired,
    title: string.isRequired,
    totalRentTitle: string.isRequired,
    tenancyPeriodAbbreviations: shape({
      WEEKLY: string.isRequired,
      FORTNIGHTLY: string.isRequired,
      FOUR_WEEKLY: string.isRequired,
      MONTHLY: string.isRequired,
      YEARLY: string.isRequired,
    }),
  }),
};

const mapStateToProps = state => ({
  translations: {
    currency_symbol: state.locale.translations.common.currency_symbol,
    ...state.locale.translations.common.tenancyTerms,
  },
});

export default connect(mapStateToProps)(TenancyTerms);
