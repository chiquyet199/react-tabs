import {REMOVE_IMAGE, UPLOAD_IMAGE} from "./types";

export const uploadImage = image => {
  return {
    type: UPLOAD_IMAGE,
    image,
  };
};

export const removeImage = image => {
  return {
    type: REMOVE_IMAGE,
    image,
  };
};
