import React, {Component} from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import InputField from "../InputField/inputField";
import styled from "styled-components/native";
import {array, shape, func, string} from "prop-types";
import Button from "../Button";
import {lookupAddress, postcodeClearResult} from "../../actions/form";
import Icon from "../Icon";
import {isWeb, themed} from "../../utils/common";
import {formatAddress, keyFromString} from "../../utils/string";

const PostcodeWrapper = styled.View`
  width: 100%;
`;

export const AddressWrapper = themed(styled.TouchableOpacity`
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({globaltheme, theme}) =>
    theme[globaltheme].baseColor};
  ${isWeb ? "cursor: pointer;" : ""} display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 22px 0;
`);

export const AddressOption = themed(styled.Text`
  color: ${({globaltheme, theme}) => theme[globaltheme].textColor};
  ${isWeb
    ? "white-space: no-wrap; cursor: pointer; display: block; text-overflow: ellipsis;"
    : ""} font-weight: bold;
  font-size: 18px;
  overflow: hidden;
`);

export class PostcodeLookup extends Component {
  state = {
    postcode: "",
  };

  componentWillUnmount() {
    this.props.clearAddressLookup();
  }

  render() {
    const {
      addresses,
      translations,
      requestPostcodeLookup,
      onAddressSelected,
      onAddressNotListed,
      globaltheme,
      theme,
      onChange,
    } = this.props;

    const foreColor = theme[globaltheme].form.baseColor;
    const tintColor = theme[globaltheme].form.accentColor;

    return (
      <PostcodeWrapper>
        <InputField
          label={translations.postcode}
          onChangeText={postcode => {
            this.setState({postcode});
          }}
          tintColor={tintColor}
          textColor={foreColor}
          baseColor={foreColor}
        />
        {!addresses.length && (
          <Button
            type="primary"
            middle={translations.find_address}
            onClick={() => {
              requestPostcodeLookup(this.state.postcode, "GB");
            }}
            style={[{marginTop: 30}]}
          />
        )}
        {addresses.length > 0 && (
          <View>
            <View>
              {addresses.map(address => (
                <AddressWrapper
                  key={keyFromString(formatAddress(address))}
                  onPress={() => {
                    onAddressSelected(address);
                    onChange(address);
                  }}
                >
                  <AddressOption numberOfLines={1}>
                    {formatAddress(address)}
                  </AddressOption>
                  <Icon name="arrow-right" size={26} color={foreColor} />
                </AddressWrapper>
              ))}
            </View>
            <Button
              type="secondary"
              middle={translations.address_not_listed}
              onClick={onAddressNotListed}
              style={[{marginTop: 30}]}
            />
          </View>
        )}
      </PostcodeWrapper>
    );
  }
}

PostcodeLookup.propTypes = {
  addresses: array,
  translations: shape({
    postcode: string,
    find_address: string,
    address_not_listed: string,
  }),
  requestPostcodeLookup: func.isRequired,
  onAddressSelected: func.isRequired,
  onAddressNotListed: func.isRequired,
  onChange: func.isRequired,
  globaltheme: string,
  clearAddressLookup: func.isRequired,
};

PostcodeLookup.defaultProps = {
  addresses: [],
};

const mapStateToProps = state => ({
  translations: state.locale.translations.common.postcode_lookup,
  addresses: state.lookups.addresses,
});

const mapDispatchToProps = {
  requestPostcodeLookup: lookupAddress,
  clearAddressLookup: postcodeClearResult,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(themed(PostcodeLookup));
