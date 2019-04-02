import themes, {colors, padding} from "./src/constants/theme";
import {setToken, postFile, get, post, put, del} from "./src/utils/api/api.js";
// Reducers
import AuthReducer from "./src/reducers/auth";
import DimensionsReducer from "./src/reducers/dimensions";
import InputFieldReducer from "./src/reducers/inputField";
import PartialFormReducer from "./src/reducers/form";
import ProgressReducer from "./src/reducers/progress";
import NotificationReducer from "./src/reducers/notifications";
import LookupsReducer from "./src/reducers/lookups";
import MenuReducer from "./src/reducers/menu";
import TopBarReducer from "./src/reducers/topbar";
import ModalReducer from "./src/reducers/modal";
import UserReducer from "./src/reducers/user";
import ThemeReducer from "./src/reducers/theme";
import ImagesReducer from "./src/reducers/images";
import RequestedPassportsReducer from "./src/reducers/requestedPassports";
import PropertiesReducer from "./src/reducers/properties";
import RentPassportSharesBranchesReducer from "./src/reducers/rentPassportSharesBranches";
import AgencyReducer from "./src/reducers/agency";
import AgentsReducer from "./src/reducers/agents";
import AgenciesReducer from "./src/reducers/agencies";
import aboutYouReducer from "./src/reducers/aboutYou";
import financialReducer from "./src/reducers/financial";
import rentPassportLegalReducer from "./src/reducers/rentPassportLegal";
import whatYouDoReducer from "./src/reducers/whatYouDo";
import whereYouLivedReducer from "./src/reducers/whereYouLived";
import selectedBranchReducer from "./src/reducers/selectedBranch";
import SpinnerReducer from "./src/reducers/spinner";
import rightToRentReducer from "./src/reducers/rentPassportRightToRent";
import photoReducer from "./src/reducers/photos";
import rentPassportStatusReducer from "./src/reducers/rentPassportStatus";
// Validators
import * as CommonValidators from "./src/utils/validators/common";
import * as EmailValidators from "./src/utils/validators/email";
import * as NumberValidators from "./src/utils/validators/number";
import * as PasswordValidators from "./src/utils/validators/password";
import * as AlphaValidators from "./src/utils/validators/alphaonly";
import * as PhoneValidators from "./src/utils/validators/phone";
import * as RegexValidators from "./src/utils/validators/regex";
// Common
import * as ImagesCommon from "./src/components/common/images";
import * as LayoutCommon from "./src/components/common/layout";
import * as UtilsCommon from "./src/utils/common";
import CanopyIcons from "./src/resources/fonts/fontello.ttf";
import * as API from "./src/utils/api";
import * as SchemaFragmentGenerators from "./src/utils/SchemaFragmentGenerators/SchemaFragmentGenerators";
import * as StringUtils from "./src/utils/string";
import * as PropertyUtils from "./src/utils/helpers/property";
import * as RentPassportUtils from "./src/utils/helpers/rentPassport";
import * as LinkingUtils from "./src/utils/helpers/linking";
import * as ObjectUtils from "./src/utils/helpers/object";
// Actions
import * as AuthAction from "./src/actions/auth";
import * as FormAction from "./src/actions/form";
import * as InputFieldAction from "./src/actions/inputField";
import * as LocaleAction from "./src/actions/locale";
import * as MenuAction from "./src/actions/menu";
import * as ModalAction from "./src/actions/modal";
import * as NavigationAction from "./src/actions/navigation";
import * as NotificationsAction from "./src/actions/notifications";
import * as ProgressAction from "./src/actions/progress";
import * as PropertyAction from "./src/actions/property";
import * as ThemeAction from "./src/actions/theme";
import * as TopBarAction from "./src/actions/topbar";
import * as PropertiesAction from "./src/actions/properties";
import * as AgentsAction from "./src/actions/agents";
import * as AgenciesAction from "./src/actions/agencies";
import * as UsersAction from "./src/actions/users";
import * as Actions from "./src/actions/types";
import * as SettingsAction from "./src/actions/settings";
import * as AgencyAction from "./src/actions/agency";
import * as RequestPassportAction from "./src/actions/requestPassport";
import * as RentPassportAction from "./src/actions/rent-passport";
import * as LeaseAction from "./src/actions/leases";
import * as PhotoAction from "./src/actions/photos";
import * as SpinnerActions from "./src/actions/spinner";
import * as OpenBankingAction from "./src/actions/openBanking";
import * as RentPassportSharingActions from "./src/actions/rentPassportSharing";
// Components
import {Accordion, AccordionWithCount} from "./src/components/Accordion";
import BottomMenu from "./src/components/BottomMenu/BottomMenu";
import FacebookLogin from "./src/components/FacebookLogin";
import RightToRentPreview from "./src/components/RightToRentPreview";
import {
  Button,
  MenuButton,
  IconButton,
  StyledIconContainer,
  TabButton,
} from "./src/components/Button";
import Carousel from "./src/components/Carousel"; // not sure on this due to web bit...
import DatePicker from "./src/components/DatePicker";
import RentPassportsPreview from "./src/components/RentPassportsPreview";
import Dialog from "./src/components/Dialog";
import Diverge from "./src/components/Diverge";
import DynamicForm from "./src/components/DynamicForm";
import FormPage from "./src/components/FormPage";
import FileUpload from "./src/components/FileUpload";
import HeaderPropertySummary from "./src/components/HeaderPropertySummary";
import Icon from "./src/components/Icon";
import {CoverImage} from "./src/components/Image";
import IconWithContent from "./src/components/IconWithContent";
import ImagePreview from "./src/components/ImagePreview";
import ImageUpload from "./src/components/ImageUpload";
import InputField from "./src/components/InputField/inputField";
import Link from "./src/components/Link";
import LocalePicker from "./src/components/LocalePicker";
import Menu from "./src/components/Menu";
import Modal from "./src/components/Modal";
import MultiPageForm from "./src/components/MultiPageForm";
import NotificationPanel from "./src/components/NotificationPanel";
import OptionPicker from "./src/components/OptionPicker";
import {defaultValues as OptionPickerDefaults} from "./src/components/OptionPicker/defaultValues";
import Picker from "./src/components/Picker";
import PostcodeLookup from "./src/components/PostcodeLookup";
import PrivateRoute from "./src/components/PrivateRoute";
import ProgressIndicator from "./src/components/ProgressIndicator";
import RadioButtonGroup from "./src/components/RadioButtonGroup";
import ReadMore from "./src/components/ReadMore";
import VerifyEmailRedirector from "./src/components/Redirects";
import RentPassportList from "./src/components/RentPassportList";
import RentPassportCompleteList from "./src/components/RentPassportCompleteList";
import RentPassportCollapseContent from "./src/components/RentPassportCollapseContent";
import RentPassportTextField from "./src/components/RentPassportTextField";
import SearchBox from "./src/components/Search";
import SmartBackground from "./src/components/SmartBackground";
import Spinner from "./src/components/Spinner";
import SuccessPage from "./src/components/SuccessPage";
import Switch from "./src/components/Switch";
import TopBar from "./src/components/TopUtilBar/";
import TwoFieldForm from "./src/components/TwoFieldForm";
import PassportInviteList from "./src/components/PassportInviteList";
import PropertyDetails from "./src/components/Property";
import ConvertHTMLStrongToBoldText from "./src/components/common/ConvertHTMLStrongToBoldText";
import UKAddressEntry from "./src/components/UKAddressEntry";
import ConfirmationAlert from "./src/components/ConfirmationAlert";
import ConfirmationAlertMulti from "./src/components/ConfirmationAlertMulti";
import OptionsAlert from "./src/components/OptionsAlert";
import Tabs from "./src/components/Tabs";
import UploadFilePage from "./src/components/UploadFilePage";
import PropertyItem from "./src/components/PropertyItem";
import DefaultPropertyImage from "./src/components/svg/DefaultPropertyImage";
import {Collapse, CollapseContent} from "./src/components/Collapse";
import RentPassportSpec from "./src/components/RentPassportSpec";

