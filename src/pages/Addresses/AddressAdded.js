import React from "react";
import {Text} from "react-native";
import {connect} from "react-redux";

const AddressAdded = props => {
  // eslint-disable-next-line no-console
  console.log(props.stateDump);

  return <Text>Address Added</Text>;
};

const mapStateToProps = state => ({
  stateDump: state,
});

export default connect(
  mapStateToProps,
  {},
)(AddressAdded);
