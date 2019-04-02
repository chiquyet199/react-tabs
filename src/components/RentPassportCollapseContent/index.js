import {connect} from "react-redux";
import RentPassportCollapseContent from "./RentPassportCollapseContent";
import {go} from "../../actions/navigation";
import {setModalVisible} from "../../actions/modal";

const mapStateToProps = state => ({
  globaltheme: state.globaltheme,
});

const mapDispatchToProps = {
  goTo: go,
  showModal: setModalVisible,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RentPassportCollapseContent);
