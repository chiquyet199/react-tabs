import React, {Component} from "react";
import {connect} from "react-redux";
import {LoginManager, AccessToken} from "react-native-fbsdk";
import Button from "../../components/Button/index";
import {ButtonBar} from "../common/layout";
import {loginWithFacebook} from "../../actions/auth";

export class FacebookLogin extends Component {
  fbAuth = () => {
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      result => {
        if (result.isCancelled) {
          // eslint-disable-next-line no-console
          console.log("Login Cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            // eslint-disable-next-line no-console
            this.props.loginWithFacebook(data.accessToken);
            // fetch(
            //   "https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=" +
            //     data.accessToken,
            // )
            //   .then(response => response.json())
            //   .then(json => {
            //     // eslint-disable-next-line no-console
            //     console.log("example: ", json);
            //   });
          });
        }
      },
      error => {
        // eslint-disable-next-line no-console
        console.log("some error occurred!!", error);
      },
    );
  };

  render() {
    return (
      <ButtonBar>
        <Button
          type="facebook"
          left="facebook"
          middle="Continue with Facebook"
          right="arrow-right"
          onClick={this.fbAuth}
          iconsize={32}
        />
      </ButtonBar>
    );
  }
}

export const mapDispatchToProps = {
  loginWithFacebook,
};

export default connect(
  null,
  mapDispatchToProps,
)(FacebookLogin);
