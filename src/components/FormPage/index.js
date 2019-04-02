import {connect} from "react-redux";
import {submit} from "redux-form";
import FormPage from "./FormPage";
import {go} from "../../actions/navigation";

export const mapStateToProps = state => ({
  screenSize: state.dimensions.size,
});

const mapDispatchToProps = {
  submit: () => dispatch => dispatch(submit("DynamicForm")),
  go,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPage);
