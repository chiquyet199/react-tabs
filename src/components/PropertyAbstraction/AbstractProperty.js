import React, {Component} from "react";
import {Linking} from "react-native";
import {Button} from "../Button";
import {TextLink} from "../../components/common/layout";
import {DetailsText, ButtonContainer} from "../Property/Property.style";

export class AbstractProperty extends Component {
  state = {
    shareDialogOpen: false,
    removeDialogOpen: false,
  };

  dialogPropsGenerator = (
    isRemoveDialog,
    dialogTranslations,
    globaltheme,
    agency = {},
    branch,
  ) => ({
    confirmButtonType: "danger",
    cancelButtonText: dialogTranslations.dialogCancel,
    confirmButtonText: dialogTranslations.dialogConfirm,
    globaltheme,
    onClose: isRemoveDialog ? this.toggleRemoveDialog : this.toggleShareDialog,
    onDialogConfirm: isRemoveDialog
      ? this.handleRemoveDialogConfirm
      : this.handleShareDialogConfirm,
    onDialogCancel: isRemoveDialog
      ? this.toggleRemoveDialog
      : this.toggleShareDialog,
    title: `${dialogTranslations.dialogTitle}${
      isRemoveDialog ? "" : ` "${agency.name},${branch.name}"?`
    }`,
    paragraph: isRemoveDialog
      ? `${dialogTranslations.dialogParagraph1} "${agency.name}-${
          branch.name
        }"? ${dialogTranslations.dialogParagraph2}`
      : dialogTranslations.dialogParagraph,
    isOpen: isRemoveDialog
      ? this.state.removeDialogOpen
      : this.state.shareDialogOpen,
  });

  toggleShareDialog = () => {
    const {shareDialogOpen} = this.state;
    this.setState({
      shareDialogOpen: !shareDialogOpen,
    });
  };

  toggleRemoveDialog = () => {
    const {removeDialogOpen} = this.state;
    this.setState({
      removeDialogOpen: !removeDialogOpen,
    });
  };

  handleShareDialogConfirm = () => {
    const {
      match: {
        params: {id},
      },
      sharePropertyRentPassport,
    } = this.props;
    this.setState(
      {
        shareDialogOpen: false,
      },
      async () => {
        await sharePropertyRentPassport(id);
      },
    );
  };

  handleRemoveDialogConfirm = () => {
    const {
      match: {
        params: {id},
      },
      deleteSharedPropertyByIds,
    } = this.props;
    this.setState(
      {
        removeDialogOpen: false,
      },
      () => {
        deleteSharedPropertyByIds({propertyId: id, groupId: null});
      },
    );
  };

  componentWillMount() {
    const {updateTopbarButton, showTopbarButton} = this.props;

    updateTopbarButton(
      true,
      "",
      this.toggleRemoveDialog,
      "transparent_green",
      "delete",
    );
    showTopbarButton();
  }

  componentDidMount = async () => {
    const {
      match: {
        params: {id},
      },
      fetchPropertyById,
      showTopbarCenterText,
    } = this.props;
    await fetchPropertyById(id);
    const {property} = this.props;
    if (property) {
      showTopbarCenterText(property.address.line1);
    }
  };

  renderButton = () => {
    const {property, theme, globaltheme, translations, goTo} = this.props;
    const themeProps = {theme, globaltheme};

    switch (property.shareStatus) {
      case "not_shared":
        return (
          <ButtonContainer>
            <Button
              {...themeProps}
              type="primary"
              middle={translations.shareRentPassport}
              right="arrow-right"
              iconsize={32}
              onClick={this.toggleShareDialog}
            />
          </ButtonContainer>
        );
      case "no_rent_passport":
        return (
          <ButtonContainer>
            <DetailsText {...themeProps}>
              {translations.createRentPassport}
            </DetailsText>
            <TextLink
              onClick={() =>
                Linking.openURL("https://www.canopy.rent/#rentpassport")
              }
            >
              {translations.whatIsRentPassport}
            </TextLink>
            <Button
              {...themeProps}
              type="primary"
              right="arrow-right"
              middle={translations.startRentPassport}
              iconsize={32}
              onClick={() => goTo("/rent-passport")}
            />
          </ButtonContainer>
        );
      default:
        return null;
    }
  };

  getFurnishedType = type => {
    const str = type.replace("_", " ").toLowerCase();

    return str.charAt(0).toUpperCase() + str.slice(1);
  };
}

export default AbstractProperty;
