import {
  getProperties,
  uploadPropertyCSV,
  checkPropertyCSV,
  fetchPropertyById,
  deleteSharedPropertyByIds,
  fetchSharedRentPassportsWithProperty,
  getPropertyRentPassportsGroup,
  removeRentPassportFromProperty,
} from "../properties";
import * as api from "../api";
import {MockFile, MockNativeFile} from "../../__mocks__/fileMock";
import {isWeb} from "../../common";
jest.mock("../api.js");

let params;
describe("getProperties", () => {
  params = {
    order: "desc",
    orderBy: "name",
    search: "",
    agencyId: "111",
    branchId: "222",
  };

  describe("property list", () => {
    beforeEach(() => {
      api.get.mockClear();
    });
    it("should pass the parameters to correct URL", () => {
      params = {
        agencyId: "111",
        branchId: "222",
      };
      getProperties(params.agencyId, params.branchId);
      expect(api.get).toHaveBeenCalledWith("/properties", params);
    });
  });

  describe("fetchPropertyById", () => {
    beforeEach(() => {
      api.get.mockClear();
    });
    it("should be a get request to /property/get", () => {
      fetchPropertyById({});
      expect(api.get).toHaveBeenCalled();
      expect(api.get).toHaveBeenCalledWith("/property/get", expect.any(Object));
    });
    it("should pass through form values", () => {
      const propertyId = "2";
      fetchPropertyById(propertyId);
      expect(api.get).toHaveBeenCalledWith(expect.any(String), {propertyId});
    });
  });

  describe("fetchSharedRentPassportsWithProperty", () => {
    beforeEach(() => {
      api.get.mockClear();
    });
    it("should be a get request to /property/get", () => {
      fetchSharedRentPassportsWithProperty({});
      expect(api.get).toHaveBeenCalled();
      expect(api.get).toHaveBeenCalledWith(
        "/agencyLeads/sharedPassportsForProperty",
        expect.any(Object),
      );
    });
    it("should pass through form values", () => {
      const propertyId = "2";
      fetchSharedRentPassportsWithProperty(propertyId);
      expect(api.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({propertyId}),
      );
    });
  });

  describe("deleteSharedPropertyByIds", () => {
    beforeEach(() => {
      api.post.mockClear();
    });
    it("should be a post request to /agencyLeads/removeProperty", () => {
      deleteSharedPropertyByIds({propertyId: "11111", groupId: "22222"});
      expect(api.post).toHaveBeenCalled();
      expect(api.post).toHaveBeenCalledWith(
        "/agencyLeads/removeProperty",
        expect.any(Object),
      );
    });
    it("should pass through values", () => {
      const data = {propertyId: "11111", groupId: "22222"};
      deleteSharedPropertyByIds({data});
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({data}),
      );
    });
  });

  describe("getPropertyRentPassportsGroup", () => {
    beforeEach(() => {
      api.get.mockClear();
    });

    it("should be a get request to /passportGroups", () => {
      getPropertyRentPassportsGroup(getParams().propertyId);
      expect(api.get).toHaveBeenCalledWith(
        "/passportGroups",
        expect.any(Object),
      );
    });

    it("should pass through parameters", () => {
      const propertyGroupParams = getParams().propertyId;
      getPropertyRentPassportsGroup(propertyGroupParams);
      expect(api.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining(getParams()),
      );
    });
  });

  describe("removeRentPassportFromProperty", () => {
    beforeEach(() => {
      api.post.mockClear();
    });
    it("should be a post request to /agencyLeads/removeFromBranch", () => {
      removeRentPassportFromProperty({branchId: "12", renterId: "34"});
      expect(api.post).toHaveBeenCalled();
      expect(api.post).toHaveBeenCalledWith(
        "/agencyLeads/removeFromBranch",
        expect.any(Object),
      );
    });
    it("should pass through values", () => {
      const data = {branchId: "12", renterId: "34"};
      deleteSharedPropertyByIds({data});
      expect(api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({data}),
      );
    });
  });

  const getParams = () => ({
    propertyId: 777,
  });
});

describe("uploadPropertyCSV", () => {
  const mock = new MockFile();
  const mockNative = new MockNativeFile();
  const filrProps = {name: "file.csv", mimeType: "text/csv"};
  const file = isWeb ? mock.create(filrProps) : mockNative.create(filrProps);
  params = {
    csvFile: file,
  };
  beforeEach(() => {
    api.postFile.mockClear();
  });
  it("should be a POST request to /properties/csv", () => {
    uploadPropertyCSV(params);
    expect(api.postFile).toHaveBeenCalledWith(
      "/properties/csv",
      expect.any(Object),
    );
  });
  it("should pass through parameters", () => {
    uploadPropertyCSV(params);
    expect(api.postFile).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(params),
    );
  });
});

describe("checkPropertyCSV", () => {
  const mock = new MockFile();
  const mockNative = new MockNativeFile();
  const filrProps = {name: "file.csv", mimeType: "text/csv"};
  const file = isWeb ? mock.create(filrProps) : mockNative.create(filrProps);
  params = {
    csvFile: file,
  };
  beforeEach(() => {
    api.postFile.mockClear();
  });
  it("should be a POST request to /properties/csv?dryrun=true", () => {
    checkPropertyCSV(params);
    expect(api.postFile).toHaveBeenCalledWith(
      "/properties/csv?dryrun=true",
      expect.any(Object),
    );
  });
  it("should pass through parameters", () => {
    checkPropertyCSV(params);
    expect(api.postFile).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining(params),
    );
  });
});
