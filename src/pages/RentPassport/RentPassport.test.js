import React from "react";
import {shallow} from "enzyme";
import {RentPassport} from "./RentPassport";
import {TextLink} from "../../components/common/layout";
import RentPassportList from "../../components/RentPassportList";
import Button from "../../components/Button";

const testRentPassportSchema = {
  header: "Rent Passport",
  greeting: "Hello,",
  info:
    "Create a Rent Passport once and you're ready to rent from any Canopy agent or landlord",
  linkText: "What is a Rent Passport?",
  button: {type: "primary", text: "Start my Rent Passport"},
  listItems: "testListItems",
};

const testUser = {
  name: "test",
  openBanking: true,
};

const testProps = {
  user: testUser,
  schema: testRentPassportSchema,
  showModal: jest.fn(),
  go: jest.fn(),
};

describe("<RentPassport />", () => {
  beforeEach(() => jest.resetAllMocks());
  it("calls showModal() prop when link is pressed", () => {
    const wrapper = shallow(<RentPassport {...testProps} />);

    wrapper.find(TextLink).simulate("click");

    expect(testProps.showModal).toHaveBeenCalledWith("whatIsARentPassport");
  });

  it("renders <RentPassportList /> with items from schema", () => {
    const wrapper = shallow(<RentPassport {...testProps} />);

    expect(wrapper.find(RentPassportList).props()).toEqual({
      items: testRentPassportSchema.listItems,
    });
  });

  it("directs the user to thier profile if they have open banking", () => {
    // tbc how this is checked. currently placeholder
    const wrapper = shallow(<RentPassport {...testProps} />);

    wrapper.find(Button).simulate("click");
    expect(testProps.go).toHaveBeenCalledWith("/your-profile");
  });
  it("directs the user to start thier passport if they do not have open banking", () => {
    // tbc how this is checked. currently placeholder
    const wrapper = shallow(
      <RentPassport {...testProps} user={{name: "test", openBanking: false}} />,
    );

    wrapper.find(Button).simulate("click");
    expect(testProps.go).toHaveBeenCalledWith("/start-rent-passport");
  });
});
