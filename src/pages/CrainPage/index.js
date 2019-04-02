import {connect} from "react-redux";
import CrainPage from "./CrainPage";
import {generateRentPassport} from "../../actions/form";
import {go} from "../../actions/navigation";

export const mapStateToProps = state => ({
  translations: {
    crain_header: state.locale.translations.crain.crain_header,
    crain_version: state.locale.translations.crain.crain_version,
    crain_bold_text: state.locale.translations.crain.crain_bold_text,
    crain_text: state.locale.translations.crain.crain_text,
    accept: state.locale.translations.accept,
    decline: state.locale.translations.decline,
  },
  form: state.form,
  globaltheme: state.globaltheme,
});

const mapDispatchToProps = {
  generateRentPassport,
  goTo: go,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CrainPage);
