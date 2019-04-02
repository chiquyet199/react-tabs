import {connect} from "react-redux";
import {go} from "../../actions/navigation";
import RentPassport from "./RentPassport";
import incompleteRentPassportSchema from "../../schemas/IncompleteRentPassportSchema";
import {setModalVisible} from "../../actions/modal";
import {updateTheme} from "../../actions/theme";

const mapStateToProps = state => ({
  schema: incompleteRentPassportSchema,
  user: state.auth.user,
  globaltheme: state.globaltheme,
});

const mapDispatchToProps = {
  showModal: setModalVisible,
  go,
  updateTheme,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RentPassport);
