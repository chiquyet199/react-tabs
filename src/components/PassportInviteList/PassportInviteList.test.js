import React from "react";
import {shallow} from "enzyme";
import {PassportInviteList} from "./";
import {extend} from "underscore";
import EmailContainer from "../EmailContainer";

const pending = [{name: "test", email: "test@email.com", pending: true}];

describe("passport invite list", () => {
  it("snapshot test", async () => {
    const component = await getComponent({passports: pending});

    expect(component).toMatchSnapshot();
  });

  it("onClick calls onClick prop given to passport", () => {
    const passports = [{name: "test", email: "test@email.com"}];
    const onClick = jest.fn();
    const component = getComponent({onClick, passports});

    component.find(EmailContainer).prop("onClick")();
    expect(onClick).toHaveBeenCalled();
  });

  const getMockProps = () => ({
    theme: {},
    onClick: () => {},
    translations: {
      pending: "pending",
    },
    globaltheme: "light",
    passports: [{name: "test", email: "test@email.com"}],
  });

  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<PassportInviteList {...parsedProps} />);
  };
});