// Pages
import AccountLogin from "./src/pages/AccountLogin";
import AccountLoginUnconnected from "./src/pages/AccountLogin/AccountLogin";
import VerifyEmail from "./src/pages/VerifyEmail/VerifyEmail";
import VerifyEmailSuccess from "./src/pages/VerifyEmailSuccess";
import SettingsTemplate from "./src/pages/SettingsTemplate";
import ForgotPassword from "./src/pages/PasswordReset/index.forgot";
import ResetPassword from "./src/pages/PasswordReset/index.reset";

import PropertySpec from "./src/utils/api/specs/PropertySpec";
import LeaseSpec from "./src/utils/api/specs/LeaseSpec";

// Translations
import enUS from "./src/utils/locales/en-US";
import deDE from "./src/utils/locales/de-DE";
var Translations = {
  enUS,
  deDE,
};
// Schemas
import SignInSchema from "./src/schemas/SigninSchema";

import canopyLogo from "./src/resources/images/canopyLogo48.png";
import profile from "./src/assets/user.png";
import employment from "./src/assets/employment.png";
import property from "./src/assets/property.png";
import payments from "./src/assets/payments.png";
import legal from "./src/assets/legal.png";
import EXCELLENT from "./src/assets/rent_passport/financial/EXCELLENT.png";
import FAIR from "./src/assets/rent_passport/financial/FAIR.png";
import GOOD from "./src/assets/rent_passport/financial/GOOD.png";
import POOR from "./src/assets/rent_passport/financial/POOR.png";
import VERY_POOR from "./src/assets/rent_passport/financial/VERY_POOR.png";
import upArrow from "./src/assets/ic_up_arrow_gray/ic_up_arrow_gray.png";
import downArrow from "./src/assets/ic_down_arrow_gray/ic_down_arrow_gray.png";
var Images = {
  canopyLogo,
  profile,
  employment,
  property,
  payments,
  legal,
  EXCELLENT,
  FAIR,
  GOOD,
  POOR,
  VERY_POOR,
  upArrow,
  downArrow,
};

