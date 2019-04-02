import React, {Fragment} from "react";
import {Linking} from "react-native";
import Dialog from "../Dialog";
import ReadMore from "../ReadMore";
import Carousel from "../Carousel";
import IconWithContent from "../IconWithContent";
import {TextLink} from "../common/layout";
import {
  BaseContainer,
  PageContainer,
  ColumnText,
  RowText,
  ContentWrapper,
  DetailsSection,
  DetailsTitle,
  DetailsText,
  DetailsSubTitle,
  MapImage,
} from "./Property.style";
import AbstractProperty from "./AbstractProperty";
// ICON IMAGES
const paymentsIcon = require("../../assets/payments.png");
const claimsIcon = require("../../assets/claims.png");
const bedroomIcon = require("../../assets/bedroom.png");
const furnishedIcon = require("../../assets/furnished.png");
const bathroomIcon = require("../../assets/bathroom.png");
const tickIcon = require("../../assets/tick.png");
const crossIcon = require("../../assets/close.png");
const mapPlaceholder = require("../../assets/map_placeholder.png");
const userIcon = require("../../assets/user.png");
const emailIcon = require("../../assets/email.png");
const phoneIcon = require("../../assets/phone.png");
const employmentIcon = require("../../assets/employment.png");

export class Property extends AbstractProperty {
  render() {
    const {
      theme,
      globaltheme,
      property,
      agency,
      branch,
      translations,
    } = this.props;
    const themeProps = {theme, globaltheme};
    const iconColor = theme && theme[globaltheme].baseColor;
    const iconsThemeProps = {theme, globaltheme, iconColor};

    return (
      <Fragment>
        <BaseContainer>
          {property && (
            <PageContainer>
              {property.propertyImages && (
                <Carousel
                  fullWidth
                  slides={property.propertyImages}
                  dots="light"
                />
              )}
              <ContentWrapper>
                <DetailsSection>
                  <DetailsTitle>{property.presentation.summary}</DetailsTitle>
                  <DetailsSubTitle>
                    {`${property.address.line1}, ${property.address.town}, ${
                      property.address.postCode
                    }`}
                  </DetailsSubTitle>
                </DetailsSection>
                <DetailsSection>
                  <DetailsTitle bold="true" mb={16}>
                    {property.rentAmount} {translations.property.pcm}
                  </DetailsTitle>

                  <IconWithContent icon={paymentsIcon} {...iconsThemeProps}>
                    <DetailsText bold="true">
                      {property.depositAmount}
                    </DetailsText>
                    <DetailsText>
                      {` ${translations.property.depositRequired}`}
                    </DetailsText>
                  </IconWithContent>

                  <IconWithContent icon={claimsIcon} {...iconsThemeProps}>
                    <ColumnText>
                      <RowText>
                        <DetailsText bold="true">
                          {translations.property.DepositFree}
                        </DetailsText>
                        <DetailsText>
                          {property.depositFreeAvailable
                            ? translations.property.available
                            : translations.property.unavailable}
                        </DetailsText>
                      </RowText>
                      <TextLink
                        gutters={0}
                        onClick={() =>
                          Linking.openURL(
                            "https://www.canopy.rent/#depositfree",
                          )
                        }
                      >
                        {`${translations.property.whatIs} ${
                          translations.property.DepositFree
                        }?`}
                      </TextLink>
                    </ColumnText>
                  </IconWithContent>
                </DetailsSection>

                <DetailsSection>
                  <IconWithContent
                    icon={bedroomIcon}
                    width={50}
                    bold="true"
                    text={`${property.presentation.bedroomsCount} ${
                      translations.property.bedrooms
                    }`}
                    {...iconsThemeProps}
                  />

                  <IconWithContent
                    icon={furnishedIcon}
                    width={50}
                    bold="true"
                    text={this.getFurnishedType(
                      property.presentation.furnishedType,
                    )}
                    {...iconsThemeProps}
                  />

                  <IconWithContent
                    icon={bathroomIcon}
                    width={50}
                    bold="true"
                    text={`${property.presentation.bedroomsCount} ${
                      translations.property.bathrooms
                    }`}
                    {...iconsThemeProps}
                  />
                </DetailsSection>

                <DetailsSection>
                  <IconWithContent
                    icon={
                      property.presentation.petsAllowed ? tickIcon : crossIcon
                    }
                    width={50}
                    bold="true"
                    text={translations.property.pets}
                    disabled={!property.presentation.petsAllowed}
                    {...iconsThemeProps}
                  />

                  <IconWithContent
                    icon={
                      property.presentation.hasParking ? tickIcon : crossIcon
                    }
                    width={50}
                    disabled={!property.presentation.hasParking}
                    bold="true"
                    text={translations.property.parking}
                    {...iconsThemeProps}
                  />

                  <IconWithContent
                    icon={
                      property.presentation.smokingAllowed
                        ? tickIcon
                        : crossIcon
                    }
                    width={50}
                    disabled={!property.presentation.smokingAllowed}
                    bold="true"
                    text={translations.property.smoking}
                    {...iconsThemeProps}
                  />

                  <IconWithContent
                    icon={
                      property.presentation.hasOutsideSpace
                        ? tickIcon
                        : crossIcon
                    }
                    width={50}
                    disabled={!property.presentation.hasOutsideSpace}
                    bold="true"
                    text={translations.property.outsideSpace}
                    {...iconsThemeProps}
                  />
                </DetailsSection>

                <DetailsSection>
                  <ReadMore
                    text={property.presentation.description}
                    {...themeProps}
                  />
                </DetailsSection>
              </ContentWrapper>

              <MapImage source={mapPlaceholder} />

              <ContentWrapper top={20}>
                <DetailsSection>
                  <ColumnText>
                    <DetailsTitle>{agency.name}</DetailsTitle>
                    {property.shareStatus === "no_rent_passport" && (
                      <DetailsText bold="true">{branch.name}</DetailsText>
                    )}
                  </ColumnText>

                  <IconWithContent icon={userIcon} {...iconsThemeProps}>
                    <DetailsTitle>
                      {`${agency.legalRepresentative.firstName} ${
                        agency.legalRepresentative.lastName
                      }`}
                    </DetailsTitle>
                  </IconWithContent>

                  {agency.phone && (
                    <IconWithContent icon={phoneIcon} {...iconsThemeProps}>
                      <TextLink
                        gutters={0}
                        onClick={() => Linking.openURL(agency.phone)}
                      >
                        {agency.phone}
                      </TextLink>
                    </IconWithContent>
                  )}

                  {agency.email && (
                    <IconWithContent icon={emailIcon} {...iconsThemeProps}>
                      <TextLink
                        gutters={0}
                        onClick={() =>
                          Linking.openURL(`mailto:${agency.email}`)
                        }
                      >
                        {agency.email}
                      </TextLink>
                    </IconWithContent>
                  )}

                  {agency.address && (
                    <IconWithContent
                      icon={employmentIcon}
                      text={`${agency.address.line1}, ${agency.address.town}, ${
                        agency.address.postCode
                      }`}
                      {...iconsThemeProps}
                    />
                  )}
                </DetailsSection>
              </ContentWrapper>
              {this.renderButton()}
              <Dialog
                {...this.dialogPropsGenerator(
                  true,
                  translations.removeDialog,
                  globaltheme,
                  agency,
                  branch,
                )}
              />

              <Dialog
                {...this.dialogPropsGenerator(
                  false,
                  translations.shareDialog,
                  globaltheme,
                  agency,
                  branch,
                )}
              />
            </PageContainer>
          )}
          {!property && (
            <DetailsSubTitle>{translations.no_data}</DetailsSubTitle>
          )}
        </BaseContainer>
      </Fragment>
    );
  }
}

export default Property;
