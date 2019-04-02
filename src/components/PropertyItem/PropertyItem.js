import React, {Component} from "react";
import {connect} from "react-redux";
import PropertySpec from "../../utils/api/specs/PropertySpec";
import {Collapse, CollapseContent} from "../Collapse";
import {func, shape, string, element, bool} from "prop-types";
import {View, TouchableOpacity} from "react-native";
import upArrow from "../../assets/ic_up_arrow_gray/ic_up_arrow_gray.png";
import downArrow from "../../assets/ic_down_arrow_gray/ic_down_arrow_gray.png";
import {
  ToggleIcon,
  PropertyImage,
  PropertyItemWrapper,
  PropertyAddress,
  PropertyAddressLine,
  StyledDefaultPropertyThumbnail,
  PropertyRent,
  DefaultPropertyImageWrapper,
} from "./PropertyItem.styles.js";
import {getPrimaryPropertyImage} from "../../utils/helpers/property";

export class PropertyItem extends Component {
  constructor() {
    super();

    this.state = {
      isCollapsed: false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    const {isCollapsed} = this.state;

    this.setState({isCollapsed: !isCollapsed});
  }

  getPropertyImage = propertyImages => {
    const uri = getPrimaryPropertyImage(propertyImages);
    if (uri) {
      return <PropertyImage source={{uri}} />;
    }

    return (
      <DefaultPropertyImageWrapper>
        <StyledDefaultPropertyThumbnail />
      </DefaultPropertyImageWrapper>
    );
  };

  handlePress = () => {
    const {data, itemClick} = this.props;
    itemClick(data.id);
  };

  render() {
    const {
      itemClick,
      data,
      translations,
      collapseContent,
      compact,
    } = this.props;
    const {isCollapsed} = this.state;
    const output = (
      <PropertyItemWrapper compact={compact}>
        {this.getPropertyImage(data.propertyImages || [])}
        <PropertyAddress>
          <View>
            <PropertyAddressLine>{data.address.line1}</PropertyAddressLine>
          </View>
          <View>
            <PropertyAddressLine>
              {data.address.city || data.address.town}
            </PropertyAddressLine>
          </View>
          <View>
            <PropertyAddressLine>{data.address.postCode}</PropertyAddressLine>
          </View>
        </PropertyAddress>
        <PropertyRent>
          {collapseContent ? (
            <ToggleIcon source={isCollapsed ? downArrow : upArrow} />
          ) : (
            `${translations.currency_symbol}${data.rentAmount}${
              translations.rental_period_abbreviations[
                data.rentFrequency.toLowerCase()
              ]
            }`
          )}
        </PropertyRent>
      </PropertyItemWrapper>
    );

    if (collapseContent) {
      return (
        <Collapse
          collapsed={isCollapsed.toString()}
          onToggle={this.onToggle}
          collapsedByDefault
        >
          <CollapseContent type="header">{output}</CollapseContent>
          <CollapseContent type="body">{collapseContent}</CollapseContent>
        </Collapse>
      );
    }

    if (itemClick) {
      return (
        <TouchableOpacity onPress={this.handlePress}>{output}</TouchableOpacity>
      );
    }

    return output;
  }
}

PropertyItem.propTypes = {
  data: PropertySpec,
  translations: shape({
    rental_period_abbreviations: shape({
      weekly: string.isRequired,
      fortnightly: string.isRequired,
      four_weekly: string.isRequired,
      monthly: string.isRequired,
      yearly: string.isRequired,
    }),
    currency_symbol: string.isRequired,
  }),
  itemClick: func,
  collapseContent: element,
  compact: bool,
};

const mapStateToProps = state => ({
  translations: {
    rental_period_abbreviations:
      state.locale.translations.property_list.rental_period_abbreviations,
    currency_symbol: state.locale.translations.common.currency_symbol,
  },
});

export default connect(mapStateToProps)(PropertyItem);
