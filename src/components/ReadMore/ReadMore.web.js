import React, {Component, Fragment} from "react";
import {string, object, number} from "prop-types";
import Truncate from "react-truncate";
import styled from "styled-components/native";
import {themed} from "../../utils/common";

export const Text = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${({theme, globaltheme}) => theme[globaltheme].baseColor};
  font-weight: ${({bold}) => (bold === "true" ? "bold" : "normal")};
  text-align: left;
  padding: 0;
`;

export const Link = styled(Text)`
  color: ${({theme, globaltheme}) => theme[globaltheme].accentColor};
  font-weight: bold;
  cursor: pointer;
`;

export class ReadMoreWeb extends Component {
  state = {
    expanded: false,
    truncated: false,
  };

  handleTruncate = truncated => {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      });
    }
  };

  toggleLines = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const {text, more, less, lines, theme, globaltheme} = this.props;
    const themeProps = {theme, globaltheme};
    const {expanded, truncated} = this.state;

    return (
      <Text {...themeProps}>
        <Truncate
          lines={!expanded && lines}
          ellipsis={
            <Text {...themeProps}>
              {"..."}
              <Link onClick={this.toggleLines} {...themeProps}>
                {more}
              </Link>
            </Text>
          }
          onTruncate={this.handleTruncate}
        >
          <Text {...themeProps}>{text}</Text>
        </Truncate>
        {!truncated &&
          expanded && (
            <Fragment>
              {" "}
              <Link onClick={this.toggleLines} {...themeProps}>
                {less}
              </Link>
            </Fragment>
          )}
      </Text>
    );
  }
}

ReadMoreWeb.defaultProps = {
  lines: 6,
  more: "read more",
  less: "show less",
};

ReadMoreWeb.propTypes = {
  text: string.isRequired,
  lines: number,
  less: string,
  more: string,
  globaltheme: string.isRequired,
  theme: object.isRequired,
};

export default themed(ReadMoreWeb);
