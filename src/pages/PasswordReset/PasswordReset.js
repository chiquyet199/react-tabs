import React, {Component} from "react";
import FormPage from "../../components/FormPage";
import queryString from "query-string";

export default class PasswordReset extends Component {
  handleFormSubmit = values => {
    const {
      submitAction,
      location: {search},
    } = this.props;
    const {token} = queryString.parse(search);
    submitAction(values.valueOne, token);
  };

  render() {
    const {schema} = this.props;

    return <FormPage schema={schema} onSubmit={this.handleFormSubmit} />;
  }
}
