import styled from "styled-components/native";
import {responsive, isWeb} from "../../utils/common";
import {TextParagraph, PageTitle, ButtonBar} from "../common/layout";

export const DialogOverlay = styled.View`
  align-items: center;
  justify-content: center;
  position: ${isWeb ? "fixed" : "absolute"};
  height: 100%;
  top: ${isWeb ? 0 : "auto"};
  right: 0;
  left: 0;
  bottom: 0;
  padding: 16px;
  background-color: ${({theme}) => theme.colors.darkTransparent};
  z-index: 9999;
  opacity: 1;
  ${isWeb &&
    `overflow-x: hidden;
     overflow-y: auto;
  `};
`;

export const DialogContainer = styled.View`
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 6px;
  min-height: 100px;
  align-items: center;
  padding: 30px 25px 20px;
`;

export const DialogButtonBar = responsive(styled(ButtonBar)`
  margin: 0;
  width: 100%;
`)({
  S: `
  flex-direction: column;
  `,
});

export const DialogParagraph = styled(TextParagraph)`
  width: 100%;
  max-width: ${({fullWidthText}) => (fullWidthText ? "100%" : "80%")}
  font-size: 18px;
  padding: 0 0 15px;
  color: ${({theme}) => theme.colors.canopySteel};
`;

export const DialogTitle = styled(PageTitle)`
  text-align: center;
  width: 100%;
  padding: 0 0 20px;
  color: ${({theme}) => theme.colors.canopySteel};
`;
