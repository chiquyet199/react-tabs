import styled from "styled-components/native";
import {responsive} from "../../utils/common";

export const CoverImage = responsive(styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`)({
  S: `
    flex: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    justifyContent: center;
   `,
});
