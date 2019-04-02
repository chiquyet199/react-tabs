import AddressSchema from "../../schemas/UKAddressSchema";
import _ from "underscore";

export const UKAddressEntrySchemaFragmentGenerator = (
  state,
  onAddressSelected,
  onAddressNotListed,
  header,
  infoManual,
  infoPostcode,
  fieldName = "postcode",
) => {
  const getSchemaFromState = schemaState => {
    if (schemaState === AddressEntryStateEnum.MANUAL) {
      return _.extend(AddressSchema.ukManualEntry(fieldName), {
        info: infoManual,
      });
    }

    return _.extend(AddressSchema.ukPostcodeEntry(fieldName), {
      info: infoPostcode,
    });
  };

  if (state === AddressEntryStateEnum.INTERNATIONAL) {
    throw new Error(
      "International Address Entry not supported by this generator",
    );
  }
  const schema = getSchemaFromState(state);
  const extensions = {};

  if (state === AddressEntryStateEnum.POSTCODE) {
    _.extend(schema.properties[fieldName], {
      onAddressSelected,
      onAddressNotListed,
    });
  }

  schema.header = header;

  return _.extend(schema, extensions);
};

export const AddressEntryStateEnum = Object.freeze({
  POSTCODE: Symbol("postcode"),
  MANUAL: Symbol("manual"),
  INTERNATIONAL: Symbol("international"),
});
