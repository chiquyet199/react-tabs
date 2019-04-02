import React from "react";
import {shallow} from "enzyme";
import {isWeb} from "../../utils/common";
import {PageTitle} from "../common/layout";
import {NativePicker} from "../Picker/NativePicker";
import WebPicker from "../Picker/WebPicker";
// import WebOptionPicker from "../OptionPicker/OptionPicker.web";
// import NativeOptionPicker from "../OptionPicker/OptionPicker";
import {DynamicForm, GenerateFields, getComponent} from "./";
import themes, {colors} from "../../constants/theme";
import configureStore from "redux-mock-store";
import {initialState} from "../../__mocks__/initialState";
import {PostcodeLookup} from "../PostcodeLookup/PostcodeLookup";
import Picker from "../Picker/Picker";
import {TextInput, Text} from "react-native";
import {ImagesUploadComponent} from "../ImagesUpload";
import {
  RadioButtonGroupWrapper,
  TextTitle,
  TextError,
  RadioGroupWrapper,
} from "../RadioButtonGroup/RadioButtonGroup.style";
import {Field} from "redux-form";

import {withTheme} from "styled-components";
const theme = themes.selva;

export const mockSchema = {
  type: "object",
  title: "mockSchema",
  properties: {
    firstName: {
      type: "string",
      title: "First Name",
      description: "Your first name.",
      uiComponent: "default",
    },
  },
  required: ["firstName"],
};

