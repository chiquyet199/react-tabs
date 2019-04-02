import {createHqAccount} from "../accounts";
import * as api from "../api";

jest.mock("../api.js");

describe("createHqAccount", () => {
  beforeEach(() => {
    api.post.mockClear();
  });

  it("should be a post request to /agency/create", () => {
    createHqAccount({});
    expect(api.post).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith("/agency/create", expect.any(Object));
  });

  it("should pass through form values", () => {
    const values = {
      accountHolder: "Test",
      accountNumber: "123456",
      companyRegistrationDocument: [
        {
          lastModified: 1523872917181,
          name: "image.png",
          preview:
            "blob:http://localhost:3000/4a9f8f04-0750-4126-ae8f-de7877c0b5dd",
          size: 341355,
          type: "image/png",
        },
      ],
      companyShareholderDocument: [
        {
          lastModified: 1523872917181,
          name: "image.png",
          preview:
            "blob:http://localhost:3000/4a9f8f04-0750-4126-ae8f-de7877c0b5dd",
          size: 341355,
          type: "image/png",
        },
      ],
      dateOfBirth: "01-12-1999",
      firstName: "Name",
      lastName: "Last Name",
      legalRepresentativePersonalId: [
        {
          lastModified: 1523872917181,
          name: "image.png",
          preview:
            "blob:http://localhost:3000/4a9f8f04-0750-4126-ae8f-de7877c0b5dd",
          size: 341355,
          type: "image/png",
        },
      ],
      legalRepresentativePostcode: "2 High Street, Stillington, York",
      sortCode: "12345",
    };
    createHqAccount(values);
    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(values),
    );
  });
});
