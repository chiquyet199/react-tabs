import React from "react";
import {shallow} from "enzyme";
import {
  FileUpload,
  StyledButton,
  StyledIcon,
  UploadedFile,
} from "./WebFileUpload";
import {Field} from "redux-form";
import configureStore from "redux-mock-store";
import theme from "../../../../canopy-hq/src/constants/theme";
import {initialState} from "../../__mocks__/initialState";
const mockStore = configureStore();
import {extend} from "underscore";
import {MockFile} from "../../__mocks__/fileMock.js";
import {isWeb} from "../../utils/common";

describe("WebFileUpload tests", () => {
  it("matches snapshot", () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it("use `fileUpload` key in schema if no fieldName is provided", () => {
    const component = getComponent().dive();
    expect(component.find(Field).prop("name")).toBe("fileUpload");
  });

  it("includes dynamic fieldName in schema as a key", () => {
    const fieldName = "customName";
    const component = getComponent({fieldName});
    expect(component.find(Field).prop("name")).toBe(fieldName);
  });

  it("renders Dropzone component and renders list then file is passed and removes on click", async () => {
    const fieldName = "customName";
    const reset = jest.fn();
    const field = {
      input: {
        onChange: jest.fn(),
      },
      meta: {
        error: {},
        touched: false,
      },
    };
    const component = getComponent({fieldName, reset});
    const mock = new MockFile();
    const file = isWeb ? await mock.create() : getMockFileNative();
    component.setState({accepted: [file]});
    component.update();
    expect(component).toMatchSnapshot();
    const dropzone = component.find(Field).prop("component")(field);
    const dropzoneComp = shallow(dropzone);
    expect(dropzoneComp.prop("accepted")).toBe(1);
    expect(dropzoneComp.find(StyledButton).prop("middle")).toBe(
      mockProps.btnText,
    );
    expect(dropzoneComp.find(StyledButton).prop("type")).toBe(
      mockProps.btnType,
    );
    component.find(StyledIcon).prop("onPress")();
    expect(reset).toHaveBeenCalled();
    component.update();
    expect(component.find(UploadedFile)).not.toExist();
  });

  const mockProps = {
    btnText: "Select file",
    btnType: "secondary",
    onSubmit: () => {},
    globaltheme: "light",
    theme,
    reset: () => {},
  };
  const getComponent = props => {
    const parsedProps = extend(mockProps, props);

    return shallow(<FileUpload {...parsedProps} />, {
      context: {store: mockStore(initialState)},
    });
  };

  const getMockFileNative = () => ({
    size: 1024,
    type: "image/png",
    name: "File Name",
  });
});
