import styled from "styled-components/native/index";
import {PageTitle, SubTitle, ViewParagraph} from "../common/layout";

export const ModalContainer = styled.Modal`
  background-color: ${({theme}) => theme.colors.white};
  position: absolute;
  margin: 0;
  padding: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-color: ${({theme}) => theme.colors.none};
  z-index: 999;
`;

export const IconView = styled.TouchableOpacity`
  align-self: flex-start;
`;

export const ModalTitle = styled(PageTitle)`
  padding: 0 15px;
  margin-bottom: 15px;
  margin-top: 17px;
`;

export const ModalSubTitle = styled(SubTitle)`
  padding: 0 15px;
  margin-bottom: 17px;
`;

export const ModalTextParagraph = styled(ViewParagraph)`
  flex-basis: ${props => props.small} 100%;
  padding: 0 15px;
  margin-bottom: 17px;
`;
