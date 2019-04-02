import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";
import {initialState} from "../../__mocks__/initialState";
import translations from "../../utils/locales/en-US";
import RentPassportCollapseContent, {
  FlexContainer,
} from "./RentPassportCollapseContent";
import RentPassportTextField from "../RentPassportTextField";
import RightToRentPreview from "../../components/RightToRentPreview";
import NotificationPanel from "../NotificationPanel";
import {RentPassportCompleteContentSchema} from "../../schemas/subschemas/RentPassportCompleteContentSchema";
import RentPassportHelpers from "../../utils/helpers/rentPassport";
import configureStore from "redux-mock-store";

const componentName = "financial";
const compTranslations = translations.rent_passport_complete;

const schema = RentPassportCompleteContentSchema(
  componentName,
  initialState.rentPassport,
  compTranslations,
);

const aboutYou = {
  properties: () => [
    {
      name: {
        title: "test",
        value: "n/a",
        width: 100,
      },
      email: {
        title: "test",
        value: "",
        width: 100,
      },
      phoneNumber: {
        title: "test",
        value: "",
        width: 100,
      },
      rightToRentInfo: {
        documentStatus: "verified",
        legalWarnings: false,
        documentSample:
          "https://www.apostille.org.uk/sites/default/files/sample-passport700w-wm.gif",
        sanctions: false,
        status: "GREEN",
        uiComponent: "rightToRentComponent",
        messages: [],
      },
    },
  ],
};

const {status, messages} = initialState.rentPassport[componentName];

const mockProps = {
  schema: schema[componentName].properties(),
  globaltheme: "light",
  errorTexts: compTranslations.errors,
  status: "RED",
  messageGroups: ["grossAnnualIncome.unverified"],
  multipleMessages: undefined,
  scaleImages: {},
  goTo: () => {},
  showModal: () => {},
};

const mockPropsSchemaIsNull = {
  schema: {},
  globaltheme: "light",
  errorTexts: compTranslations.errors,
  status: "RED",
  messageGroups: [],
  multipleMessages: undefined,
  scaleImages: {},
  goTo: () => {},
  showModal: () => {},
};

const mockPropsWithoutNotificationPanel = {
  schema: schema[componentName].properties(),
  globaltheme: "light",
  errorTexts: compTranslations.errors,
  status: "GREEN",
  messageGroups: [],
  multipleMessages: undefined,
  scaleImages: {},
  goTo: () => {},
  showModal: () => {},
};

const mockPropsWithCustomSchema = {
  schema: aboutYou.properties(),
  globaltheme: "light",
  errorTexts: compTranslations.errors,
  status: "RED",
  messageGroups: [],
  multipleMessages: undefined,
  scaleImages: {},
  goTo: () => {},
  showModal: () => {},
};

const mockStore = configureStore(mockProps);
const Comp = <RentPassportCollapseContent {...mockProps} />;

const mockStoreNullSchema = configureStore(mockPropsSchemaIsNull);
const CompNullSchema = (
  <RentPassportCollapseContent {...mockPropsSchemaIsNull} />
);

const mockStoreCustomSchema = configureStore(mockPropsWithCustomSchema);
const CompCustomSchema = (
  <RentPassportCollapseContent {...mockPropsWithCustomSchema} />
);

const mockStoreWithoutNotification = configureStore(
  mockPropsWithoutNotificationPanel,
);
const CompWithoutNotification = (
  <RentPassportCollapseContent {...mockPropsWithoutNotificationPanel} />
);

describe("<RentPassportComplete />", () => {
  let wrapper;
  let hideNotificationPanel;
  let compSchemaNull;
  let compCustomSchema;
  beforeEach(() => {
    wrapper = shallow(Comp, {
      context: {store: mockStore(initialState)},
    });
    hideNotificationPanel = shallow(CompWithoutNotification, {
      context: {store: mockStoreWithoutNotification(initialState)},
    });
    compSchemaNull = shallow(CompNullSchema, {
      context: {store: mockStoreNullSchema(initialState)},
    });
    compCustomSchema = shallow(CompCustomSchema, {
      context: {store: mockStoreCustomSchema(initialState)},
    });
  });

  describe("RentPassportCollapseContent component", () => {
    it("renders properly - " + Platform.OS, () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("rightToRentPreviewComponent", () => {
    it("renders properly - " + Platform.OS, () => {
      expect(compCustomSchema.find(RightToRentPreview)).toExist();
    });
  });

  describe("Notification", () => {
    it("Notification panel must be null - " + Platform.OS, () => {
      const notification = hideNotificationPanel.find(NotificationPanel);
      expect(notification).toHaveLength(0);
    });

    it("renders properly - " + Platform.OS, () => {
      const actions = {goTo: mockProps.goTo, showModal: mockProps.showModal};
      const content = RentPassportHelpers.renderContent(
        mockProps.status,
        mockProps.messageGroups[0],
        mockProps.errorTexts,
        actions,
      );
      const {type} = RentPassportHelpers.getNotificationType(mockProps.status);
      const notification = wrapper.find(NotificationPanel);
      expect(notification).toHaveLength(1);
      expect(notification.prop("type")).toEqual(type);
      expect(JSON.stringify(notification.prop("content"))).toEqual(
        JSON.stringify(content),
      );
    });
  });

  it("displays Notification panel if notifications set", () => {
    const component = shallow(
      <RentPassportCollapseContent
        globaltheme="light"
        errorTexts={compTranslations.errors}
        schema={schema[componentName].properties()}
        messageGroups={["ERROR"]}
        status={status}
        goTo={() => {}}
        showModal={() => {}}
      />,
    );
    expect(component.find(NotificationPanel)).toHaveLength(1);
  });

  it("doesn't display Notification panel if notifications aren't set", () => {
    const component = shallow(
      <RentPassportCollapseContent
        globaltheme="light"
        errorTexts={compTranslations.errors}
        schema={schema[componentName].properties()}
        messageGroups={messages}
        status={status}
        goTo={() => {}}
        showModal={() => {}}
      />,
    );
    expect(component.find(NotificationPanel)).toHaveLength(0);
  });

  describe("Fields", () => {
    it(
      "Check RentPassportTextField match with schema title - " + Platform.OS,
      () => {
        const schemaItemProperties = mockProps.schema;
        const fields = wrapper.find(RentPassportTextField);

        fields.forEach(field => {
          const [fieldTitles] = Object.entries(schemaItemProperties).map(
            ([, property]) => {
              return Object.entries(property).map(
                ([, obj]) =>
                  obj.title === field.prop("title") ? obj.title : false,
              );
            },
          );
          const title = fieldTitles.find(i => i === field.prop("title"));
          if (!title) {
            expect(fieldTitles).toBe(9999);
            expect(field.props()).toBeFalsy();
          }
          expect(title).not.toBeUndefined();
        });
      },
    );

    it(
      "Check RentPassportTextField match with schema value - " + Platform.OS,
      () => {
        const schemaItemProperties = mockProps.schema;
        const fields = wrapper.find(RentPassportTextField);

        fields.forEach(field => {
          const [fieldTitles] = Object.entries(schemaItemProperties).map(
            ([, property]) => {
              return Object.entries(property).map(
                ([, obj]) =>
                  obj.value === field.prop("value") ? obj.value : false,
              );
            },
          );
          const title = fieldTitles.find(i => i === field.prop("value"));
          expect(title).not.toBeUndefined();
        });
      },
    );
  });

  describe("When schema properties is null", () => {
    it("renders properly - " + Platform.OS, () => {
      expect(compSchemaNull.find(FlexContainer)).not.toExist();
    });
  });
});
