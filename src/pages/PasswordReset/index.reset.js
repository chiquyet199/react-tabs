import {connect} from "react-redux";
import PasswordReset from "./PasswordReset";
import {passwordSchema} from "../../schemas/PasswordSchema";

export const mapStateToProps = state => ({
  translations: {
    submit: state.locale.translations.submit,
    upperText: state.locale.translations.reset_password,
  },
  schema: passwordSchema(
    state.locale.translations.common.passwordForgetAndReset,
  ).reset,
});

export default connect(
  mapStateToProps,
  null,
)(PasswordReset);
