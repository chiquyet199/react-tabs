export const isRequired = (value, key) => !value && {[key]: "required"};

export const validate = async (fields, values) => {
  const formValidations = mapValidators(fields, values);
  const results = await Promise.all(formValidations);

  return createErrorObject(results);
};

const mapValidators = (fields, values) =>
  Object.keys(fields).reduce((acc, key) => {
    const {validations = []} = fields[key];

    return [
      ...acc,
      ...validations.map(runValidation(values[key], key, values)),
    ];
  }, []);

const runValidation = (value, key, values) => async validator =>
  (await validator(value, key, values)) || {};

const createErrorObject = results =>
  results.reduce(
    (acc, err) => ({
      ...acc,
      ...err,
    }),
    {},
  ); // returns empty object if no errors

export const atLeastOneSelectedIsRequired = (value, key, values) => {
  const selectedValues = Object.values(values);
  const arrayIsEmpty = selectedValues.length === 0;
  const valueIsSelected = selectedValues.some(
    selectedValue => selectedValue === true,
  );

  if (arrayIsEmpty || !valueIsSelected) {
    return {
      [key]: "selectAtLeastOne",
    };
  }

  return true;
};
