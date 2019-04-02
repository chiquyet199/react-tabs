import styled from "styled-components/native";
import {HeadlineText} from "../common/layout";
import {colors} from "../../constants/theme";

export const BankPicture = styled.Image`
  margin-top: 136;
  height: 190px;
  width: 375px;
`;

export const HeadlineTextError = styled(HeadlineText)`
  color: ${colors.alertRed};
`;
