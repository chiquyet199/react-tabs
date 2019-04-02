import React from "react";
import {View} from "react-native";
import {shallow} from "enzyme";
import {FileUpload} from "./WebImageUpload";
import {StyledDropzone, ContainerDiv} from "./ImagesUpload.styles";
import {Field} from "redux-form";
import _ from "underscore";

describe("Image Uploader", () => {
  /*
  for reasons that remain mysterious, the following test
  fails. However, when we wrap the renderer in a View, it
  passes just fine. So that's what we do.
  it("has a Dropzone - fails", () => {
    const fld = getComponent().find(Field);
    const renderer = fld.prop("component");
    const component = shallow(renderer({
      input: { onChange: () => {} },
      name: "Ulrich the Uploader"
    }));
    expect(component.type()).toEqual(StyledDropzone);
  }); */
  it("has a Dropzone", () => {
    const dropzone = getRenderedDropzone();
    expect(dropzone.type()).toEqual(StyledDropzone);
  });

  it("When accepted has image, it should render a Image Container", () => {
    const component = getComponent();
    expect(component.find(ContainerDiv)).toHaveLength(1);
  });

  it("When there is no image, there should be no image container", () => {
    const component = getComponent({accepted: []});
    expect(component.find(ContainerDiv)).toHaveLength(0);
  });

  it("When remove image is clicked, should call removeImage function", () => {
    const mockRemoveImage = jest.fn();
    const component = getComponent({
      removeImage: mockRemoveImage,
    });
    const removeImageButton = component.find("#remove-image");
    removeImageButton.simulate("press");
    expect(mockRemoveImage).toHaveBeenCalled();
  });

  it("Radio button onChange calls supplied callback", () => {
    const radioChange = jest.fn();
    const component = getComponent({
      radioChange,
    });
    const radioButton = component.find("#radio-button");
    radioButton.simulate("change");
    expect(radioChange).toHaveBeenCalled();
  });

  it("Dropzone uploads image", () => {
    const uploadImage = jest.fn();
    const component = getComponent({accepted: [], uploadImage});
    const dropzone = getRenderedDropzone(component);
    const dropArgs = {
      dataTransfer: {
        images: {
          name: "cat.jpg",
          size: 1000,
          type: "image/jpeg",
        },
      },
    };
    dropzone.simulate("drop", dropArgs);
    expect(uploadImage).toHaveBeenCalledWith(
      expect.arrayContaining([dropArgs]),
    );
  });

  const getRenderedDropzone = (component = getComponent({accepted: []})) => {
    const fld = component.find(Field);
    const renderer = fld.prop("component");

    return shallow(
      <View>
        {renderer({
          input: {
            onChange: () => {},
          },
          name: "Ulrich the Uploader",
        })}
      </View>,
    ).childAt(0);
  };
});
const getComponent = props => {
  const parsedProps = _.extend(getMockProps(), props);

  return shallow(<FileUpload {...parsedProps} />);
};

const getMockProps = () => ({
  accepted: [
    {
      name: "IMG_2861.PNG",
      preview:
        "blob:http://localhost:3000/fe784a9a-c03d-40cc-a2a5-6dde2351ecf9",
      size: 809477,
      type: "image/png",
      webkitRelativePath: "",
    },
  ],
  removeImage: () => {},
  translations: {
    chooseFile: "chooseFile",
    fileRule: "fileRule",
    defaultImage: "defaultImage",
  },
  uploadImage: () => {},
});
