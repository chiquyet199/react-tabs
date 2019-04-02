import React from "react";
import queryString from "query-string";
import API from "../../utils/api";

export class VerifyEmailRedirect extends React.Component {
  componentWillMount = async () => {
    const {
      location: {search},
      go,
      storeUser,
    } = this.props;
    const {token} = queryString.parse(search);

    if (!token) {
      go("/verify-email");

      return;
    }

    const {success, user} = await API.verifyEmail(token).catch(() => ({
      success: false,
    }));

    if (!success) {
      // on fail or when user already verified
      // is not defined in requirements
      go("/verify-email");

      return;
    }

    storeUser(user);
    go("/verify-email-success");
  };

  render = () => null;
}
