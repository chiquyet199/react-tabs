import React, {Component} from "react";
import FormPage from "../../components/FormPage";

export default class PropertyReferenceRequest extends Component {
  handleFormSubmit = values => {
    const {schema, next, addresses} = this.props;

    const {next: nextLoc} = schema;
    next({
      values: {
        addresses: [
          ...addresses.slice(0, -1),
          {...addresses.slice(-1)[0], ...values},
        ],
      },
      nextLoc,
    });
  };

  componentWillMount = () => {
    const {updateProgress, schema} = this.props;

    updateProgress(schema.progress);
  };

  render() {
    const {schema} = this.props;

    return (
      <FormPage
        schema={schema}
        buttonText={schema.buttonText}
        onSubmit={this.handleFormSubmit}
      />
    );
  }
}
