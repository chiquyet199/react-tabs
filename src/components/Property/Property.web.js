import React from "react";
import _ from "underscore";
import {Linking, View} from "react-native";
import Dialog from "../Dialog";
import ReadMore from "../ReadMore";
import Carousel from "../Carousel";
import IconWithContent from "../IconWithContent";
import {TextLink} from "../common/layout";
import {
  BaseContainer,
  ButtonContainer,
  PageContainer,
  ColumnText,
  ContentWrapper,
  DetailsSection,
  DetailsTitle,
  DetailsText,
  DetailsSubTitle,
  MapImage,
  ApartmentDetailsSection,
  WrapperNew,
  FixedContainer,
  ButtonBar,
} from "./Property.style";
import Button from "../Button";
import AbstractProperty from "./AbstractProperty";
import RentPassportsPreview from "../../components/RentPassportsPreview";

export class Property extends AbstractProperty {
  componentWillMount() {
    const {
      isAgent,
      fetchSharedPassportsWithProperty,
      resetCheckedPassport,
    } = this.props;
    if (isAgent) {
      fetchSharedPassportsWithProperty();
      resetCheckedPassport();
    }
  }

  render() {
    const {
      theme,
      globaltheme,
      property,
      agency = {legalRepresentative: "Hello"},
      branch = {},
      translations,
      size,
      passportsSelected,
      selectedPassportType,
      isAgent,
      goTo,
    } = this.props;
    const themeProps = {theme, globaltheme};
    const iconColor = theme && theme[globaltheme].baseColor;
    const iconsThemeProps = {theme, globaltheme, iconColor};

    return (
      <WrapperNew>
        <BaseContainer>
          {!_.isEmpty(property) && (
            <PageContainer>
              <View style={{flex: 2, padding: 18}}>
                {size === "S" &&
                  property.propertyImages && (
                    <Carousel
                      slides={property.propertyImages}
                      fullWidth
                      dots="light"
                      wrapAround={false}
                    />
                  )}

                <ApartmentDetailsSection>
                  <DetailsTitle>{property.presentation.summary}</DetailsTitle>
                  <DetailsSubTitle>
                    {`${property.address.line1}, ${property.address.town}, ${
                      property.address.postCode
                    }`}
                  </DetailsSubTitle>
                </ApartmentDetailsSection>
                <DetailsSection>
                  <DetailsTitle bold="true" mb={16}>
                    {property.rentAmount} {translations.property.pcm}
                  </DetailsTitle>
                  <IconWithContent iconName="payments" {...iconsThemeProps}>
                    <DetailsText>
                      <strong>{property.depositAmount}</strong>
                      {` ${translations.property.depositRequired}`}
                    </DetailsText>
                  </IconWithContent>
                  <IconWithContent iconName="claims" {...iconsThemeProps}>
                    <ColumnText>
                      <DetailsText>
                        <strong>{translations.property.DepositFree} </strong>
                        {property.depositFreeAvailable
                          ? translations.property.available
                          : translations.property.unavailable}
                      </DetailsText>
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
                  {isAgent && (
                    <ButtonContainer>
                      <Button
                        id="Request-passport-button"
                        type="secondary"
                        onClick={() => goTo("/request-passport")}
                        middle={translations.request_rent_passport}
                      />
                    </ButtonContainer>
                  )}
                </DetailsSection>
                {isAgent && (
                  <DetailsSection>
                    <RentPassportsPreview
                      id="RentPassportList"
                      theme={theme}
                      translations={translations.passport_preview}
                      globaltheme={globaltheme}
                      addPassportsToShare={this.props.addPassportsToShare}
                      selectedPassport={selectedPassportType}
                      data={this.props.sharedRentPassports}
                    />
                  </DetailsSection>
                )}
              </View>
              <View style={{flex: 3}}>
                {size !== "S" &&
                  property.propertyImages && (
                    <Carousel
                      slides={property.propertyImages}
                      fullWidth
                      dots="light"
                      wrapAround={false}
                    />
                  )}
                <ContentWrapper>
                  <DetailsSection>
                    <IconWithContent
                      iconName="bedroom"
                      width={50}
                      bold="true"
                      text={`${property.presentation.bedroomsCount} ${
                        translations.property.bedrooms
                      }`}
                      {...iconsThemeProps}
                    />

                    <IconWithContent
                      iconName="furnished"
                      width={50}
                      bold="true"
                      text={this.getFurnishedType(
                        property.presentation.furnishedType,
                      )}
                      {...iconsThemeProps}
                    />

                    <IconWithContent
                      iconName="bathroom"
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
                      iconName={
                        property.presentation.petsAllowed ? "tick" : "close"
                      }
                      width={50}
                      bold="true"
                      text={translations.property.pets}
                      disabled={!property.presentation.petsAllowed}
                      {...iconsThemeProps}
                    />

                    <IconWithContent
                      iconName={
                        property.presentation.hasParking ? "tick" : "close"
                      }
                      width={50}
                      disabled={!property.presentation.hasParking}
                      bold="true"
                      text={translations.property.parking}
                      {...iconsThemeProps}
                    />

                    <IconWithContent
                      iconName={
                        property.presentation.smokingAllowed ? "tick" : "close"
                      }
                      width={50}
                      disabled={!property.presentation.smokingAllowed}
                      bold="true"
                      text={translations.property.smoking}
                      {...iconsThemeProps}
                    />

                    <IconWithContent
                      iconName={
                        property.presentation.hasOutsideSpace ? "tick" : "close"
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

                <MapImage
                  source={require("../../assets/map_placeholder.png")}
                />

                <ContentWrapper top={20}>
                  <DetailsSection>
                    <ColumnText>
                      <DetailsTitle>{agency.name}</DetailsTitle>
                      {property.shareStatus === "no_rent_passport" && (
                        <DetailsText bold="true">{branch.name}</DetailsText>
                      )}
                    </ColumnText>

                    <IconWithContent iconName="user" {...iconsThemeProps}>
                      <DetailsTitle>
                        {`${agency.legalRepresentative.firstName} ${
                          agency.legalRepresentative.lastName
                        }`}
                      </DetailsTitle>
                    </IconWithContent>
                    {agency.phone && (
                      <IconWithContent iconName="phone" {...iconsThemeProps}>
                        <TextLink
                          gutters={0}
                          onClick={() => Linking.openURL(agency.phone)}
                        >
                          {agency.phone}
                        </TextLink>
                      </IconWithContent>
                    )}
                    {agency.email && (
                      <IconWithContent iconName="email" {...iconsThemeProps}>
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
                        iconName="employment"
                        text={`${agency.address.line1}, ${
                          agency.address.town
                        }, ${agency.address.postCode}`}
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
                {isAgent && (
                  <Dialog
                    title={
                      selectedPassportType === "pending"
                        ? translations.removePassportDialog.pendingTitle
                        : translations.removePassportDialog.title
                    }
                    paragraph={
                      selectedPassportType === "pending"
                        ? translations.removePassportDialog.pendingParagraph
                        : translations.removePassportDialog.paragraph
                    }
                    cancelButtonText={
                      translations.removePassportDialog.cancelButtonText
                    }
                    confirmButtonText={
                      translations.removePassportDialog.confirmButtonText
                    }
                    onDialogCancel={this.toggleDeletePassportDialog}
                    onDialogConfirm={this.handleDeletePassport}
                    isOpen={this.state.deletePassportDialogOpen}
                    theme={theme}
                    globaltheme={globaltheme}
                  />
                )}
              </View>
            </PageContainer>
          )}
          {_.isEmpty(property) && (
            <DetailsSubTitle>{translations.no_data}</DetailsSubTitle>
          )}
        </BaseContainer>
        {isAgent &&
          passportsSelected.length > 0 && (
            <FixedContainer>
              <ButtonBar>
                <Button
                  type="danger"
                  onClick={this.toggleDeletePassportDialog}
                  middle={translations.remove_rent_passport}
                />
              </ButtonBar>
              {selectedPassportType !== "pending" && (
                <ButtonBar>
                  <Button
                    type="secondary"
                    onClick={() => goTo("/home")}
                    middle={translations.invite_to_rent}
                  />
                </ButtonBar>
              )}
            </FixedContainer>
          )}
      </WrapperNew>
    );
  }
}

export default Property;
