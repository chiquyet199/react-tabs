import {connect} from "react-redux";
import OpenBankingProcessing from "./OpenBankingProcessing";

const mapStateToProps = state => ({
  status: state.openBankingStatus || "success", // TODO what controls this?
  translations: {
    not_now: state.locale.translations.not_now,
    ...state.locale.translations.populating_rent_passport,
  },
  globaltheme: state.globaltheme,
});

const mapDispatchToProps = {
  continueToRentPassport: () => {
    // console.log("continueToRentPassport clicked");
  },
  startRentPassport: () => {
    // console.log("startRentPassport clicked");
  },
  rentPassportNotNow: () => {
    // console.log("rentPassport_notNow clicked");
  },
  openBankingNotUpdating: () => {
    // console.log("openBankingNotUpdating clicked");
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenBankingProcessing);
