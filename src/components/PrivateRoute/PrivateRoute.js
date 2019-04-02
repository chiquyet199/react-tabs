import React from "react";
import {any} from "prop-types";
import {connect} from "react-redux";
import Routing from "../../utils/routing";
import Spinner from "../Spinner";
import {checkLoggedIn} from "../../actions/auth";

const {Route} = Routing;
export const PrivateRoute = ({
  isLoggedIn,
  component: Component,
  retrieveData,
  location,
  ...rest
}) => {
  if (!isLoggedIn) {
    retrieveData(location.pathname);
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Spinner visible />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: any.isRequired,
};

export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  retrieveData: async landingPath => {
    dispatch(checkLoggedIn(true, landingPath));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute);
