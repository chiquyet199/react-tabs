import React from "react";
import {shallow} from "enzyme";
import {SubTitle} from "../../components/common/layout";
import Button from "../../components/Button";
import {VerifyEmailSuccess} from "./index";

const testProps = {
  translations: {
    email_successfully__verified: "email_successfully__verified",
    thanks__for__verifying: "thanks__for__verifying",
    go__to: "go__to__rent__passport",
  },
  go: jest.fn(),
  user: {email: "testEmail"},
  redirectTo: "/branch-info",
};

describe("VerifyEmail", () => {
  it("it displays the user's email", () => {
    const wrapper = shallow(<VerifyEmailSuccess {...testProps} />);
    expect(wrapper.find(SubTitle).props().children).toEqual(
      testProps.user.email,
    );
  });

  it("calls _go on button click", () => {
    const wrapper = shallow(<VerifyEmailSuccess {...testProps} />);
    wrapper.find(Button).simulate("click");
    expect(testProps.go).toHaveBeenCalledWith("/branch-info");
  });
});
