import React from "react";
import Picker from "../Picker";
import styled from "styled-components/native";
import {defaultValues} from "./defaultValues";
import {withTheme} from "styled-components";

export const StyledPicker = styled(Picker)`
  padding-top: 0;
`;

export const ComponentContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  padding: 0;
`;

export const InputContainer = styled.View`
  flex: 1;
`;

export class WebOptionPicker extends React.Component {
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
      current: this.props.initialValue || selectDefault.value,
    };
  }

  componentDidUpdate(oldProps) {
    const {initialValue} = this.props;
    const {initialValue: prevInitialValue} = oldProps;
    const {current: currentState} = this.state;

    if (initialValue !== prevInitialValue && initialValue !== currentState) {
      this.onValueChange(initialValue);
    }
  }

  componentDidMount() {
    this.onValueChange(this.state.current);
  }

  onValueChange = changedValue => {
    this.setState({current: changedValue});
    this.props.onChange(changedValue);
  };

  render() {
    const {current} = this.state;
    const {globaltheme} = this.props;

    return (
      <ComponentContainer>
        <InputContainer>
          <StyledPicker
            {...this.props}
            globaltheme={globaltheme}
            currentValue={current}
            options={this.defaultValues}
            onChange={this.onValueChange}
          />
        </InputContainer>
      </ComponentContainer>
    );
  }
}

export default withTheme(WebOptionPicker);
