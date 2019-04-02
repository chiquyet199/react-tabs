import {connect} from "react-redux";
import CreditScoreScale from "./CreditScoreScale";

const mapStateToProps = (state, props) => ({
  creditScore: props.value || 0,
  translations: {
    credit_score_label: state.locale.translations.common.credit_score_label,
    credit_score_out_of: state.locale.translations.common.credit_score_out_of,
  },
});

export default connect(mapStateToProps)(CreditScoreScale);
