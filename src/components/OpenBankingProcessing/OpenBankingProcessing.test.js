import React from "react";
import {shallow} from "enzyme";
import {
  OpenBankingProcessing,
  RentPassportPopulating,
  RentPassportPopulated,
  RentPassportFailed,
} from "./OpenBankingProcessing";
import {
  PageContainer,
  HeadlineText,
  TextParagraph,
  TextLink,
} from "../common/layout";
import Button from "../../components/Button";
import {BankPicture, HeadlineTextError} from "./OpenBanking.style";
import themes from "../../constants/theme";

const theme = themes.selva;
const translations = {
  populating_rent_passport: "We’re currently populating your Rent Passport…",
  rent_passport_benefits_description:
    "This will speed up your rental journey and make sure you have the most accurate referencing data.",
  open_banking_not_updating: "Open Banking not updating?",
  rent_passport_populated: "Rent Passport successfully populated!",
  rent_passport_populated_description:
    "Your Rent Passport has been pre-populated as much as possible through your banking data.\n" +
    "Please continue and review the information to ensure it is correct.",
  continue_to_rent_passport: "Continue to my Rent Passport",
  open_banking_failed: "Open Banking access failed.\nIt's not you, it's us.",
  open_banking_failed_description:
    "You can always start your Rent Passport  manually and try linking later.",
  start_my_rent_passport: "Start my Rent Passport",
  not_now: "Not now",
};

describe("Open Banking Processing component renders", () => {
  it(" with 'populating' status", () => {
    const tree = shallow(createComponent("populating"));
    expect(tree.find(PageContainer)).toHaveLength(1);
    expect(tree.find(BankPicture)).toHaveLength(1);
    expect(tree.find(RentPassportPopulating)).toHaveLength(1);
  });
  it(" with 'success' status", () => {
    const tree = shallow(createComponent("success"));
    expect(tree.find(PageContainer)).toHaveLength(1);
    expect(tree.find(BankPicture)).toHaveLength(1);
    expect(tree.find(RentPassportPopulated)).toHaveLength(1);
  });
  it(" with 'fail' status", () => {
    const tree = shallow(createComponent("fail"));
    expect(tree.find(PageContainer)).toHaveLength(1);
    expect(tree.find(BankPicture)).toHaveLength(1);
    expect(tree.find(RentPassportFailed)).toHaveLength(1);
  });
});

describe("Open Banking Processing uses correct sub-component", () => {
  it("for 'populating' status", () => {
    const openBankingNotUpdating = jest.fn();
    const tree = shallow(
      <RentPassportPopulating
        translations={translations}
        openBankingNotUpdating={openBankingNotUpdating}
      />,
    );
    expect(tree.find(HeadlineText).props().children).toEqual(
      translations.populating_rent_passport,
    );
    expect(tree.find(TextParagraph).props().children).toEqual(
      translations.rent_passport_benefits_description,
    );
    const textLink = tree.find(TextLink);
    expect(textLink.props().children).toEqual(
      translations.open_banking_not_updating,
    );
    textLink.simulate("click");
    expect(openBankingNotUpdating).toHaveBeenCalled();
  });
  it("for 'success' status", () => {
    const continueToRentPassport = jest.fn();
    const tree = shallow(
      <RentPassportPopulated
        translations={translations}
        continueToRentPassport={continueToRentPassport}
      />,
    );
    expect(tree.find(HeadlineText).props().children).toEqual(
      translations.rent_passport_populated,
    );
    expect(tree.find(TextParagraph).props().children).toEqual(
      translations.rent_passport_populated_description,
    );
    const button = tree.find(Button);
    expect(button.props().middle).toEqual(
      translations.continue_to_rent_passport,
    );
    button.simulate("click");
    expect(continueToRentPassport).toHaveBeenCalled();
  });
  it("for 'fail' status", () => {
    const startRentPassport = jest.fn();
    const rentPassportNotNow = jest.fn();
    const tree = shallow(
      <RentPassportFailed
        translations={translations}
        startRentPassport={startRentPassport}
        rentPassportNotNow={rentPassportNotNow}
      />,
    );
    expect(tree.find(HeadlineTextError).props().children).toEqual(
      translations.open_banking_failed,
    );
    expect(tree.find(TextParagraph).props().children).toEqual(
      translations.open_banking_failed_description,
    );
    expect(tree.find(Button)).toHaveLength(2);

    const buttonStart = tree.find(Button).at(0);
    expect(buttonStart.props().middle).toEqual(
      translations.start_my_rent_passport,
    );
    const buttonNotNow = tree.find(Button).at(1);
    expect(buttonNotNow.props().middle).toEqual(translations.not_now);
    buttonStart.simulate("click");
    expect(startRentPassport).toHaveBeenCalled();

    buttonNotNow.simulate("click");
    expect(rentPassportNotNow).toHaveBeenCalled();
  });
});

const createComponent = status => {
  return (
    <OpenBankingProcessing
      status={status}
      translations={translations}
      continueToRentPassport={jest.fn()}
      startRentPassport={jest.fn()}
      rentPassportNotNow={jest.fn()}
      openBankingNotUpdating={jest.fn()}
      theme={theme}
      globaltheme="light"
    />
  );
};
