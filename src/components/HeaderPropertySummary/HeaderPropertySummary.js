import React from "react";
import {connect} from "react-redux";
import {go} from "../../actions/navigation";
import {
  getPrimaryPropertyImage,
  getRentDueDate,
} from "../../utils/helpers/property";
import LeaseSpec from "../../utils/api/specs/LeaseSpec";
import {func, shape, string} from "prop-types";
import moment from "moment";
import {
  ArrowIcon,
  Background,
  FullDetailsLink,
  PropertyImage,
  PropertyAddress,
  PropertyRent,
  PropertySummary,
  RentalPayments,
  RentDueDate,
  VerticalStack,
} from "./HeaderPropertySummary.style";

export const HeaderPropertySummary = ({goTo, lease, translations}) => {
  if (lease) {
    const uri = getPrimaryPropertyImage(lease.property.propertyImages);
    const rentDueDate = moment(getRentDueDate(lease)).format("DD.MM.YYYY");
    const {
      property: {
        id,
        address: {line1, town, postCode},
      },
      rentAmount,
    } = lease;

    return (
      <Background>
        <PropertySummary>
          <PropertyImage source={{uri}} />
          <VerticalStack>
            <RentalPayments>
              <PropertyRent>
                {translations.currency_symbol}
                {rentAmount}
              </PropertyRent>
              <RentDueDate>
                {`${translations.rentDueDate} ${rentDueDate}`}
              </RentDueDate>
            </RentalPayments>
            <PropertyAddress>
              {`${line1}, ${town}, ${postCode}`}
            </PropertyAddress>
          </VerticalStack>
          <FullDetailsLink onPress={() => goTo(`/property-listing/${id}`)}>
            <ArrowIcon name="arrow-right" size={32} />
          </FullDetailsLink>
        </PropertySummary>
      </Background>
    );
  }

  return null;
};

HeaderPropertySummary.propTypes = {
  goTo: func.isRequired,
  lease: LeaseSpec,
  translations: shape({
    currency_symbol: string.isRequired,
    rentDueDate: string.isRequired,
  }),
};

const mapStateToProps = state => ({
  translations: {
    currency_symbol: state.locale.translations.common.currency_symbol,
    ...state.locale.translations.common.headerPropertySummary,
  },
});

const mapDisatchToProps = () => ({
  goTo: go,
});

export default connect(
  mapStateToProps,
  mapDisatchToProps,
)(HeaderPropertySummary);
