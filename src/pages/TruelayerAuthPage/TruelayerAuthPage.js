import React, {Component} from "react";
import {withTheme} from "styled-components";
import {
  TruelayerContainer,
  TruelayerPageTitle,
} from "./TruelayerAuthPage.styles";
import {webhooks} from "../../constants/webhook";
import {StyleSheet, WebView} from "react-native";

export class TruelayerAuth extends Component {
  render() {
    const {translations, theme, globaltheme} = this.props;

    return (
      <TruelayerContainer>
        <TruelayerPageTitle globaltheme={globaltheme} theme={theme}>
          {translations.truelayer_auth_title}
        </TruelayerPageTitle>
        <WebView
          style={styles.webview}
          mixedContentMode="always"
          title={translations.truelayer_auth_title}
          onMessage={ev => ev.nativeEvent}
          // FIXME Add to .env
          source={{uri: webhooks.truelayer.callbackUrl}}
        />
      </TruelayerContainer>
    );
  }
}
// Should be locked inside Native Component (because styled.WebView fails on Web during tests)
export const styles = StyleSheet.create({
  webview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    alignSelf: "stretch",
  },
});

export default withTheme(TruelayerAuth);
