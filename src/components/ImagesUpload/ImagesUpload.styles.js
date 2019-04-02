import Icon from "../Icon";
import styled from "styled-components";
import styledNative from "styled-components/native";
import Dropzone from "react-dropzone";
import Button from "../Button";

export const StyledDropzone = styled(Dropzone)`
  border: 0;
  margin: 0;
  margin-top: ${props => (props.accepted ? "0px" : "60px")};
`;

export const FileList = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  list-style-type: none;
`;

export const UploadedFile = styled.div`
  display: flex;
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.veryLightSteel};
  padding: 7px 10px;
  align-items: center;
  margin-top: 41px;
  margin-bottom: 21px;
`;

export const FileName = styledNative.Text`
  margin-left: 10px;
  font-weight: bold;
  font-size: 16px;
  max-width: 240px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({theme}) => theme.colors.canopySteel};
`;

export const StyledIcon = styled(Icon)`
  right: 1px;
  bottom: 1px;
`;

export const Error = styled.p`
  font-size: 16px;
  margin: -10px 0 15px;
  color: ${({theme}) => theme.colors.alertRed};
  line-height: 1.5;
`;

export const ContainerDiv = styled.div`
  display: flex;
`;

export const StyledButton = styled(Button).attrs({
  style: [{marginBottom: 21, marginLeft: 0}],
})``;

export const StyledInput = styled.input``;

export const CenterIconImage = styledNative.Image`
  width: 320px;
  border-radius: 6px;
  height: 209px;
`;

export const ImageRectangle = styledNative.View`
  width: 340px;
  height: 265px;
  border-radius: 6px;
  background-color: #f6f9fc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconContainer = styledNative.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

export const LineBreak = styledNative.View`
  width: 340px;
  height: 0.1px;
  border: solid 1px #e3eaf2;
  margin-top: 8px;
  margin-bottom: 20px;
`;

export const InputBox = styledNative.View`
  width: 22px;
  height: 22px;
`;

export const ColoredHeader = styledNative.Text`
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  color: ${({theme}) => theme.colors.canopyGreen}
  margin-bottom: 20px;
`;

export const SmallText = styledNative.Text`
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  color: ${({theme}) => theme.colors.steel}
  margin-bottom: 20px;
`;

export const UploadContainer = styledNative.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IconImage = styledNative.Image`
  width: 32px;
  height: 32px
`;
export const MainImage = styledNative.Image`
  width: 80px;
  height: 80px
`;
