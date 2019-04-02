import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import auth from "./auth";
import agents from "./agents";
import agencies from "./agencies";
import locale from "./locale";
import dimensions from "./dimensions";
import inputField from "./inputField";
import partialForm from "./form";
import progress from "./progress";
import properties from "./properties";
import notification from "./notifications";
import menu from "./menu";
import topbar from "./topbar";
import modal from "./modal";
import user from "./user";
import theme from "./theme";
import lookups from "./lookups";
import images from "./images";
import agency from "./agency";
import requestedPassports from "./requestedPassports";
import rentPassportSharesBranches from "./rentPassportSharesBranches";
import aboutYou from "./aboutYou";
import whereYouLived from "./whereYouLived";
import rentPassportLegal from "./rentPassportLegal";
import whatYouDo from "./whatYouDo";
import financial from "./financial";
import spinner from "./spinner";
import rightToRentInfo from "./rentPassportRightToRent";
import photos from "./photos";

const rentPassportReducers = combineReducers({
  aboutYou,
  whereYouLived,
  whatYouDo,
  financial,
  rentPassportLegal,
  rightToRentInfo,
});
export default combineReducers({
  locale,
  auth,
  agents,
  agencies,
  dimensions,
  inputField,
  form: formReducer,
  partialForm,
  progress,
  properties,
  notification,
  menu,
  topbar,
  modal,
  user,
  globaltheme: theme,
  lookups,
  images,
  agency,
  requestedPassports,
  rentPassportSharesBranches,
  rentPassport: rentPassportReducers,
  photos,
  spinner,
});
