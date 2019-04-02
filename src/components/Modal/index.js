import React, {Component} from "react";
import {ScrollView} from "react-native";
import {PageContainer} from "../common/layout";
import {object, oneOf, func} from "prop-types";
import {connect} from "react-redux";
import {hideModal} from "../../actions/modal";
import Icon from "../../components/Icon";
import {themed} from "../../utils/common";
import {
  ModalContainer,
  ModalTitle,
  ModalSubTitle,
  IconView,
  ModalTextParagraph,
} from "./Modal";

export class SimpleModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openFromState: false,
    };
  }

  componentWillReceiveProps(prevProps, prevState) {
    if (this.props.openModal !== prevProps.openModal) {
      this.setState({
        openFromState: this.props.openModal,
      });
    }

    if (this.state.openFromState !== prevState.openFromState) {
      this.setState({
        openFromState: this.state.openFromState,
      });
    }
  }

  displayModalTitle = (title, theme, globaltheme) => {
    return (
      <ModalTitle
        left="true"
        theme={theme}
        globaltheme={globaltheme}
        color={theme.colors.canopySteel}
      >
        {title}
      </ModalTitle>
    );
  };

  displayModalSubTitle = (subTitle, theme, globaltheme) => {
    return (
      <ModalSubTitle
        left="true"
        theme={theme}
        globaltheme={globaltheme}
        color={theme.colors.canopySteel}
      >
        {subTitle}
      </ModalSubTitle>
    );
  };

  displayModalContent = () => {
    const {modalContent, children, theme, globaltheme} = this.props;

    if (modalContent.text || modalContent.renderText) {
      return (
        <ModalTextParagraph left="true" theme={theme} globaltheme={globaltheme}>
          {modalContent.text
            ? modalContent.text
            : modalContent.renderText({theme, globaltheme, left: "true"})}
        </ModalTextParagraph>
      );
    }

    return children;
  };

  render() {
    const {
      modalContent,
      theme,
      globaltheme,
      openModal,
      closeModal,
      animationType,
      transparent,
    } = this.props;
    const {openFromState} = this.state;
    const {title, subTitle} = modalContent;
    const checkIfModalIsVisible = openModal || openFromState;
    const themeProps = {theme, globaltheme};

    return (
      checkIfModalIsVisible && (
        <ModalContainer
          animationType={animationType || "slide"}
          transparent={transparent || false}
          onRequestClose={closeModal}
          {...themeProps}
        >
          <PageContainer {...themeProps}>
            <IconView onPress={closeModal}>
              <Icon
                name="close"
                color={theme[globaltheme].accentColor}
                size={46}
              />
            </IconView>
            {title && this.displayModalTitle(title, theme, globaltheme)}
            <ScrollView {...themeProps}>
              {subTitle &&
                this.displayModalSubTitle(subTitle, theme, globaltheme)}
              {this.displayModalContent()}
            </ScrollView>
          </PageContainer>
        </ModalContainer>
      )
    );
  }
}

SimpleModal.defaultProps = {
  modalContent: {},
};

SimpleModal.propTypes = {
  modalContent: object,
  globaltheme: oneOf(["light", "dark"]),
  closeModalFromState: func,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeModal: () =>
    (ownProps.closeModalFromState && ownProps.closeModalFromState()) ||
    dispatch(hideModal()),
});

const mapStateToProps = (state, ownProps) => ({
  modalContent: state.modal.modalContent,
  openModal: ownProps.openModal || state.modal.open,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(themed(SimpleModal));
