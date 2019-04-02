import {connect} from "react-redux";
import {go} from "../../actions/navigation";
import BottomMenu from "./BottomMenu";
import MenuItems from "../../schemas/Menu";

const mapStateToProps = state => ({
  items: MenuItems,
  location: state.router.location.pathname,
});

const mapDispatchToProps = {
  go,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomMenu);
