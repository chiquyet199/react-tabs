import React from "react";
import {shallow} from "enzyme";
import {extend} from "underscore";
import Property from "./Property";
import {Button} from "../../components/Button";
import Dialog from "../../components/Dialog";
import {isWeb} from "../../utils/common";

describe("Property - page tests", () => {
  it("matches snapshot", () => {
    expect(getComponent()).toMatchSnapshot();
  });

  if (isWeb) {
    it("Renders Button and onClick on RequestRentPassport", async () => {
      const goTo = jest.fn();
      const comp = await getComponent({
        goTo,
      });
      comp.find("#Request-passport-button").simulate("click");
      expect(goTo).toHaveBeenCalled();
    });

    it("Renders RentPassportList with rentPassports", async () => {
      const rentPassports = getMockProps().sharedRentPassports;
      const comp = await getComponent();
      const rentPassportList = comp.find("#RentPassportList");
      expect(rentPassportList.props().data).toEqual(rentPassports);
    });
  }

  it("fetch property with correct id on mount", async () => {
    const {id} = getMockProps().match.params;
    const fetchPropertyById = jest.fn();
    await getComponent({
      fetchPropertyById,
    });
    expect(fetchPropertyById).toHaveBeenCalledWith(id);
  });

  it("shows expected text for page title", async () => {
    const {line1} = getMockProps().property.address;
    const showTopbarCenterText = jest.fn();
    await getComponent({
      showTopbarCenterText,
    });
    expect(showTopbarCenterText).toHaveBeenCalledWith(line1);
  });

  it("If no Rent Passport - renders Button and triggers redirect to /rent-passport", () => {
    const goTo = jest.fn();
    const mockProperty = getMockProps().property;
    mockProperty.shareStatus = "no_rent_passport";
    const property = Object.assign({}, mockProperty);
    const comp = getComponent({
      property,
      goTo,
    });
    comp.find(Button).simulate("click");
    expect(goTo).toHaveBeenCalled();
  });

  it("If Rent Passport is not shared - renders Button with proper text", () => {
    const goTo = jest.fn();
    const mockProperty = getMockProps().property;
    const buttonText = getMockProps().translations.shareRentPassport;
    mockProperty.shareStatus = "not_shared";
    const property = Object.assign({}, mockProperty);
    const comp = getComponent({
      property,
      goTo,
    });
    comp.find(Button).simulate("click");
    expect(comp.find(Button).prop("middle")).toBe(buttonText);
  });

  it("Properly calls remove property method", async () => {
    const mockProps = getMockProps();
    const deleteSharedPropertyByIds = jest.fn();
    const comp = getComponent({
      deleteSharedPropertyByIds,
    });
    const removeDialog = comp
      .find(Dialog)
      .findWhere(
        el =>
          el.prop("title") === mockProps.translations.removeDialog.dialogTitle,
      );
    const {onDialogConfirm} = removeDialog.props();
    onDialogConfirm();
    expect(deleteSharedPropertyByIds).toHaveBeenCalledWith({
      propertyId: mockProps.match.params.id,
      groupId: null,
    });
  });

  it("Properly calls share rent passport method", async () => {
    const mockProps = getMockProps();
    const sharePropertyRentPassport = jest.fn();
    const comp = getComponent({
      sharePropertyRentPassport,
    });
    const shareDialog = comp
      .find(Dialog)
      .findWhere(
        el =>
          el.prop("paragraph") ===
          mockProps.translations.shareDialog.dialogParagraph,
      );
    const {onDialogConfirm} = shareDialog.props();
    onDialogConfirm();
    expect(sharePropertyRentPassport).toHaveBeenCalledWith(
      mockProps.match.params.id,
    );
  });

  it("properly converts backend furnished type", () => {
    const comp = getComponent();
    expect(comp.instance().getFurnishedType("FULLY_FURNISHED")).toEqual(
      "Fully furnished",
    );
  });

  it("generates remove dialog with correct props", () => {
    const props = getMockProps();
    const removeDialog = getComponent(props)
      .find(Dialog)
      .at(0);
    expect(removeDialog).toHaveProp("confirmButtonType", "danger");
    expect(removeDialog).toHaveProp(
      "cancelButtonText",
      props.translations.removeDialog.dialogCancel,
    );
    expect(removeDialog).toHaveProp(
      "confirmButtonText",
      props.translations.removeDialog.dialogConfirm,
    );
    expect(removeDialog).toHaveProp("globaltheme", props.globaltheme);
    expect(removeDialog).toHaveProp(
      "title",
      props.translations.removeDialog.dialogTitle,
    );
    expect(removeDialog).toHaveProp(
      "paragraph",
      `${props.translations.removeDialog.dialogParagraph1} "${
        props.agency.name
      }-${props.branch.name}"? ${
        props.translations.removeDialog.dialogParagraph2
      }`,
    );
  });

  it("generates share dialog with correct props", () => {
    const props = getMockProps();
    const shareDialog = getComponent(props)
      .find(Dialog)
      .at(1);
    expect(shareDialog).toHaveProp("confirmButtonType", "danger");
    expect(shareDialog).toHaveProp(
      "cancelButtonText",
      props.translations.shareDialog.dialogCancel,
    );
    expect(shareDialog).toHaveProp(
      "confirmButtonText",
      props.translations.shareDialog.dialogConfirm,
    );
    expect(shareDialog).toHaveProp("globaltheme", props.globaltheme);
    expect(shareDialog).toHaveProp(
      "title",
      `${props.translations.shareDialog.dialogTitle} "${props.agency.name},${
        props.branch.name
      }"?`,
    );
    expect(shareDialog).toHaveProp(
      "paragraph",
      props.translations.shareDialog.dialogParagraph,
    );
  });

  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<Property {...parsedProps} />);
  };

  const getMockProps = () => ({
    match: {params: {id: "12"}},
    globaltheme: "light",
    fetchSharedPassportsWithProperty: jest.fn(),
    resetCheckedPassport: jest.fn(),
    passportsSelected: [],
    sharedRentPassports: defaultPassports,
    addPassportsToShare: () => {},
    selectedPassportType: "shared",
    isAgent: true,
    theme: {
      light: {
        baseColor: "#6b7c93",
        lightSteel: "#e3eaf2",
        veryLightSteel: "#f6f9fc",
      },
    },
    property: {
      presentation: {
        propertyType: "APARTMENT",
        bedroomsCount: 2,
        bathroomsCount: 2,
        furnishedType: "PART_FURNISHED",
        hasParking: true,
        hasOutsideSpace: true,
        petsAllowed: true,
        smokingAllowed: false,
        dateAvailable: "11-12-2019",
        summary: "2 bed apartment to rent",
        description:
          "Well presented ground floor apartment available on Stamford Street. The property is offered unfurnished and comprises entrance hallway, downstairs WC, lounge/diner with doors to balcony/terrace, storage cupboards, kitchen with white goods including electric cooke. Well presented ground floor apartment available on Stamford Street. The property is offered unfurnished and comprises entrance hallway, downstairs WC, lounge/diner with doors to balcony/terrace, storage cupboards, kitchen with white goods including electric cooker.",
      },
      rentFrequency: "MONTHLY",
      rentAmount: 1200,
      depositAmount: 1800,
      depositFreeAvailable: true,
      landlord: {
        firstName: "firstName",
        lastName: "lastName",
        email: "landlord1@gmail.com",
        phone: "01234567890",
        address: {
          line1: "Address line 1",
          line2: "Address line 2",
          town: "City / Town",
          state: "State",
          postCode: "FYC123",
          countryCode: "UK",
        },
      },
      createdBy: "67e4b887-466e-4abe-8d12-bc87204e5df8",
      agencyId: "67e4b887-466e-4abe-8d12-bc87204e5df8",
      branchId: "01a5b187-313s-7gtc-4a31-av51034r1ea1",
      createdAt: "01-01-2017",
      updatedAt: "01-01-2017",
      propertyImages: [
        {
          url:
            "http://cdn.home-designing.com/wp-content/uploads/2016/04/luxury-art-deco-apartment-interior.jpg",
          isPrimary: true,
          createdAt: "01-01-2017",
          updatedAt: "01-01-2017",
          version: 1,
        },
        {
          url:
            "http://cdn.home-designing.com/wp-content/uploads/2016/04/luxury-art-deco-apartment-interior.jpg",
          isPrimary: false,
          createdAt: "01-01-2017",
          updatedAt: "01-01-2017",
          version: 1,
        },
        {
          url:
            "http://cdn.home-designing.com/wp-content/uploads/2016/04/luxury-art-deco-apartment-interior.jpg",
          isPrimary: false,
          createdAt: "01-01-2017",
          updatedAt: "01-01-2017",
          version: 1,
        },
      ],
      address: {
        line1: "Address line 1",
        line2: "Address line 2",
        town: "City / Town",
        state: "State",
        postCode: "FYC123",
        countryCode: "UK",
      },
      shareStatus: "not_shared",
    },
    agency: {
      id: "a71bbc1c-3fe5-4c2f-8083-d4e1055f2f18",
      name: "Real Agency",
      type: "ESTATE_AGENCY",
      companyRegistrationNumber: "01234567",
      phone: "0123456790",
      address: {
        line1: "Address line 1",
        line2: "Address line 2",
        town: "City / Town",
        state: "State",
        postCode: "FYC123",
        countryCode: "UK",
      },
      agents: [],
      legalRepresentative: {
        firstName: "Becky",
        lastName: "Hammond",
        address: {
          line1: "Address line 1",
          line2: "Address line 2",
          town: "City / Town",
          state: "State",
          postCode: "FYC123",
          countryCode: "UK",
        },
        dob: "01-01-1980",
      },
      bankAccount: {
        accountHolder: "accountHolder",
        accountNumber: "accountNumber",
        sortCode: "sortCode",
      },
      isActive: true,
    },
    branch: {
      id: "1bc9925d-6ae6-4448-9523-05912cdce917",
      agencyId: "c9a463b0-b019-45b6-be57-720eb28d0bc0",
      name: "Chelsea",
      address: {
        line1: "Address line 1",
        line2: "Address line 2",
        town: "City / Town",
        state: "State",
        postCode: "FYC123",
        countryCode: "UK",
      },
      phone: "01123456789",
    },
    translations: {
      removePassportDialog: {
        title: "Delete Passport",
        pendingTitle: "Delete Request",
        paragraph: "Are you sure you want to delete the selected passport?",
        pendingParagraph: "Are you sure you want to delete the request?",
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
      },
      removeDialog: {
        dialogTitle: "Confirm stop sharing property",
        dialogParagraph1: "Are you sure you want to stop sharing with",
        dialogParagraph2: "This stop sharing with all associated properties",
        dialogCancel: "Cancel",
        dialogConfirm: "Stop sharing",
      },
      shareDialog: {
        dialogTitle: "Share your Rent Passport with",
        dialogParagraph:
          "This will share all information in your Rent Passport and qualify you against the property.",
        dialogCancel: "Cancel",
        dialogConfirm: "Share",
      },
      property: {
        pcm: "pcm",
        depositRequired: "deposit required",
        DepositFree: "Deposit Free",
        available: "available",
        unavailable: "unavailable",
        whatIs: "What is",
        bedrooms: "bedrooms",
        bathrooms: "bathrooms",
        pets: "Pets",
        parking: "Parking",
        smoking: "Smoking",
        outsideSpace: "Outside space",
      },
      shareRentPassport: "Share Rent Passport",
      createRentPassport: "Create a RentPassport to rent this property.",
      whatIsRentPassport: "What is a Rent Passport?",
      startRentPassport: "Start my Rent Passport",
    },
    fetchPropertyById: () => {},
    deleteSharedPropertyByIds: () => {},
    sharePropertyRentPassport: () => {},
    updateTopbarButton: () => {},
    showTopbarButton: () => {},
    showTopbarCenterText: () => {},
  });
});

const defaultPassports = [
  {
    id: 777,
    name: "Jonathan Beaumont",
    status: "Fully referenced",
  },
  {
    id: 666,
    name: "James Wang",
    status: "Partially referenced",
  },
  {
    id: 111,
    name: "Jennifer Jones",
    status: "Not fully referenced",
  },
  {
    id: 133,
    name: "joshua_yates99@hotmail.com",
    pending: true,
  },
  {
    id: 134,
    name: "bob_marley66@hotmail.com",
    pending: true,
  },
];
