import {connect} from "react-redux";
import UploadFilePage from "./UploadFilePage.web";
import {submit} from "redux-form";
import {go} from "../../actions/navigation";
import {clearProgress, updateProgress} from "../../actions/progress";
import {next} from "../../actions/form";
import {showTopbarCenterText} from "../../actions/topbar";

const mapStateToProps = state => ({
  globaltheme: state.globaltheme,
  translations: state.locale.translations.fileUpload,
  form: state.form,
});

const mapDispatchToProps = {
  go,
  clearProgress,
  updateProgress,
  next,
  submit: () => dispatch => dispatch(submit("DynamicForm")),
  showTopbarCenterText: text => dispatch =>
    dispatch(showTopbarCenterText(text)),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadFilePage);
