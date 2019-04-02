import ImagesUpload from "./ImagesUpload";
import {uploadImage, removeImage} from "../../actions/images";
import {connect} from "react-redux";

export const mapStateToProps = state => ({
  accepted: state.images.accepted,
});
export const mapDispatchToProps = {
  uploadImage,
  removeImage,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImagesUpload);

export const ImagesUploadComponent = ImagesUpload;
