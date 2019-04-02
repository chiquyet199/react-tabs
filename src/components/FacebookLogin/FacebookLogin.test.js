import React from "react";
import {createStore} from "redux";
import {shallow} from "enzyme";
import FacebookLogin from "../FacebookLogin/index.js";
import Button from "../Button/index";

const initialState = () => {
  const mockStore = {};

  return mockStore;
};

const store = createStore(initialState);

describe("Facebook login", () => {
  describe("FacebookLogin", () => {
    const tree = shallow(<FacebookLogin store={store} />).dive();

    it("renders a button component", () => {
      expect(tree.find(Button)).toHaveLength(1);
    });
  });
});
