import React from "react";
import {func, object} from "prop-types";
import FormPage from "../../components/FormPage";

export const SettingsTemplate = ({schema, initialValues, onSubmit}) => {
  return (
    <FormPage
      schema={schema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    />
  );
};

SettingsTemplate.propTypes = {
  schema: object.isRequired,
  initialValues: object,
  onSubmit: func.isRequired,
};

export default SettingsTemplate;
