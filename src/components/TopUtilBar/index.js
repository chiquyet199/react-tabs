import {connect} from "react-redux";
import {back} from "../../actions/navigation";
import TopBar from "./TopUtilBar";
const mapStateToProps = (state, ownProps) => ({
  progress: ownProps.progress ? ownProps.progress : state.progress,
  notification: state.notification,
  haveTopbar: state.topbar.haveTopbar,
  topbarBtn: state.topbar.topbarBtn,
  isLoggedIn: state.auth.isLoggedIn,
  topbarCenterText: state.topbar.topbarCenter.topbarCenterText,
  topbarLeftText: state.topbar.topbarLeft.topbarLeftText,
  globaltheme: state.globaltheme || ownProps.globaltheme,
  hideBackButton: state.topbar.topbarBtn.hideBackButton,
});

const mapDispatchToProps = {
  goBack: back,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
