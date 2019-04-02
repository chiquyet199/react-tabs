import React from "react";
import {shallow} from "enzyme";
import {
  TextWrapper,
  TextTitle,
  RadioGroupWrapper,
  RadioButtonGroupWrapper,
  SubTitle,
} from "./RadioButtonGroup.style";
import RadioButtonGroup from "./RadioButtonGroup";
import RadioButton from "./RadioButton";

const onSelect = jest.fn();
const options = [
  {
    label: "Yes",
    value: "1",
  },
  {
    label: "No",
    value: "0",
    subTitle: "subTitle",
  },
];
const mockProps = {
  layout: "row",
  title: "Title",
  currentValue: "0",
};

describe("<RadioButtonGroup />", () => {
  const wrapper = shallow(
    <RadioButtonGroup onSelect={onSelect} options={options} {...mockProps} />,
  );
  it("<RadioButtonGroup /> exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("<RadioButtonGroupWrapper />", () => {
    const tree = shallow(
      <RadioButtonGroup onSelect={onSelect} options={options} {...mockProps} />,
    );
    it("renders properly RadioButtonGroupWrapper", () => {
      expect(tree.find(RadioButtonGroupWrapper)).toHaveLength(1);
    });
  });

  describe("<TextWrapper />", () => {
    const tree = shallow(
      <RadioButtonGroup onSelect={onSelect} options={options} {...mockProps} />,
    );

    it("renders properly TextWrapper", () => {
      expect(tree.find(TextWrapper)).toHaveLength(options.length);
    });

    it("has passed proper text props for options", () => {
      const texts = tree.find(TextWrapper);

      texts.forEach(item => {
        const properString = options.find(
          option => option.label === item.props().children,
        );
        if (properString && properString.length) {
          expect(item.props().children).toEqual(properString);
        }
      });
    });
  });

  describe("<TextTitle />", () => {
    const tree = shallow(
      <RadioButtonGroup onSelect={onSelect} options={options} {...mockProps} />,
    );

    it("renders properly TextTitle", () => {
      expect(tree.find(TextTitle)).toHaveLength(1);
    });

    it("has passed proper text props", () => {
      expect(tree.find(TextTitle).props().children).toEqual(mockProps.title);
    });
  });

  describe("<RadioGroupWrapper />", () => {
    const tree = shallow(
      <RadioButtonGroup onSelect={onSelect} options={options} {...mockProps} />,
    );

    it("renders properly RadioGroupWrapper", () => {
      expect(tree.find(RadioGroupWrapper)).toHaveLength(1);
    });

    it("has passed proper of <RadioButton /> component length", () => {
      expect(tree.find(RadioGroupWrapper).props().children).toHaveLength(
        options.length,
      );
    });
  });

  describe("<RadioButton />", () => {
    const tree = shallow(
      <RadioButtonGroup onSelect={onSelect} options={options} {...mockProps} />,
    );

    it("renders properly RadioButton", () => {
      expect(tree.find(RadioButton)).toHaveLength(options.length);
    });
  });

  describe("<SubTitle />", () => {
    const tree = shallow(
      <RadioButtonGroup onSelect={onSelect} options={options} {...mockProps} />,
    );

    it("renders properly SubTitle", () => {
      expect(tree.find(SubTitle)).toHaveLength(1);
    });
  });
});