export {
  setToken,
  postFile,
  get,
  put,
  post,
  del,
  themes,
  colors,
  padding,
  // Reducers
  AuthReducer,
  DimensionsReducer,
  InputFieldReducer,
  PartialFormReducer,
  ProgressReducer,
  NotificationReducer,
  LookupsReducer,
  MenuReducer,
  TopBarReducer,
  ModalReducer,
  UserReducer,
  ThemeReducer,
  ImagesReducer,
  PropertiesReducer,
  AgencyReducer,
  AgentsReducer,
  AgenciesReducer,
  RentPassportSharesBranchesReducer,
  RequestedPassportsReducer,
  aboutYouReducer,
  financialReducer,
  rentPassportLegalReducer,
  whatYouDoReducer,
  whereYouLivedReducer,
  selectedBranchReducer,
  SpinnerReducer,
  rightToRentReducer,
  photoReducer,
  rentPassportStatusReducer,
  // Validators
  CommonValidators,
  EmailValidators,
  NumberValidators,
  PasswordValidators,
  AlphaValidators,
  PhoneValidators,
  RegexValidators,
  // Common
  ImagesCommon,
  LayoutCommon,
  UtilsCommon,
  CanopyIcons,
  API,
  SchemaFragmentGenerators,
  StringUtils,
  PropertyUtils,
  RentPassportUtils,
  LinkingUtils,
  ObjectUtils,
  // Actions
  AuthAction,
  FormAction,
  InputFieldAction,
  LocaleAction,
  MenuAction,
  ModalAction,
  NavigationAction,
  NotificationsAction,
  ProgressAction,
  PropertyAction,
  ThemeAction,
  TopBarAction,
  RequestPassportAction,
  PropertiesAction,
  AgentsAction,
  AgenciesAction,
  UsersAction,
  LeaseAction,
  Actions,
  SettingsAction,
  AgencyAction,
  RentPassportAction,
  Tabs,
  SpinnerActions,
  PhotoAction,
  OpenBankingAction,
  RentPassportSharingActions,
  // Pages
  AccountLogin,
  AccountLoginUnconnected,
  VerifyEmail,
  VerifyEmailSuccess,
  SettingsTemplate,
  ForgotPassword,
  ResetPassword,
  // Components
  Accordion,
  AccordionWithCount,
  BottomMenu,
  FacebookLogin,
  RightToRentPreview,
  Button,
  RentPassportsPreview,
  MenuButton,
  IconButton,
  HeaderPropertySummary,
  StyledIconContainer,
  TabButton,
  Carousel,
  DatePicker,
  Dialog,
  Diverge,
  DynamicForm,
  FormPage,
  FileUpload,
  Icon,
  PassportInviteList,
  CoverImage,
  IconWithContent,
  ImagePreview,
  ImageUpload,
  InputField,
  Link,
  LocalePicker,
  Menu,
  Modal,
  MultiPageForm,
  NotificationPanel,
  OptionPicker,
  OptionPickerDefaults,
  Picker,
  PostcodeLookup,
  PrivateRoute,
  ProgressIndicator,
  RadioButtonGroup,
  ReadMore,
  VerifyEmailRedirector,
  RentPassportList,
  RentPassportCompleteList,
  RentPassportCollapseContent,
  RentPassportTextField,
  SearchBox,
  SuccessPage,
  SmartBackground,
  Spinner,
  Switch,
  TopBar,
  TwoFieldForm,
  ConvertHTMLStrongToBoldText,
  UKAddressEntry,
  ConfirmationAlert,
  ConfirmationAlertMulti,
  OptionsAlert,
  Images,
  UploadFilePage,
  PropertyItem,
  PropertySpec,
  LeaseSpec,
  RentPassportSpec,
  DefaultPropertyImage,
  Collapse,
  CollapseContent,
  PropertyDetails,
  // Translations
  Translations,
  // Schemas
  SignInSchema,
};
