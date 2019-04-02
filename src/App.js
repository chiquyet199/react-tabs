import React, {Component} from "react";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {Route, Switch, Redirect} from "react-router";
import {Dimensions} from "react-native";
import {ThemeProvider} from "styled-components";
import RNSplashScreen from "react-native-splash-screen";

import theme from "./constants/theme";
import {isNative} from "./utils/common";
import store, {history} from "./utils/store/store";
import {SET_DIMENSIONS} from "./actions/types";
import PrivateRoute from "./components/PrivateRoute";

import About from "./pages/About";
import AccountLogin from "./pages/AccountLogin";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import PasswordReset from "./pages/PasswordReset/index.reset";
import PasswordForgot from "./pages/PasswordReset/index.forgot";
import NotFound from "./pages/NotFound";
import TermsAndConditions from "./pages/TermsAndConditions";
import RentPassport from "./pages/RentPassport";
import TopUtilBar from "./components/TopUtilBar";
import GeneratingRentPassport from "./pages/GeneratingRentPassport";
import TruelayerAuthPage from "./pages/TruelayerAuthPage";

import BottomMenu from "./components/BottomMenu";
import SmartBackground from "./components/SmartBackground";
import CrainPage from "./pages/CrainPage";
import Addresses from "./pages/Addresses";
import AddressAdded from "./pages/Addresses/AddressAdded";
import OpenBankingProcessing from "./components/OpenBankingProcessing";

/* import RentalHistoryComplete from "./pages/RentalHistoryComplete"; */

/* import EmploymentReferenceRequest from "./pages/EmploymentReference"; */
import PropertyReferenceRequest from "./pages/PropertyReference";

if (typeof global.self === "undefined") {
  global.self = global;
}

Dimensions.addEventListener("change", ({window}) =>
  store.dispatch({
    type: SET_DIMENSIONS,
    ...window,
  }),
);

class App extends Component {
  componentDidMount() {
    if (isNative) {
      RNSplashScreen.hide();
    }
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme.selva}>
          <SmartBackground>
            <TopUtilBar />
            <ConnectedRouter history={history}>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/About" component={About} />
                <PrivateRoute exact path="/Contact" component={Contact} />
                <Route exact path="/login" component={AccountLogin} />
                <Route exact path="/crain" component={CrainPage} />
                <Route
                  exact
                  path="/auth-truelayer"
                  component={TruelayerAuthPage}
                />
                <Route exact path="/rent-passport" component={RentPassport} />
                <Route
                  exact
                  path="/forgotPassword"
                  component={PasswordForgot}
                />
                <Route exact path="/resetPassword" component={PasswordReset} />
                <Route
                  exact
                  path="/signup"
                  render={() => <Redirect to="/signup/name" />}
                />
                <Route
                  exact
                  path="/signup/terms"
                  component={TermsAndConditions}
                />
                <Route
                  exact
                  path="/TermsAndConditions"
                  component={TermsAndConditions}
                />
                <Route
                  exact
                  path="/create-rent-passport"
                  render={() => <Redirect to="/create-rent-passport/name" />}
                />
                <Route
                  exact
                  path="/tenant-reference-request"
                  render={() => (
                    <Redirect to="/tenant-reference-request/payments" />
                  )}
                />
                <Route
                  exact
                  path="/where-you-have-lived"
                  component={Addresses}
                />

                <Route
                  exact
                  path="/request-property-reference"
                  component={PropertyReferenceRequest}
                />
                <Route
                  exact
                  path="/current-address-added"
                  component={AddressAdded}
                />
                <Route
                  exact
                  path="/generating-rent-passport"
                  component={GeneratingRentPassport}
                />
                <Route
                  exact
                  path="/dev-route"
                  component={OpenBankingProcessing}
                />
                <Route component={NotFound} />
              </Switch>
            </ConnectedRouter>
            <BottomMenu />
          </SmartBackground>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
