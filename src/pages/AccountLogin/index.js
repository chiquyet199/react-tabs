import {connect} from "react-redux";
import AccountLogin from "./AccountLogin";
import {checkLoggedIn, loggedIn} from "../../actions/auth";
import {go} from "../../actions/navigation";
import {
  updateTopbarButton,
  hideTopbarButton,
  showTopbarButton,
} from "../../actions/topbar";
import {destroy} from "redux-form";
import {errorNotification} from "../../actions/notifications";

export const mapStateToProps = state => ({
  size: state.dimensions.size,
  isLoggedIn: state.auth.isLoggedIn,
  landingPath: state.auth.landingPath,
  globaltheme: state.globaltheme,
  forgotPasswordText:
    state.locale.translations.forgotPassword ||
    state.locale.translations.common.forgotPassword,
});

export const mapDispatchToProps = {
  goTo: go,
  hideTopbarButton,
  loggedIn,
  destroy: () => dispatch => dispatch(destroy("DynamicForm")),
  restartForm: () => dispatch => dispatch(destroy("DynamicForm")),
  showTopbarButton,
  updateTopbarButton,
  showBadCredentialsNotification: message => dispatch =>
    dispatch(errorNotification(new Error(message))),
  checkLoggedIn: () => dispatch => dispatch(checkLoggedIn(false)),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountLogin);
