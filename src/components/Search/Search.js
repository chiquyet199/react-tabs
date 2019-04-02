import React, {Component} from "react";
import {SearchInput, SearchBox} from "./Search.styles";
import {IconButton} from "../Button";
import {string, func} from "prop-types";
import {WAIT_INTERVAL, ENTER_KEY} from "../../constants/search";
import {withTheme} from "styled-components";

export const ThemedIconButton = withTheme(IconButton);

export class Search extends Component {
  state = {
    inputValue: "",
  };
  /**
   * time-slicing implementation
   * todo: redo this when react will support time-slicing out of the box
   *
   */
  timer = null;
  handleInputChange = event => {
    clearTimeout(this.timer);
    this.setState({inputValue: event.target.value});
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  };
  /**
   * handle user press enter
   * send fetch data request immediately
   *
   */
  handleKeyDown = event => {
    if (event.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.triggerChange();
    }
  };
  triggerChange = () => {
    const {setFilterQuery} = this.props;
    setFilterQuery(this.state.inputValue);
  };
  render() {
    const {placeholder} = this.props;
    const {inputValue} = this.state;

    return (
      <SearchBox>
        <ThemedIconButton
          name="search"
          type="transparent_gray"
          iconsize={36}
          onClick={this.triggerChange}
        />
        <SearchInput
          type="search"
          placeholder={placeholder}
          onChange={this.handleInputChange}
          value={inputValue}
          onKeyDown={this.handleKeyDown}
        />
      </SearchBox>
    );
  }
}
Search.propTypes = {
  placeholder: string,
  setFilterQuery: func.isRequired,
};

export default Search;
