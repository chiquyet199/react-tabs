import React from "react";
import {TouchableOpacity, Platform, View} from "react-native";
import Picker from "../Picker";
import styled from "styled-components/native/index";
import {TextField} from "react-native-material-textfield";
import {isIos} from "../../utils/common";
import {defaultValues} from "./defaultValues";
import {withTheme} from "styled-components";

export const ComponentContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
  padding-top: 0;
  position: relative;
  padding-horizontal: 0;
`;

export const InputContainer = styled.View`
  flex: 1;
`;
export const IconImage = styled.Image`
  position: absolute;
  right: 15px;
  bottom: 10px;
`;

export const DefaultPicker = styled(Picker)`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-bottom-color: ${({theme}) => theme.colors.white};
  border-bottom-width: 3px;
`;

export const IosPicker = styled(Picker)`
  width: 100%;
  left: 0;
  background-color: ${({theme}) => theme.colors.white};
`;

export class NativeOptionPicker extends React.Component {
  constructor(props) {
    super(props);
    const {type} = this.props;
    if (type) {
      this.defaultValues = defaultValues[type];
    } else {
      this.defaultValues = this.props.options;
    }

    const [selectDefault] = this.defaultValues;
    this.state = {
      isOpen: false,
      current: selectDefault.value,
    };
  }

  componentDidMount() {
    this.onValueChange(this.state.current);
  }

  onValueChange = changedValue => {
    const {onChange} = this.props;
    if (isIos) {
      const changedName = this.defaultValues.find(
        obj => obj.value === changedValue,
      );
      this.setState({isOpen: false, current: changedName.label});
    } else {
      this.setState({isOpen: false, current: changedValue});
    }

    onChange(changedValue);
  };

  openPicker = () => this.setState({isOpen: true});

  render() {
    const {
      globaltheme,
      theme: {colors},
    } = this.props;
    const {current, isOpen} = this.state;
    const iconImage =
      globaltheme === "dark"
        ? require("../../assets/down_arrow/dropdown_arrow_dark.png")
        : require("../../assets/down_arrow/dropdown_arrow.png");
    if (Platform.OS === "ios") {
      return (
        <View>
          <TouchableOpacity onPress={this.openPicker}>
            <ComponentContainer>
              <InputContainer>
                <TextField
                  value={current}
                  baseColor={
                    globaltheme === "dark" ? colors.white : colors.canopySteel
                  }
                  tintColor={
                    globaltheme === "dark" ? colors.white : colors.primary
                  }
                  errorColor={colors.alertRed}
                  textColor={
                    globaltheme === "dark" ? colors.white : colors.canopySteel
                  }
                  editable={false}
                  fontSize={20}
                  label=""
                />
              </InputContainer>
              <IconImage source={iconImage} />
            </ComponentContainer>
          </TouchableOpacity>
          {isOpen && (
            <IosPicker
              {...this.props}
              currentValue={current}
              options={this.defaultValues}
              onChange={this.onValueChange}
            />
          )}
        </View>
      );
    }

    return (
      <ComponentContainer>
        <InputContainer>
          <DefaultPicker
            {...this.props}
            currentValue={current}
            options={this.defaultValues}
            onChange={this.onValueChange}
          />
        </InputContainer>
      </ComponentContainer>
    );
  }
}

export default withTheme(NativeOptionPicker);
