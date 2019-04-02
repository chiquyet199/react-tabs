import {uploadImage, removeImage} from "../actions/images";
import {REMOVE_IMAGE, UPLOAD_IMAGE} from "./types";

describe("uploadImage tests", () => {
  it("has type of UPLOAD_IMAGE", () => {
    expect(uploadImage()).toEqual(
      expect.objectContaining({type: UPLOAD_IMAGE}),
    );
  });

  it("has image", () => {
    expect(uploadImage("imageOne")).toEqual(
      expect.objectContaining({
        type: "UPLOAD_IMAGE",
        image: "imageOne",
      }),
    );
  });
});

describe("removeImage tests", () => {
  it("has type of REMOVE_IMAGE", () => {
    expect(removeImage()).toEqual(
      expect.objectContaining({type: REMOVE_IMAGE}),
    );
  });

  it("has image", () => {
    expect(removeImage("imageOne")).toEqual(
      expect.objectContaining({
        type: "REMOVE_IMAGE",
        image: "imageOne",
      }),
    );
  });
});
