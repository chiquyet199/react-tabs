import {connect} from "react-redux";
import PropertyReferenceRequest from "./PropertyReferenceRequest";
import {updateProgress} from "../../actions/progress";
import PropertyReferenceSchema from "../../schemas/propertyReferenceSchema";
import {next} from "../../actions/form";

export const mapStateToProps = state => ({
  schema: PropertyReferenceSchema,
  addresses: state.partialForm.values.addresses || [],
});
export const mapDispatchToProps = {
  next,
  updateProgress,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PropertyReferenceRequest);
