import React from "react";
import {isWeb} from "../../utils/common";
import Truncate from "react-truncate";
import {shallow} from "enzyme";
import {extend} from "underscore";
import {ReadMore} from "./ReadMore";
import {ReadMoreWeb, Link} from "./ReadMore.web";

describe("Read More - page tests", () => {
  it("matches snapshot", () => {
    const expectedType = isWeb ? getWebComponent() : getComponent();
    expect(expectedType).toMatchSnapshot();
  });

  it("check if more/less is shown for Web and Native", () => {
    const {less, more} = getMockProps();
    const comp = isWeb ? getWebComponent() : getComponent();
    if (isWeb) {
      const ellipsis = comp.find(Truncate).prop("ellipsis");
      const lessLink = shallow(ellipsis).find(Link);
      expect(lessLink.prop("children")).toBe(more);
      lessLink.simulate("click");
      comp.update();
      expect(comp.find(Link).prop("children")).toBe(less);
    } else {
      const revealedFooter = shallow(comp.prop("renderRevealedFooter")());
      expect(revealedFooter.prop("children").toString()).toEqual(
        String(<Link>{less}</Link>),
      );
      const truncatedFooter = shallow(comp.prop("renderTruncatedFooter")());
      expect(truncatedFooter.prop("children")[1].toString()).toEqual(
        String(<Link>{more}</Link>),
      );
    }
  });

  const getComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<ReadMore {...parsedProps} />);
  };

  const getWebComponent = props => {
    const parsedProps = extend(getMockProps(), props);

    return shallow(<ReadMoreWeb {...parsedProps} />);
  };

  const getMockProps = () => ({
    less: "LESS",
    more: "MORE",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda beatae consequatur culpa cumque delectus distinctio est, fugiat illum laborum molestiae nisi obcaecati optio provident quasi, suscipit totam ullam ut voluptas?",
    lines: 3,
    theme: {
      light: {
        baseColor: "#6b7c93",
      },
      colors: {
        white: "#ffffff",
        canopySteel: "#6b7c93",
        canopyGreen: "#5ab88e",
      },
    },
    globaltheme: "light",
  });
});
