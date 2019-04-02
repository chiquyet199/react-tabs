import React, {Component} from "react";
import styled from "styled-components/native";
import {
  Middle,
  Right,
  BtnText,
  ButtonIcon,
} from "../../components/Button/Button";
import Dropzone from "react-dropzone";
import {ButtonBar} from "../../components/common/layout";

export default class WebUpload extends Component {
  static defaultProps = {
    placeholder: "filename.jpg",
  };

  constructor(props) {
    super(props);
    this._onDrop = this._onDrop.bind(this);
  }

  _onDrop([acceptedFiles]) {
    const {getFile} = this.props;
    getFile(acceptedFiles);
  }

  render() {
    const {
      name,
      maxSize,
      minSize,
      accept,
      onChange,
      btnText,
      btnType,
      btnIcon,
      file,
    } = this.props;

    const DROPZONE_PROPS = {
      file,
      name,
      value: null,
      multiple: false,
      onChange,
      onDrop: this._onDrop,
      className: "dropzone",
      // Size in bytes
      maxSize,
      minSize,
      accept: accept && accept.join(),
    };

    return (
      <div className="dropZone">
        <Dropzone {...DROPZONE_PROPS}>
          <ButtonBar>
            <BtnContainer type={btnType}>
              <Middle>
                <BtnText type={btnType}>{btnText}</BtnText>
              </Middle>
              <Right>
                <ButtonIcon type={btnType} name={btnIcon} />
              </Right>
            </BtnContainer>
          </ButtonBar>
        </Dropzone>
      </div>
    );
  }
}

export const BtnContainer = styled.View`
  flex: 1;
  flex-direction: row;
  border-width: 1px;
  margin: 5px;
  height: 48px;
  border-radius: 10px;
  border-color: ${({type, theme: {buttons}}) => buttons[type].border};
  background-color: ${({type, theme: {buttons}}) => buttons[type].background};
`;
