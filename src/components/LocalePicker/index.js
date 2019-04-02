import {connect} from "react-redux";
import {LocalePicker} from "./LocalePicker";
import {setLocale} from "../../actions/locale";

export const mapStateToProps = state => ({
  currentLocale: state.locale.currentLocale,
});
export const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocale(locale)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocalePicker);
