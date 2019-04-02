import React from "react";
import NativeDatePicker from "react-native-datepicker";
import {func, instanceOf} from "prop-types";
import styled from "styled-components/native";
import Icon from "../../components/Icon";
import {colors} from "../../constants/theme";

const StyledPicker = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  position: relative;
  padding: 0;
`;

const icon = <Icon name="calendar" size={32} style={{color: colors.white}} />;
export class DatePickerNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date()};
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate}, () => {
      this.props.onChange(this.state.chosenDate);
    });
  }

  render() {
    const {style} = this.props;

    return (
      <StyledPicker>
        <NativeDatePicker
          style={style}
          customStyles={customStyles}
          mode="date"
          placeholder="DD/MM/YYYY"
          date={this.state.chosenDate}
          textColor={colors.white}
          format="DD/MM/YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconComponent={icon}
          fontSize={20}
          onDateChange={this.setDate}
        />
      </StyledPicker>
    );
  }
}

const customStyles = {
  dateInput: {
    borderWidth: 0,
    alignItems: "flex-start",
  }, // inner
  dateTouchBody: {
    borderBottomWidth: 1,
    borderBottomColor: colors.canopySteel,
  }, // outer
  dateText: {
    color: colors.white,
    fontSize: 18,
    justifyContent: "flex-start",
  },
};

DatePickerNative.defaultProps = {
  date: null,
};

DatePickerNative.propTypes = {
  onChange: func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  date: instanceOf(Date),
};

export default DatePickerNative;
