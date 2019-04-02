import {push, goBack} from "connected-react-router";
import {connect} from "react-redux";
import {Menu} from "./Menu";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  showMenu: state.menu.showMenu,
  globaltheme: state.globaltheme,
});

const mapDispatchToProps = {
  goTo: push,
  goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
