import React, {Component} from "react";
import {
  Container,
  TextContainer,
  TextContent,
  StyledIndicator,
} from "./Spinner.style";
import {colors} from "../../constants/theme";

export default class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      textContent: this.props.textContent,
    };
  }

  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: "",
    animation: "none",
    color: colors.white,
    size: "large",
    overlayColor: colors.semiTransparent,
  };

  close() {
    this.setState({visible: false});
  }

  componentWillReceiveProps(nextProps) {
    const {visible, textContent} = nextProps;
    this.setState({visible, textContent});
  }

  _renderDefaultContent() {
    return (
      <Container>
        <StyledIndicator color={this.props.color} size={this.props.size} />
        <TextContainer>
          <TextContent>{this.state.textContent}</TextContent>
        </TextContainer>
      </Container>
    );
  }

  _renderSpinner() {
    const {visible} = this.state;
    if (!visible) {
      return null;
    }

    return (
      <Container
        overlaycolor={this.props.overlayColor}
        key={`spinner_${Date.now()}`}
      >
        {this.props.children
          ? this.props.children
          : this._renderDefaultContent()}
      </Container>
    );
  }

  render() {
    return this._renderSpinner();
  }
}
