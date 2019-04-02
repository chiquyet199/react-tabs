import AddressSchema from "../../schemas/UKAddressSchema";
import {
  UKAddressEntrySchemaFragmentGenerator,
  AddressEntryStateEnum,
} from "./SchemaFragmentGenerators";

describe("Schema Fragment Generators", () => {
  describe("UKAddressEntrySchemaFragmentGenerator", () => {
    it("Generates ukPostcodeEntry schema when state is POSTCODE", () => {
      const schema = AddressSchema.ukPostcodeEntry();
      expect(
        UKAddressEntrySchemaFragmentGenerator(AddressEntryStateEnum.POSTCODE),
      ).toEqual(expect.objectContaining(schema));
    });

    it("Generates ukManualEntry schema when state is MANUAL", () => {
      const schema = AddressSchema.ukManualEntry();
      expect(
        UKAddressEntrySchemaFragmentGenerator(AddressEntryStateEnum.MANUAL),
      ).toEqual(expect.objectContaining(schema));
    });

    it("attaches onAddressSelected handler when state is POSTCODE", () => {
      const onAddressSelected = () => {};
      const schema = UKAddressEntrySchemaFragmentGenerator(
        AddressEntryStateEnum.POSTCODE,
        onAddressSelected,
      );
      expect(schema.properties.postcode.onAddressSelected).toBe(
        onAddressSelected,
      );
    });

    it("attaches onAddressNotListed handler when state is POSTCODE", () => {
      const onAddressNotListed = () => {};
      const schema = UKAddressEntrySchemaFragmentGenerator(
        AddressEntryStateEnum.POSTCODE,
        null,
        onAddressNotListed,
      );
      expect(schema.properties.postcode.onAddressNotListed).toBe(
        onAddressNotListed,
      );
    });

    it("throws an error if international schema requested", () => {
      expect(() => {
        UKAddressEntrySchemaFragmentGenerator(
          AddressEntryStateEnum.INTERNATIONAL,
        );
      }).toThrow();
    });

    it("adds header to schema if one is specified", () => {
      const header = "header";
      const modes = [
        AddressEntryStateEnum.POSTCODE,
        AddressEntryStateEnum.MANUAL,
      ];
      for (let x = 0; x < modes.length; x += 1) {
        const mode = modes[x];
        expect(
          UKAddressEntrySchemaFragmentGenerator(mode, null, null, header)
            .header,
        ).toBe(header);
      }
    });

    it("doesn't add header to schema if one isn't specified", () => {
      const modes = [
        AddressEntryStateEnum.POSTCODE,
        AddressEntryStateEnum.MANUAL,
      ];
      for (let x = 0; x < modes.length; x += 1) {
        const mode = modes[x];
        expect(
          UKAddressEntrySchemaFragmentGenerator(mode).header,
        ).toBeUndefined();
      }
    });

    it("adds info to schema if one is specified", () => {
      const info = ["Info Manual", "Info Postcode"];
      const modes = [
        AddressEntryStateEnum.MANUAL,
        AddressEntryStateEnum.POSTCODE,
      ];
      for (let x = 0; x < modes.length; x += 1) {
        const mode = modes[x];
        expect(
          UKAddressEntrySchemaFragmentGenerator(
            mode,
            null,
            null,
            null,
            info[0],
            info[1],
          ).info,
        ).toBe(info[x]);
      }
    });

    it("doesn't add info to schema if one isn't specified", () => {
      const modes = [
        AddressEntryStateEnum.POSTCODE,
        AddressEntryStateEnum.MANUAL,
      ];
      for (let x = 0; x < modes.length; x += 1) {
        const mode = modes[x];
        expect(
          UKAddressEntrySchemaFragmentGenerator(mode).info,
        ).toBeUndefined();
      }
    });
  });
});
