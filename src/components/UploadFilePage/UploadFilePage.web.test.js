import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";
import {UploadFilePage} from "./UploadFilePage.web";
import FileUpload from "../../components/FileUpload";
import theme from "../../constants/theme";
import {extend} from "underscore";
import {MockFile} from "../../__mocks__/fileMock.js";
import {isWeb} from "../../utils/common";

describe("UploadFilePage web", () => {
  it("UploadFilePage snapshot test on - " + Platform.OS, () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it("redirects to base route if no data inside DynamicForm is saved", () => {
    const go = jest.fn();
    getComponent({
      go,
      form: {},
    });
    expect(go).toHaveBeenCalledWith("/base");
  });

  it("updates progress as expected", () => {
    const schema = getMockSchema();
    const {progress} = schema;
    const updateProgress = jest.fn();
    getComponent({
      updateProgress,
      schema,
    });
    expect(updateProgress).toHaveBeenCalledWith(progress);
  });

  it("shows expected text for page title", () => {
    const pageTitle = "pageTitle";
    const showTopbarCenterText = jest.fn();
    getComponent({
      showTopbarCenterText,
      schema: extend(getMockSchema(), {pageTitle}),
    });
    expect(showTopbarCenterText).toHaveBeenCalledWith(pageTitle);
  });

  it("dispatches submit correctly", async () => {
    const next = jest.fn();
    const mock = new MockFile();
    const file = isWeb ? await mock.create() : getMockFileNative();
    const schema = getMockSchema();
    const component = getComponent({next});
    await component.find(FileUpload).prop("onSubmit")({
      companyRegistrationDocument: [file],
    });
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        nextLoc: schema.next,
        values: {companyRegistrationDocument: [file]},
      }),
    );
  });

  it("clears progress on unmount", () => {
    const clearProgress = jest.fn();
    const component = getComponent({clearProgress});
    expect(clearProgress).not.toHaveBeenCalled();
    component.unmount();
    expect(clearProgress).toHaveBeenCalled();
  });

  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<UploadFilePage {...parsedProps} />);
  };

  const getMockProps = () => ({
    form: {DynamicForm: {}},
    location: {pathname: "/base/test"},
    translations: {
      selectFile: "Select file",
      confirmFile: "Confirm file",
    },
    go: () => {},
    next: () => {},
    updateProgress: () => {},
    clearProgress: () => {},
    showTopbarCenterText: () => {},
    submit: () => {},
    globaltheme: "light",
    theme,
    schema: getMockSchema(),
  });

  const getMockSchema = () => ({
    layout: "hq",
    pageTitle: "topbarCenterText",
    progress: 35,
    next: "/create-canopy-account/company-shareholder-document",
    type: "object",
    title: "title",
    description: "description",
    fieldName: "companyRegistrationDocument",
    properties: {
      companyRegistrationDocument: {},
    },
  });

  const getMockFileNative = () => ({
    size: 1024,
    type: "image/png",
    name: "File name",
  });
});
