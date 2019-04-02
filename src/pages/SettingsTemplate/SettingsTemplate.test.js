import React from "react";
import {shallow} from "enzyme";
import {extend} from "underscore";
import SettingsTemplate from "./index.js";
import FormPage from "../../components/FormPage";

describe("About You Agency Settings - page tests", () => {
  it("matches snapshot", () => {
    expect(
      getComponent({
        schema: getMockSchema(),
      }),
    ).toMatchSnapshot();
  });

  it("renders without initial values", () => {
    expect(
      getComponent({
        schema: getMockSchema(),
        initialValues: null,
      }),
    ).toMatchSnapshot();
  });

  it("Submits Form with initial values", () => {
    const onSubmit = jest.fn();
    const props = getMockProps();
    const comp = getComponent({
      schema: getMockSchema(),
      onSubmit,
    });
    comp.find(FormPage).prop("onSubmit")(props.initialValues);
    comp.update();
    expect(onSubmit).toHaveBeenCalledWith(props.initialValues);
  });

  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<SettingsTemplate {...parsedProps} />);
  };

  const getMockProps = () => ({
    initialValues: {name: "Test name"},
    match: {url: "test"},
    updateAgency: () => {},
    onSubmit: () => {},
  });

  const getMockSchema = () => ({
    type: "object",
    layout: "hq",
    header: "Test About header",
    info: "Test About info",
    buttonText: "Save",
    buttonIcon: null,
    buttonStyles: [{width: "165px", alignSelf: "flex-end"}],
    properties: {
      name: {
        type: "string",
        title: "Test name",
      },
    },
  });
});
