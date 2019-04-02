/* eslint-disable */
// Code below coppied from facebook SDK. Please do not modify as it is facebook generated.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button/index';
import { ButtonBar } from '../common/layout';
import { loginWithFacebook } from '../../actions/auth';

export class FacebookLogin extends Component {
    componentDidMount() {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1867137223567195',
                status: true,
                xfbml: true,
                version: 'v2.9'
            });
        };
        (function (d, s, id) {
            let js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    login = () => {
        FB.login((response) => {
                if (response.authResponse) {
                    this.props.loginWithFacebook(response.authResponse.accessToken)
                    // FB.api('/me', { fields: 'email, first_name, last_name' }, (FBresponse) => {
                    //     this.props.loginWithFacebook(FBresponse);
                    // });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }
        );
    };

    render() {
        return (
            <ButtonBar>
                <Button type="facebook" left="facebook" middle="Continue with Facebook" right="arrow-right" onClick={this.login}  iconsize={32}/>
            </ButtonBar>
        );
    }
}

export const mapDispatchToProps = {
    loginWithFacebook
};


export default connect(null, mapDispatchToProps)(FacebookLogin);