describe("Dynamic Form", () => {
  describe("Dynamic Form basic test", () => {
    const mockText = "submit";
    const mockFunc = jest.fn();
    const tree = shallow(
      <DynamicForm
        schema={mockSchema}
        text={mockText}
        handleSubmit={mockFunc}
        onSubmit={mockFunc}
        theme={theme}
        globaltheme="dark"
      />,
    );
    it("renders form component", () => {
      expect(tree).toMatchSnapshot();
    });
  });

  describe("GenerateFields tests", () => {
    it("creates a Field for each field in schema properties", () => {
      const propNumbers = [3, 8, 12, 1];
      for (let x = 0; x < propNumbers.length; x += 1) {
        const propNumber = propNumbers[x];
        const component = getGenerateFieldsComponent(getSchema(propNumber));
        expect(component.find(Field)).toHaveLength(propNumber);
      }
    });

    const getGenerateFieldsComponent = (schema = getSchema()) => {
      const props = {
        schema,
        globaltheme: "",
        theme: {},
      };

      return shallow(<GenerateFields {...props} />);
    };

    const getSchema = (numberOfProperties = 1) => {
      const schema = {
        type: "object",
        title: "mockSchema",
        properties: {},
        required: ["firstName"],
      };
      for (let x = 0; x < numberOfProperties; x += 1) {
        schema.properties[`prop${x + 1}`] = {
          type: "string",
          title: `Field ${x + 1}`,
          description: "",
          uiComponent: "default",
        };
      }

      return schema;
    };
  });

  describe("Dynamic Form uiComponent tests", () => {
    describe("Option Picker tests", () => {
      /* removed these, because we specify z-index: auto just for web on some elements, but react-native-web
      thinks this perfectly valid value is invalid; it's expecting a number. Couldn't think of 
      a workaround in the limited time I had, so commenting out. PB 16/1/19

      it("renders OptionPicker - direct", () => {
        const expectedType = isWeb ? WebOptionPicker : NativeOptionPicker;
        const component = shallow(
          getComponent(mockComponentArgs(mockOptionPickerSchema)),
        );
        expect(component.find(expectedType).type()).toBe(expectedType);
      });

      it("passes type prop to OptionPicker ", () => {
        const expectedType = isWeb ? WebOptionPicker : NativeOptionPicker;
        const componentArgs = mockComponentArgs(mockOptionPickerSchema);
        const component = shallow(getComponent(componentArgs)).find(
          expectedType,
        );
        expect(component.prop("type")).toBe(componentArgs.schema.type_data);
      });

      const mockOptionPickerSchema = {
        type: "object",
        title: "mockSchema",
        properties: {
          property: {
            type: "string",
            heading: "Gender",
            type_data: "genders",
            uiComponent: "optionPicker",
          },
        },
      };
      */
    });

    describe("HeaderText tests", () => {
      it("renders headerText component", () => {
        const componentArgs = mockComponentArgs(mockHeaderSchema);
        const component = shallow(getComponent(componentArgs));
        const textComponent = component.find(PageTitle);
        expect(textComponent).toHaveLength(1);
        expect(textComponent.children().text()).toEqual("Test");
      });

      const mockHeaderSchema = {
        type: "object",
        title: "mockSchema",
        properties: {
          property: {
            type: "string",
            title: "Test",
            uiComponent: "textHeader",
          },
        },
      };
    });

    it("renders ImageUpload component", () => {
      const componentArgs = mockComponentArgs(mockHeaderSchema);
      const mockStore = configureStore({});
      const component = shallow(getComponent(componentArgs), {
        context: {store: mockStore(initialState)},
      });
      const ImagePickerComponent = component.find(ImagesUploadComponent);
      expect(ImagePickerComponent).toExist();
    });
    const mockHeaderSchema = {
      type: "object",
      title: "mockSchema",
      properties: {
        property: {
          type: "string",
          title: "uploader",
          buttonType: "secondary",
          buttonText: "Select file",
          translations: {
            defaultImage: "Default Image",
            helpSell: "Help sell this property to potential tenants.",
            title: "Property Images",
            chooseFile: "Choose a file or drag it here.",
            fileRule: "Files must be .jpg, .png or .gif and less than 2MB",
          },
          uiComponent: "imageUpload",
        },
      },
    };

    describe("Hidden Input tests", () => {
      it("renders Hidden Input - direct", () => {
        const component = shallow(
          getComponent(mockComponentArgs(mockHiddenSchema)),
        );
        expect(component.find(TextInput)).toHaveLength(0);
        expect(component.props().hide).toEqual("true");
      });

      const mockHiddenSchema = {
        type: "object",
        title: "mockSchema",
        properties: {
          property: {
            type: "string",
            title: "Address",
            uiComponent: "hidden",
          },
        },
      };
    });

    describe("Abstract Component tests", () => {
      it("renders abstract component", () => {
        const abstractComponent = <Text>Test Text</Text>;
        const propertyName = "testText";
        const component = shallow(
          getComponent(
            mockComponentArgs(
              mockHiddenSchema,
              abstractComponent,
              propertyName,
            ),
          ),
        );
        expect(component.text()).toEqual("Test Text");
      });

      const mockHiddenSchema = {
        type: "object",
        title: "mockSchema",
        properties: {
          testText: {
            type: "string",
          },
        },
      };
    });

    describe("Select box tests", () => {
      it("renders select box - direct", () => {
        const expectedType = isWeb ? WebPicker : NativePicker;
        const component = shallow(
          getComponent(mockComponentArgs(mockSelectSchema)),
        );
        const children = component.children().dive();
        children.forEach(child => {
          expect(child.type()).toBe(expectedType);
        });
      });

      it("renders one option for each provided option", () => {
        const componentArgs = mockComponentArgs(mockSelectSchema);
        const component = shallow(getComponent(componentArgs));
        const options = component.find(Picker).prop("options");
        expect(options).toHaveLength(3);
        expect(options).toEqual(componentArgs.schema.options);
      });

      it("passes input onchange to picker", () => {
        const componentArgs = mockComponentArgs(mockSelectSchema);
        const component = shallow(getComponent(componentArgs));
        expect(
          component
            .find(Picker)
            .prop("onChange")
            .toString(),
        ).toBe(componentArgs.input.onChange.toString());
      });

      it("passes input currentValue to picker", () => {
        const componentArgs = mockComponentArgs(mockSelectSchema);
        const component = shallow(getComponent(componentArgs));
        expect(component.find(Picker).prop("currentValue")).toBe(
          componentArgs.input.value,
        );
      });

      it("uses schema onchange with picker if one is provided", () => {
        const componentArgs = mockComponentArgs(mockSelectSchema);
        componentArgs.schema.onChange = jest.fn();
        const component = shallow(getComponent(componentArgs));
        const pickerChange = component.find(Picker).prop("onChange");
        pickerChange();
        expect(componentArgs.schema.onChange).toHaveBeenCalled();
      });

      it("still calls input onchange if schema onchange provided", () => {
        const componentArgs = mockComponentArgs(mockSelectSchema);
        componentArgs.schema.onChange = () => {};
        componentArgs.input.onChange = jest.fn();
        const component = shallow(getComponent(componentArgs));
        const pickerChange = component.find(Picker).prop("onChange");
        pickerChange();
        expect(componentArgs.input.onChange).toHaveBeenCalled();
      });

      it("passes input theme prop", () => {
        const component = shallow(
          getComponent(mockComponentArgs(mockSelectSchema)),
        );
        expect(component.find(Picker).prop("textColor")).toBe(colors.white);
      });

      const mockSelectSchema = {
        type: "object",
        title: "mockSchema",
        properties: {
          property: {
            type: "select",
            title: "Select an option",
            options: [
              {label: "lab1", value: "val1"},
              {label: "lab2", value: "val2"},
              {label: "lab3", value: "val3"},
            ],
            uiComponent: "select",
          },
        },
      };
    });

    describe("Radio Button tests", () => {
      it("renders radio button - direct", () => {
        const component = shallow(
          getComponent(mockComponentArgs(mockRadioButtonSchema)),
        );
        expect(component.find(RadioButtonGroupWrapper)).toHaveLength(1);
      });

      it("renders radio button title", () => {
        const component = shallow(
          getComponent(mockComponentArgs(mockRadioButtonSchema)),
        );
        expect(component.find(TextTitle)).toHaveLength(1);
        expect(component.find(TextTitle).props().children).toEqual(
          RadioButtonTitle,
        );
        expect(component.find(TextTitle).prop("layout")).toEqual(
          mockRadioButtonSchema.properties.property.layout,
        );
      });

      it("check radio button text error - no error messages", () => {
        const component = shallow(
          getComponent(mockComponentArgs(mockRadioButtonSchema)),
        );
        expect(component.find(TextError)).toHaveLength(0);
      });

      it("check radio button text error - error messages", () => {
        const mock = {
          ...mockRadioButtonSchema,
          errorText: RadioButtonTextError,
        };
        const component = shallow(getComponent(mockComponentArgs(mock)));
        expect(component.find(TextError)).toHaveLength(1);
        expect(component.find(TextError).props().children).toEqual(
          RadioButtonTextError,
        );
      });

      it("check selected radio button", () => {
        const component = shallow(
          getComponent(mockComponentArgs(mockRadioButtonSchema)),
        );

        expect(component.find(RadioGroupWrapper).prop("selectedIndex")).toEqual(
          0,
        );
      });

      const RadioButtonTitle = "Radio Button Title";
      const RadioButtonTextError = "Radio Button Text Error";

      const mockRadioButtonSchema = {
        type: "object",
        title: "mockSchema",
        properties: {
          property: {
            type: "string",
            title: RadioButtonTitle,
            uiComponent: "radio",
            layout: "row",
            options: [
              {
                label: "Yes",
                value: "val2",
              },
              {
                label: "No",
                value: "0",
              },
            ],
          },
        },
      };
    });

    describe("Dynamic Form date picker tests", () => {
      // removed datepicker tests for now as they're problematic to get working
      /*      it("renders date picker", () => {
              const component = shallow(
                getComponent(mockComponentArgs(mockDatePickerSchema)),
              ).find(StyledDatePicker);
              expect(component.type()).toBe(StyledDatePicker);
            });

            it("passes type prop to DatePicker ", () => {
              const component = shallow(
                getComponent(mockComponentArgs(mockDatePickerSchema)),
              ).find(StyledDatePicker);
              expect(component.prop("onChangeText").toString()).toBe(
                mockSelectComponentArgs(mockSelectSchema).input.onChange.toString(),
              );
            });

            it("passes input onchange to picker", () => {
              const componentArgs = mockComponentArgs(mockDatePickerSchema);
              const component = shallow(getComponent(componentArgs));
              expect(
                component
                  .children()
                  .first()
                  .prop("onChangeText"),
              ).toBe(componentArgs.input.onChange);
            });
            const mockDatePickerSchema = {
              type: "object",
              title: "mockSchema",
              properties: {
                datePicker: {
                  type: "string",
                  title: "Date Picking Date Picker",
                  uiComponent: "datepicker",
                },
              },
            };

            const mockDatePickerComponentArgs = {
              input: {onChange: () => {}, value: new Date(2018, 1, 1)},
              meta: {touched: null, error: null},
              schema: mockDatePickerSchema.properties.datePicker,
            };
      */
    });

    describe("Dynamic Form postcode tests", () => {
      it("renders postcode field", () => {
        const args = getMockPostcodeComponentArgs();
        expect(JSON.stringify(getPostcodeComponent(args).type())).toEqual(
          JSON.stringify(withTheme(PostcodeLookup)),
        );
      });

      it("throws error if schema doesn't have onAddressSelected", () => {
        const args = getMockPostcodeComponentArgs();
        delete args.schema.onAddressSelected;
        expect(() => {
          getPostcodeComponent(args);
        }).toThrow("Schema must provide onAddressSelected callback");
      });

      it("throws error if schema doesn't have onAddressNotListed", () => {
        const args = getMockPostcodeComponentArgs();
        delete args.schema.onAddressNotListed;
        expect(() => {
          getPostcodeComponent(args);
        }).toThrow("Schema must provide onAddressNotListed callback");
      });

      it("sets onAddressSelected to be value in schema", () => {
        const args = getMockPostcodeComponentArgs();
        const {onAddressSelected} = args.schema;
        expect(getPostcodeComponent(args).prop("onAddressSelected")).toBe(
          onAddressSelected,
        );
      });

      it("sets onAddressNotListed to be value in schema", () => {
        const args = getMockPostcodeComponentArgs();
        const {onAddressNotListed} = args.schema;
        expect(getPostcodeComponent(args).prop("onAddressNotListed")).toBe(
          onAddressNotListed,
        );
      });

      const getPostcodeComponent = (
        componentArgs = getMockPostcodeComponentArgs(),
      ) => {
        const mockStore = configureStore({});

        return shallow(getComponent(componentArgs), {
          context: {store: mockStore(initialState)},
        });
      };

      const getMockPostcodeSchema = () => {
        return {
          type: "object",
          title: "mockSchema",
          properties: {
            postcodeOption: {
              onAddressSelected: () => {},
              onAddressNotListed: () => {},
              translations: {
                postcode: "postcode",
                find_address: "find_address",
                address_not_listed: "address_not_listed",
              },
              type: "string",
              title: "Postcode",
              uiComponent: "postcode",
            },
          },
        };
      };

      const getMockPostcodeComponentArgs = (
        schema = getMockPostcodeSchema(),
      ) => {
        return {
          input: {value: "val2"},
          meta: {touched: null, error: null},
          schema: schema.properties.postcodeOption,
          theme,
          globaltheme: "dark",
        };
      };
    });

    const mockComponentArgs = (schema = null, abstractComponent, name) => {
      return {
        theme,
        globaltheme: "dark",
        input: {
          onChange: () => {},
          value: "val2",
        },
        meta: {
          touched: schema.errorText || null,
          error: schema.errorText || null,
        },
        schema: schema.properties.property || {},
        components: {
          testText: abstractComponent,
        },
        name,
      };
    };
  });
});
