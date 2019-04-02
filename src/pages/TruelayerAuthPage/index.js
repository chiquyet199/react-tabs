import {connect} from "react-redux";
import TruelayerAuthPage from "./TruelayerAuthPage";
import {webhooks} from "../../constants/webhook";

export const _openAuthWindow = () => {
  let w;
  let h;
  if (window.outerWidth > 768) {
    w = window.outerWidth / 1.8;
    h = window.outerHeight * 0.9;
  } else {
    w = window.outerWidth * 0.8;
    h = window.outerHeight * 0.8;
  }
  const y = window.outerHeight / 2 + window.screenY - h / 2;
  const x = window.outerWidth / 2 + window.screenX - w / 2;
  const params = `scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=${w},height=${h},top=${y},left=${x}`;
  // eslint-disable-next-line no-restricted-globals
  window.open(
    webhooks.truelayer.callbackUrl,
    "Please choose your bank",
    params,
  );
  window.focus();
};

export const mapStateToProps = state => ({
  openAuthWindow: _openAuthWindow,
  translations: {
    truelayer_auth_title:
      state.locale.translations.truelayer.truelayer_auth_title,
    authorize: state.locale.translations.authorize,
  },
  globaltheme: state.globaltheme,
});

export default connect(mapStateToProps)(TruelayerAuthPage);
