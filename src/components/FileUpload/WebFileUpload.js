import React, {Component} from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import {reduxForm, Field} from "redux-form";
import {func, object, string} from "prop-types";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import {colors} from "../../constants/theme";

export const StyledDropzone = styled(Dropzone)`
  border: 0;
  margin: 0;
  margin-top: ${props => (props.accepted ? "0px" : "60px")};
`;

export const StyledSection = styled.div`
  width: 100%;
  margin: 0 5px;
`;

const FileList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

export const UploadedFile = styled.li`
  display: flex;
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.veryLightSteel};
  padding: 7px 10px;
  align-items: center;
  margin-top: 41px;
  margin-bottom: 21px;
`;

const FileName = styled.span`
  margin-left: 10px;
  font-weight: bold;
  font-size: 16px;
  color: ${({theme}) => theme.colors.canopySteel};
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const StyledIcon = styled(Icon)`
  margin-left: auto;
  color: ${({theme, globaltheme}) => theme[globaltheme].baseColor};
`;

const Error = styled.p`
  font-size: 16px;
  margin: -10px 0 15px;
  color: ${({theme}) => theme.colors.alertRed};
  line-height: 1.5;
`;

export const StyledButton = styled(Button).attrs({
  style: [{marginBottom: 21, marginLeft: 0, marginRight: 0, zIndex: -1}],
})``;

export class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      accepted: [],
    };
  }

  removeUploadedFile = () => {
    this.props.reset();
    this.setState({
      accepted: [],
    });
  };

  onDrop = (filesToUpload, onChange) => {
    this.setState({accepted: filesToUpload});
    onChange(filesToUpload);
  };

  renderDropzone = field => {
    const {btnText, btnType} = this.props;
    const {accepted} = this.state;
    const {onChange} = field.input;

    return (
      <StyledDropzone
        accepted={accepted.length}
        accept="image/jpeg, image/png, text/csv"
        name={field.name}
        onDrop={filesToUpload => this.onDrop(filesToUpload, onChange)}
      >
        <StyledButton type={btnType} middle={btnText} />
        {field.meta.touched &&
          field.meta.error && <Error>{field.meta.error}</Error>}
      </StyledDropzone>
    );
  };

  render() {
    const {onSubmit, fieldName = "fileUpload", theme, globaltheme} = this.props;
    const {accepted} = this.state;

    return (
      <StyledSection>
        <aside>
          <FileList>
            {accepted.map(f => (
              <UploadedFile key={f.name}>
                <Icon name="legal" size={32} color={colors.canopySteel} />
                <FileName>{f.name}</FileName>
                <StyledIcon
                  name="close"
                  size={32}
                  theme={theme}
                  globaltheme={globaltheme}
                  onPress={this.removeUploadedFile}
                />
              </UploadedFile>
            ))}
          </FileList>
        </aside>

        <form onSubmit={onSubmit}>
          <Field name={fieldName} component={this.renderDropzone} />
        </form>
      </StyledSection>
    );
  }
}

FileUpload.propTypes = {
  globaltheme: string.isRequired,
  theme: object.isRequired,
  fieldName: string,
  btnText: string,
  btnType: string,
  onSubmit: func.isRequired,
};

export default reduxForm({
  form: "DynamicForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
})(FileUpload);
