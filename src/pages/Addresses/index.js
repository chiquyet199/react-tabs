import {connect} from "react-redux";
import {go} from "../../actions/navigation";
import PastAddresses from "./PastAddresses";
import {next} from "../../actions/form";

const mapStateToProps = state => {
  return {
    globaltheme: state.globaltheme,
    progress: state.progress,
    translations: state.locale.translations.address_journey,
  };
};

const mapDispatchToProps = {
  next,
  goTo: location => dispatch => dispatch(go(location)),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PastAddresses);
