import {SHOW_MODAL, HIDE_MODAL} from "./types";

export const showModal = modalContent => ({
  type: SHOW_MODAL,
  modalContent,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const setModalVisible = param => {
  return (dispatch, getState) => {
    const {translations} = getState().locale;
    let content;

    switch (param) {
      case "whatIsARentPassport":
        content = translations.whatIsARentPassport_modal_content;
        break;
      case "whatIsOpenBanking":
        content = translations.whatIsOpenBanking_modal_content;
        break;
      default:
        break;
    }

    dispatch(showModal(content));
  };
};
