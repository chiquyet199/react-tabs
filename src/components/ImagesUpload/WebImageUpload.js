import React, {Component} from "react";
import {Field} from "redux-form";
import colors from "../../constants/theme";
import {
  UploadContainer,
  FileList,
  ContainerDiv,
  UploadedFile,
  FileName,
  StyledIcon,
  StyledDropzone,
  StyledInput,
  CenterIconImage,
  ImageRectangle,
  IconContainer,
  LineBreak,
  InputBox,
  ColoredHeader,
  SmallText,
  IconImage,
  MainImage,
} from "./ImagesUpload.styles";
import {Text} from "react-native";
import imageFile from "../../assets/image_file/image-file@3x.png";
import cloudUpload from "../../assets/upload_image/upload@3x.png";
import {array, func, shape, string} from "prop-types";

export class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null,
    };
  }

  removeUploadedFile = key => {
    const {accepted, removeImage} = this.props;
    accepted.splice(key, 1);
    removeImage(accepted);
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };

  onDrop = (filesToUpload, onChange) => {
    const {accepted, uploadImage} = this.props;
    const uploadedFiles = accepted.concat(filesToUpload);
    uploadImage(uploadedFiles);
    onChange(uploadedFiles);
  };

  renderDropzone = field => {
    const {translations, accepted} = this.props;
    const {onChange} = field.input;

    return (
      <StyledDropzone
        accepted={accepted.length}
        accept="image/jpeg, image/png"
        name={field.name}
        onDrop={filesToUpload => this.onDrop(filesToUpload, onChange)}
      >
        <UploadContainer>
          <MainImage source={cloudUpload} />
          <ColoredHeader>{translations.chooseFile}</ColoredHeader>
          <SmallText>{translations.fileRule}</SmallText>
        </UploadContainer>
      </StyledDropzone>
    );
  };

  render() {
    const {translations, accepted, radioChange} = this.props;

    return (
      <section>
        <Field name="fileUploader" component={this.renderDropzone} />
        <FileList>
          {accepted.map((f, key) => (
            <ContainerDiv key={f.preview}>
              <ImageRectangle>
                <UploadedFile>
                  <CenterIconImage source={{uri: f.preview}} />
                  <IconContainer>
                    <IconImage source={imageFile} />
                    <FileName>{f.name}</FileName>
                    <StyledIcon
                      id="remove-image"
                      name="close"
                      size={32}
                      color={colors.canopySteel}
                      onPress={() => {
                        this.removeUploadedFile(key);
                      }}
                    />
                  </IconContainer>
                </UploadedFile>
              </ImageRectangle>
              <IconContainer>
                <Text>{translations.defaultImage}</Text>
                <InputBox>
                  <StyledInput
                    id="radio-button"
                    type="radio"
                    value={f.name}
                    checked={this.state.selectedOption === f.name}
                    onChange={radioChange || this.handleOptionChange}
                  />
                </InputBox>
              </IconContainer>
              <LineBreak />
            </ContainerDiv>
          ))}
        </FileList>
      </section>
    );
  }
}

FileUpload.propTypes = {
  accepted: array.isRequired,
  radioChange: func,
  removeImage: func.isRequired,
  translations: shape({
    chooseFile: string.isRequired,
    fileRule: string.isRequired,
    defaultImage: string.isRequired,
  }),
  uploadImage: func.isRequired,
};

export default FileUpload;
