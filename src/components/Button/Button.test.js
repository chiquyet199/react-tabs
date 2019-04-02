import React from "react";
/* import { Platform, Text, TouchableOpacity } from 'react-native'; */
import {shallow} from "enzyme";
/* import { ThemeProvider } from 'styled-components'; */
/* import theme from '../../constants/theme'; */
// Note: test renderer must be required after react-native.
/* import renderer from 'react-test-renderer'; */
import {IconButton, Button} from "./index";
import {BtnText, ButtonContainer, IconContainer, StyledIcon} from "./Button";
import Icon from "../Icon";
import themes, {colors} from "../../constants/theme";

const theme = themes.selva;
const text = "test button";

describe("Buttons", () => {
  describe("<Button>", () => {
    describe("Button Text", () => {
      const mockFunc = jest.fn();
      const wrapper = shallow(
        <Button
          type="primary"
          middle={text}
          onClick={mockFunc}
          theme={theme}
        />,
      );

      it("renders text component", () => {
        expect(wrapper.find(BtnText)).toHaveLength(1);
      });
      it("passes middle to BtnText as child", () => {
        expect(wrapper.find(BtnText).props().children).toEqual(text);
      });
    });

    describe("Button Icons", () => {
      const mockFunc = jest.fn();
      it("renders without left/right", () => {
        const wrapper = shallow(
          <Button
            type="primary"
            middle={text}
            onClick={mockFunc}
            theme={theme}
          />,
        );
        expect(wrapper.find(Icon)).toHaveLength(0);
      });
      describe("Left", () => {
        const wrapper = shallow(
          <Button
            type="primary"
            left="arrow-left"
            middle={text}
            onClick={mockFunc}
            theme={theme}
          />,
        );
        it("renders with left", () => {
          expect(wrapper.find(StyledIcon)).toHaveLength(1);
        });
        it("passes correct props to left icon", () => {
          expect(wrapper.find(StyledIcon).props()).toEqual({
            color: colors.white,
            name: "arrow-left",
            size: 32,
            type: "primary",
          });
        });
      });

      describe("Right", () => {
        const wrapper = shallow(
          <Button
            type="primary"
            right="arrow-right"
            middle={text}
            onClick={mockFunc}
            theme={theme}
          />,
        );

        it("renders with right", () => {
          expect(wrapper.find(StyledIcon)).toHaveLength(1);
        });
        it("passes correct props to right icon", () => {
          expect(wrapper.find(StyledIcon).props()).toEqual({
            color: colors.white,
            name: "arrow-right",
            size: 32,
            type: "primary",
          });
        });
      });
    });

    it("renders with left AND right", () => {
      const mockFunc = jest.fn();
      const wrapper = shallow(
        <Button
          left="facebook"
          middle={text}
          right="arrow-right"
          onClick={mockFunc}
          type="primary"
          theme={theme}
        />,
      );

      expect(wrapper.find(StyledIcon)).toHaveLength(2);
    });

    describe("functionality", () => {
      it("trigger onClick callback", () => {
        const mockFunc = jest.fn();
        const tree = shallow(
          <Button
            type="primary"
            text={text}
            onClick={mockFunc}
            middle={text}
            theme={theme}
          />,
        );
        const btn = tree.find(ButtonContainer);
        btn.simulate("press");
        expect(mockFunc).toHaveBeenCalled();
      });
    });
  });

  describe("<IconButton>", () => {
    describe("icon", () => {
      const wrapper = shallow(
        <IconButton
          type="primary"
          name="facebook"
          onClick={() => {}}
          theme={theme}
        />,
      );
      it("renders an icon component", () => {
        expect(wrapper.find(Icon)).toHaveLength(1);
      });

      it("passes correct props to component", () => {
        expect(wrapper.find(Icon).props()).toEqual({
          allowFontScaling: false,
          bias: undefined,
          color: colors.white,
          name: "facebook",
          size: 12,
          type: "primary",
        });
      });
    });
    describe("functionality", () => {
      it("trigger onClick callback", () => {
        const mockFunc = jest.fn();
        const tree = shallow(
          <IconButton
            onClick={mockFunc}
            type="primary"
            name="facebook"
            theme={theme}
          />,
        );
        const btn = tree.find(IconContainer);
        btn.simulate("press");
        expect(mockFunc).toHaveBeenCalled();
      });
    });
  });
  /* describe('SnapShots', () => {
     *     describe('Type: Primary', () => {
     *         it('renders properly with only Text - ' + Platform.OS, () => {
     *             const mockFunc = jest.fn();
     *             const tree = renderer.create(
     *                 <ThemeProvider theme={theme}>
     *                     <Button type="primary" middle={text} onClick={mockFunc} />
     *                 </ThemeProvider>
     *             );
     *             expect(tree.toJSON()).toMatchSnapshot();
     *         });

     *         it('renders properly with Icons and Text - ' + Platform.OS, () => {
     *             const mockFunc = jest.fn();
     *             const tree = renderer.create(
     *                 <ThemeProvider theme={theme}>
     *                     <Button type="primary" left="facebook" middle={text} right="arrow-right" onClick={mockFunc} />
     *                 </ThemeProvider>
     *             );
     *             expect(tree.toJSON()).toMatchSnapshot();
     *         });
     *     })

     *     describe('Type: Secondary', () => {
     *         it('renders properly with only Text - ' + Platform.OS, () => {
     *             const mockFunc = jest.fn();
     *             const tree = renderer.create(
     *                 <ThemeProvider theme={theme}>
     *                     <Button type="secondary" middle={text} onClick={mockFunc} />
     *                 </ThemeProvider>
     *             );
     *             expect(tree.toJSON()).toMatchSnapshot();
     *         });

     *         it('renders properly with Icons and Text - ' + Platform.OS, () => {
     *             const mockFunc = jest.fn();
     *             const tree = renderer.create(
     *                 <ThemeProvider theme={theme}>
     *                     <Button type="secondary" left="facebook" middle={text} right="arrow-right" onClick={mockFunc} />
     *                 </ThemeProvider>
     *             );
     *             expect(tree.toJSON()).toMatchSnapshot();
     *         });
     *     })

     *     describe('Type: Tertiary', () => {
     *         it('renders properly with only Text - ' + Platform.OS, () => {
     *             const mockFunc = jest.fn();
     *             const tree = renderer.create(
     *                 <ThemeProvider theme={theme}>
     *                     <Button type="tertiary" middle={text} onClick={mockFunc} />
     *                 </ThemeProvider>
     *             );
     *             expect(tree.toJSON()).toMatchSnapshot();
     *         });

     *         it('renders properly with Icons and Text - ' + Platform.OS, () => {
     *             const mockFunc = jest.fn();
     *             const tree = renderer.create(
     *                 <ThemeProvider theme={theme}>
     *                     <Button type="tertiary" left="facebook" middle={text} right="arrow-right" onClick={mockFunc} />
     *                 </ThemeProvider>
     *             );
     *             expect(tree.toJSON()).toMatchSnapshot();
     *         });
     *     })

     *     describe('Type: Facebook', () => {
     *         it('renders properly with only Text - ' + Platform.OS, () => {
     *             const mockFunc = jest.fn();
     *             const tree = renderer.create(
     *                 <ThemeProvider theme={theme}>
     *                     <Button type="facebook" middle={text} onClick={mockFunc} />
     *                 </ThemeProvider>
     *             );
     *             expect(tree.toJSON()).toMatchSnapshot();
     *         });

     *         it('renders properly with Icons and Text - ' + Platform.OS, () => {
     *             const mockFunc = jest.fn();
     *             const tree = renderer.create(
     *                 <ThemeProvider theme={theme}>
     *                     <Button type="facebook" left="facebook" middle={text} right="arrow-right" onClick={mockFunc} />
     *                 </ThemeProvider>
     *             );
     *             expect(tree.toJSON()).toMatchSnapshot();
     *         });
     *     })
     *
     * }) */
});
