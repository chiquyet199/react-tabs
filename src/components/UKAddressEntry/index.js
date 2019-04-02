import UKAddressEntry from "./UKAddressEntry";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  translations: state.locale.translations.common.UKAddressEntry,
  globaltheme: state.globaltheme,
});

export default connect(
  mapStateToProps,
  {},
)(UKAddressEntry);
