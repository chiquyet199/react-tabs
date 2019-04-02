import {SHOW_MODAL, HIDE_MODAL} from "./types";
import {showModal, hideModal, setModalVisible} from "./modal";

describe("action modal", () => {
  it("show modal", () => {
    const modalContent = "Modal content";
    const expectedAction = {
      type: SHOW_MODAL,
      modalContent,
    };
    expect(showModal(modalContent)).toEqual(expectedAction);
  });

  it("hide modal", () => {
    const expectedAction = {
      type: HIDE_MODAL,
    };
    expect(hideModal()).toEqual(expectedAction);
  });

  describe("set modal visible", () => {
    const getState = () => ({
      locale: {
        translations: {
          whatIsARentPassport_modal_content:
            "whatIsARentPassport_modal_content",
          whatIsOpenBanking_modal_content: "whatIsOpenBanking_modal_content",
        },
      },
    });
    const cases = ["whatIsARentPassport", "whatIsOpenBanking", undefined];
    const dispatch = jest.fn();

    cases.forEach(item => {
      it(`check props - ${item}`, async () => {
        await setModalVisible(item)(dispatch, getState);
        expect(dispatch).toBeCalledWith(
          showModal(item !== undefined ? `${item}_modal_content` : undefined),
        );
      });
    });
  });
});
