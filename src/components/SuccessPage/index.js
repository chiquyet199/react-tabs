import {connect} from "react-redux";
import {go} from "../../actions/navigation";
import {updateProgress, clearProgress} from "../../actions/progress";
import {hideTopbar, showTopbar} from "../../actions/topbar";
import SuccessPage from "./SuccessPage";

export const mapStateToProps = state => ({
  form: state.form,
  globaltheme: state.globaltheme,
});

export const mapDispatchToProps = dispatch => ({
  updateProgress: progress => dispatch(updateProgress(progress)),
  clearProgress: () => dispatch(clearProgress()),
  go: nextLocation => dispatch(go(nextLocation)),
  hideTopbar: () => dispatch(hideTopbar()),
  showTopbar: () => dispatch(showTopbar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuccessPage);
