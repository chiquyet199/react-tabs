import {push} from "connected-react-router";
import connect from "react-redux/es/connect/connect";
import GeneratingRentPassport from "./GeneratingRentPassport";

const mapStateToProps = state => ({
  translations: {
    generating_rent_passport_title:
      state.locale.translations.generating_rent_passport_title,
    generating_rent_passport_sub_title:
      state.locale.translations.generating_rent_passport_sub_title,
    generating_rent_passport_action:
      state.locale.translations.generating_rent_passport_action,
  },
  globaltheme: state.globaltheme,
});

const mapDispatchToProps = {
  goTo: push,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneratingRentPassport);
