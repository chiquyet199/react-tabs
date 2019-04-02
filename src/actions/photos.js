import {STORE_BACK_PHOTO, STORE_PHOTO} from "./types";
import API from "../utils/api";
import * as NotificationsAction from "./notifications";
import {push} from "connected-react-router";

export const sendRightToRentRequest = rightToRentData => async dispatch => {
  const dataJson = dataToJson(rightToRentData);
  const rightToRent = await API.sendRightToRentProof(dataJson).catch(
    ({error}) => dispatch(NotificationsAction.errorNotification(error)),
  );

  if (rightToRent) {
    dispatch(push("/invited-to-rent"));
  }
};

export const noCameraError = error => dispatch => {
  dispatch(NotificationsAction.errorNotification(error));
};

export const storePhoto = photo => ({
  type: STORE_PHOTO,
  photo,
});

export const storeBackPhoto = photo => ({
  type: STORE_BACK_PHOTO,
  photo,
});

const toImage = (side, photo) => ({type: side, url: photo});

const dataToJson = data => {
  return {
    sharedPassportId: data.rightToRentPhoto.passportId,
    documents: [
      {
        type: data.rightToRentPhoto.documentType,
        images: [
          data.rightToRentPhoto.data.uri &&
            toImage("FRONT", data.rightToRentPhoto.data.uri),
          data.rightToRentPhotoBack &&
            toImage("BACK", data.rightToRentPhotoBack.data.uri),
        ],
      },
    ],
  };
};
