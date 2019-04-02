import Button from "../../components/Button/index";
import {ButtonBar} from "../../components/common/layout";
import React from "react";
import styled from "styled-components/native";
import {string, func} from "prop-types";

export const ImagePreview = ({image, btnText = "remove file", onRemove}) => (
  <ImgContainer>
    <PreviewImage source={image} resize="contain" />
    <ButtonBar>
      <Button
        type="secondary"
        middle={btnText}
        onClick={onRemove}
        className="removeFile"
      />
    </ButtonBar>
  </ImgContainer>
);

ImagePreview.propTypes = {
  btnText: string,
  image: string.isRequired,
  onRemove: func.isRequired,
};

const ImgContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const PreviewImage = styled.Image`
  width: 350px;
  height: 350px;
`;

export default ImagePreview;
