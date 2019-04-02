import React, {Component} from "react";
import _ from "underscore";
import {Linking} from "react-native";
import {Button} from "../Button";
import {TextLink} from "../common/layout";
import {DetailsText, ButtonContainer} from "./Property.style";

export class AbstractProperty extends Component {
  state = {
    shareDialogOpen: false,
    removeDialogOpen: false,
    deletePassportDialogOpen: false,
  };

  dialogPropsGenerator = (
    isRemoveDialog,
    dialogTranslations,
    globaltheme,
    agency,
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

  toggleDeletePassportDialog = () => {
    const {deletePassportDialogOpen} = this.state;
    this.setState({
      deletePassportDialogOpen: !deletePassportDialogOpen,
    });
  };

  handleDeletePassport = () => {
    const {
      passportsSelected,
      selectedPassportType,
      deletePassportsFromProperty,
      deletePendingPassportRequest,
      match: {
        params: {id},
      },
    } = this.props;

    if (selectedPassportType === "pending") {
      deletePassportsFromProperty(passportsSelected, id);
    } else {
      deletePendingPassportRequest(passportsSelected, id);
    }
    this.toggleDeletePassportDialog();
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

    if (updateTopbarButton) {
      updateTopbarButton(
        true,
        "",
        this.toggleRemoveDialog,
        "transparent_green",
        "delete",
      );
    }
    if (showTopbarButton) {
      showTopbarButton();
    }
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
    if (!_.isEmpty(property) && showTopbarCenterText) {
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
