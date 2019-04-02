import React, {Component} from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "./styles.web.css";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";
import styled from "styled-components/native/index";
import {colors} from "../../constants/theme";
import onClickOutside from "react-onclickoutside";

export const StyledWrapper = styled.View`
  padding: 0;
  margin-bottom: 20px;
  position: static;
  z-index: auto;
`;

export const StyledView = styled.View`
  margin-bottom: 10px;
  z-index: auto;
  position: static;
`;
export const ErrorText = styled.Text`
  color: ${colors.red};
  width: 100%;
  font-size: 12px;
`;

export const StyledInput = styled.TextInput`
  color: ${props => props.color};
  border-bottom-color: ${props => props.color};
`;

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

const YearMonthForm = ({date, localeUtils, onChange, earliestYear}) => {
  const months = localeUtils.getMonths();

  let startYear = earliestYear || 1900;

  const years = [startYear];
  while (startYear <= currentYear) {
    years.push((startYear += 1));
  }

  const handleChange = e => {
    const {year, month} = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
};

export class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: fromMonth,
      selectedDay: formatDate(new Date(), "DD-MM-YYYY", "en"),
      isDisabled: false,
    };

    this.datePicker = null;

    this.setDayPickerRef = element => {
      this.datePicker = element;
    };

    this.hideDatePicker = () => {
      if (this.datePicker) {
        this.datePicker.hideDayPicker();
      }
    };

    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
  }

  componentDidMount() {
    this.hideDatePicker();
  }

  handleYearMonthChange(month) {
    this.setState({month});
  }

  handleClickOutside = () => {
    this.hideDatePicker();
  };

  handleDayChange = async selectedDay => {
    await this.setState({
      selectedDay: formatDate(selectedDay, "DD-MM-YYYY", "en"),
    });
    this.props.onChangeText(this.state.selectedDay);
  };

  render() {
    const {selectedDay, isDisabled} = this.state;
    const {textColor, errorText, label, earliestYear} = this.props;
    const dayPickerProps = {
      locale: "en",
      localeUtils: MomentLocaleUtils,
      month: this.state.month,
      fromMonth,
      toMonth,
      captionElement: ({date, localeUtils}) => (
        <YearMonthForm
          date={date}
          localeUtils={localeUtils}
          onChange={this.handleYearMonthChange}
          earliestYear={earliestYear}
        />
      ),
    };

    return (
      <StyledWrapper>
        <DayPickerInput
          {...this.props}
          component={props => (
            <StyledView className={errorText && "error"}>
              <StyledInput
                {...props}
                label={label}
                onChange={this.handleDayChange}
                disabled={isDisabled}
                color={textColor}
                placeholder={selectedDay}
              />
              <ErrorText className="error">
                {errorText ? String(errorText) : ""}
              </ErrorText>
            </StyledView>
          )}
          dayPickerProps={dayPickerProps}
          format="DD-MM-YYYY"
          formatDate={formatDate}
          onDayChange={this.handleDayChange}
          parseDate={parseDate}
          placeholder={selectedDay}
          ref={this.setDayPickerRef}
          showOverlay
          textColor={textColor}
        />
      </StyledWrapper>
    );
  }
}

export default onClickOutside(DatePicker);
