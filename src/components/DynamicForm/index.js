import React from "react";
import {connect} from "react-redux";
import {TextInput} from "react-native";
import {reduxForm, Field} from "redux-form";
import {
  FormContainer,
  StyledTextParagraph,
  SwitchText,
  StyledPageTitle,
  StyledInputWrapper,
  StyledSwitch,
  SwitchContainer,
  StyledInputContainer,
  InputHeading,
  StyledHeading,
  StyledDatePicker,
  StyledFieldWrapper,
  StyledPickerContainer,
  ContentDivider,
  Tooltip,
} from "./DynamicForm";
import Picker from "../Picker";
import ImagesUpload from "../ImagesUpload";
import PostcodeLookup from "../PostcodeLookup";
import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";
import InputField from "../InputField/inputField";
import OptionPicker from "../OptionPicker/";
import {themed} from "../../utils/common";

// getComponent checks the schema to see if any property has a specific UI component to be rendered against it.
// For example: countryCode in the Schema has a UI component of Country-Picker, when any new schemas are added with
// new UI components to be rendered against their schema properties, a case must be added below for it's specific
// property. For functionality purposes, we've added the same component below to show the difference.
export const getComponent = ({
  initialValue,
  disabled,
  input,
  meta: {touched, error},
  schema,
  name,
  components,
  style,
  globaltheme = "light",
  theme,
  heading,
  submit,
  submitOnEnter,
  ...props
}) => {
  if (components && components[name]) {
    return components[name];
  }

  const handleKeyPress = e => {
    if (submitOnEnter && typeof submit === "function" && e.key === "Enter") {
      submit();
    }
  };

  const hasError = touched && error !== undefined;
  const {dividerColor} = theme[globaltheme];
  const {baseColor, accentColor} = theme[globaltheme].form;
  switch (schema.uiComponent) {
    case "hidden":
      return <TextInput hide="true" />;
    case "divider":
      return (
        <ContentDivider
          margin={schema.margin}
          length={schema.length}
          color={dividerColor}
        />
      );
    case "text":
      return (
        <StyledTextParagraph
          theme={theme}
          globaltheme={globaltheme}
          left={schema.align}
          bold={schema.bold}
          fontStyle={schema.fontstyle}
        >
          {schema.title}
        </StyledTextParagraph>
      );
    case "textHeader":
      return (
        <StyledPageTitle
          theme={theme}
          globaltheme={globaltheme}
          left={schema.align}
          bold={schema.bold}
          fontStyle={schema.fontstyle}
        >
          {schema.title}
        </StyledPageTitle>
      );
    case "switch":
      return (
        <SwitchContainer layout={schema.layout}>
          <SwitchText
            theme={theme}
            globaltheme={globaltheme}
            left={schema.align}
            bold={schema.bold}
            fontStyle={schema.fontstyle}
          >
            {schema.title}
          </SwitchText>
          <StyledSwitch
            disabled={disabled}
            name={input.name}
            on={!!input.value}
            onChange={input.onChange}
            onChangeCallback={schema.onChangeCallback}
          />
        </SwitchContainer>
      );
    case "password":
      return (
        <StyledInputWrapper>
          {heading && <StyledHeading>{heading}</StyledHeading>}
          <InputField
            theme={theme}
            globaltheme={globaltheme}
            tintColor={accentColor}
            textColor={baseColor}
            onChangeText={input.onChange}
            errorText={hasError && error}
            value={input.value}
            disabled={schema.disabled || false}
            autoFocus={schema.autoFocus}
            onKeyPress={handleKeyPress}
            {...props}
            password
          />
        </StyledInputWrapper>
      );
    case "imageUpload":
      return (
        <ImagesUpload
          btnText={schema.buttonText}
          btnType={schema.buttonType}
          translations={schema.translations}
        />
      );
    case "select":
      return (
        <StyledPickerContainer>
          {heading && <StyledHeading>{heading}</StyledHeading>}
          <Picker
            globaltheme={globaltheme}
            options={schema.options}
            onChange={
              schema.onChange
                ? args => {
                    schema.onChange(args);
                    input.onChange(args);
                  }
                : input.onChange
            }
            textColor={baseColor}
            borderColor={baseColor}
            currentValue={input.value}
            errorText={hasError && error}
          />
          {schema.tooltip && <Tooltip>{schema.tooltip}</Tooltip>}
        </StyledPickerContainer>
      );
    case "radio":
      return (
        <RadioButtonGroup
          layout={schema.layout}
          title={schema.title}
          options={schema.options}
          onSelect={(event, value) => input.onChange(value)}
          currentValue={input.value}
          errorText={hasError && error}
        />
      );

    case "optionPicker":
      return (
        <StyledInputContainer>
          {heading && <InputHeading>{heading}</InputHeading>}
          <OptionPicker
            globaltheme={globaltheme}
            initialValue={initialValue}
            onChange={
              schema.onChange
                ? args => {
                    schema.onChange(args);
                    input.onChange(args);
                  }
                : input.onChange
            }
            textColor={baseColor}
            borderColor={baseColor}
            type={schema.type_data}
            options={schema.options}
          />
        </StyledInputContainer>
      );

    case "datePicker":
      return (
        <StyledInputContainer>
          {heading && <InputHeading>{heading}</InputHeading>}
          <StyledDatePicker
            {...props}
            inputProps={input}
            textColor={baseColor}
            onChangeText={input.onChange}
            errorText={hasError && error}
            value={input.value}
            borderColor={baseColor}
            onChange={input.onChange}
            date={input.value}
            earliestYear={schema.earliestYear}
          />
        </StyledInputContainer>
      );
    case "postcode":
      if (!schema.onAddressSelected) {
        throw new Error("Schema must provide onAddressSelected callback");
      }
      if (!schema.onAddressNotListed) {
        throw new Error("Schema must provide onAddressNotListed callback");
      }

      return (
        <PostcodeLookup
          onAddressSelected={schema.onAddressSelected}
          onAddressNotListed={schema.onAddressNotListed}
          onChange={input.onChange}
        />
      );
    default:
      return (
        <StyledInputWrapper>
          {heading && <StyledHeading>{heading}</StyledHeading>}
          <InputField
            {...props}
            tintColor={accentColor}
            textColor={baseColor}
            onChangeText={input.onChange}
            errorText={hasError && error}
            defaultValue={input.value}
            keyboardType={schema.keyboardType}
            multiline={schema.multiline}
            heading={schema.heading}
            prefix={schema.prefix}
            disabled={schema.disabled || false}
            theme={theme}
            autoFocus={schema.autoFocus}
            onKeyPress={handleKeyPress}
            autoCapitalize={
              schema.keyboardType === "email-address" ? "none" : "sentences"
            }
          />
        </StyledInputWrapper>
      );
  }
};

export const GenerateFields = formProps => {
  const {
    initialValues = {},
    schema,
    globaltheme,
    theme,
    components,
    submit,
    submitOnEnter,
  } = formProps;

  return Object.entries(schema.properties).map(([key, object]) => {
    const props = {
      name: key,
      globaltheme,
      theme,
      heading: object.heading,
      component: getComponent,
      initialValue: initialValues[key],
      disabled: object.disabled,
      props: {
        schema: object,
        name: key,
        components,
        submit,
        submitOnEnter,
      },
      label: object.title,
    };

    return (
      <StyledFieldWrapper width={object.width} key={key}>
        <Field {...props} />
      </StyledFieldWrapper>
    );
  });
};

export const DynamicForm = props => (
  <FormContainer>
    <GenerateFields {...props} />
  </FormContainer>
);

const connectedForm = reduxForm({
  form: "DynamicForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
})(DynamicForm);

const mapStateToProps = (state, props) => ({
  initialValues: props.initialValues,
});

const StateForm = connect(
  mapStateToProps,
  {},
)(themed(connectedForm));

export default StateForm;
