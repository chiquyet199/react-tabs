import {connect} from "react-redux";
import {VerifyEmailRedirect} from "./VerifyEmail";
import {go} from "../../actions/navigation";
import {storeUser} from "../../actions/auth";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  go,
  storeUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyEmailRedirect);
