import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import {connect} from "react-redux";
import styled from "styled-components/native";
import {responsive} from "../../utils/common";

import Button, {IconButton} from "../../components/Button/index";
import {logout as logoutAction} from "../../actions/auth";

import DynamicForm from "../../components/DynamicForm";
import * as schemas from "../../schemas";
import FacebookLogin from "../../components/FacebookLogin";
import {ButtonBar} from "../../components/common/layout";
import Modal from "../../components/Modal";
import {setModalVisible} from "../../actions/modal";
import {colors} from "../../constants/theme";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formModalOpen: false,
    };

    this.openFormModalComponent = this.openFormModalComponent.bind(this);
    this.closeFormModalComponent = this.closeFormModalComponent.bind(this);
  }
  logout = () => {
    const {logout} = this.props;
    logout();
  };

  handleFormSubmit = values => {
    // eslint-disable-next-line no-console
    console.log("Form Values: ", values);
  };

  openFormModalComponent = () => {
    this.setState({
      formModalOpen: true,
    });
  };

  closeFormModalComponent = () => {
    this.setState({
      formModalOpen: false,
    });
  };

  render() {
    const {translations} = this.props;

    return [
      <PageContainer>
        <View style={styles.content}>
          <FacebookLogin />
          <ButtonBar>
            <IconButton name="user" type="primary" />
            <IconButton name="rentpassport" type="primary" />
            <IconButton name="twitter" type="secondary" />
            <IconButton name="email-open" type="secondary" />
            <IconButton name="compose" type="tertiary" />
            <IconButton name="error" type="danger" />
          </ButtonBar>
          <ButtonBar>
            <Button
              type="primary"
              left="log-out"
              middle={translations.logout}
              onClick={this.logout}
            />
            <Button
              type="primary"
              left="log-out"
              middle={translations.logout}
              onClick={this.logout}
            />
          </ButtonBar>
          <Text style={styles.text}>{translations.home__loggedin}</Text>
          <Text
            onPress={() => {
              this.props.setModalVisible("whatIsARentPassport");
            }}
            style={styles.modalOpenText}
          >
            What is a Rent Passport?
          </Text>
          <Text
            onPress={() => {
              this.props.setModalVisible("whatIsOpenBanking");
            }}
            style={styles.modalOpenText}
          >
            What is Open Banking?
          </Text>
          <Text
            onPress={() => this.openFormModalComponent()}
            style={styles.modalOpenText}
          >
            Open modal extracted from component with children
          </Text>
          <DynamicForm
            schema={schemas.addressSchema}
            text={translations.submit}
            onSubmit={this.handleFormSubmit}
          />
        </View>
      </PageContainer>,
      <Modal
        openModal={this.state.formModalOpen}
        closeModalFromState={() => this.closeFormModalComponent()}
      >
        <DynamicForm
          schema={schemas.addressSchema}
          text={translations.submit}
          onSubmit={this.handleFormSubmit}
        />
      </Modal>,
    ];
  }
}

const PageContainer = responsive(styled.ScrollView`
    flex: 1
    alignSelf: stretch
    backgroundColor: ${colors.theme}
    paddingTop: 10
    padding-horizontal: 100
`)({
  S: `
      padding-horizontal: 10
    `,
});
export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  biggerText: {
    fontSize: 17,
    alignSelf: "center",
  },
  button: {
    margin: 5,
  },
  clearbutton: {
    width: 340,
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.canopyGreen,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  logOutbutton: {
    width: 340,
    height: 48,
    borderRadius: 6,
    backgroundColor: colors.canopyGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
  },
  buttonTextGreen: {
    color: colors.canopyGreen,
  },
  image: {
    width: 300,
    height: 300,
  },
  modalOpenText: {
    fontWeight: "bold",
    color: "#5AB88E",
  },
});

export const mapStateToProps = state => ({
  translations: {
    home__loggedin: state.locale.translations.home__loggedin,
    home__welcome: state.locale.translations.home__welcome,
    logout: state.locale.translations.logout,
    submit: state.locale.translations.submit,
  },
});

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
  setModalVisible: param => dispatch(setModalVisible(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
