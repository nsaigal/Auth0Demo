/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
} from 'react-native';

import Logo from '../img/logo.png'
import CustomTextField from '../components/CustomTextField.js';
import LoginButton from '../components/LoginButton.js';
import Auth0 from 'react-native-auth0';
import SInfo from 'react-native-sensitive-info';

const Login = ({navigation, route}) => {

  // State values
  const [loading, setLoading] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);

  // Initialize our auth0 application
  const auth0 = new Auth0({ domain: 'dev-q514-v6g.us.auth0.com', clientId: 'MLjFQIRfXQzzpPwW6La7PzjMdDCuSymz' });

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  function checkLoggedInStatus() {
    // Check if access token already exists in the keychain
    SInfo.getItem("accessToken", {})
    .then(accessToken => {
      if (accessToken) {
        // Check if access token is expired
        auth0.auth
        .userInfo({ token: 'accessToken' })
        .then(data => {
          route.params.logIn(accessToken);
        })
        .catch(err => {
          // If expired, use the refresh token to get another access token
          refresh();
        });
      }
      else {
        setShowButton(true);
      }
    })
    .catch(error => {
      console.log(error);
      setShowButton(true);
    });
  }

  function refresh() {
    // Get refresh token from keychain
    SInfo.getItem('refreshToken', {})
    .then(refreshToken => {
      auth0.auth
        .refreshToken({ refreshToken: refreshToken })
        .then(newAccessToken => {
          // console.log(newAccessToken);
          SInfo.setItem('accessToken', newAccessToken.accessToken, {});
          route.params.logIn(newAccessToken.accessToken);
        })
        .catch(accessTokenErr => {
          console.log("error getting new access token: ", accessTokenErr);
          setShowButton(true);
        });
    })
    .catch(error => {
      console.log(error);
      setShowButton(true);
    });
  }

  function login() {
    setLoading(true);
    auth0
    .webAuth
    .authorize({scope: 'openid profile email offline_access'})
    .then(credentials => {
      setLoading(false);
      // Successfully authenticated
      // Store the accessToken
      console.log(credentials);
      // console.log({ accessToken: credentials.accessToken })
      auth0.auth
      .userInfo({ token: credentials.accessToken })
      .then(data => {
        // console.log(data);
        SInfo.setItem("accessToken", credentials.accessToken, {});
        SInfo.setItem("refreshToken", credentials.refreshToken, {});

        route.params.logIn(credentials.accessToken);
      })
      .catch(err => {
        // next: add code for dealing with invalid access token
      });
    })
    .catch(error => console.log(error));
  }

  return (
    <SafeAreaView style={[styles.container, {alignItems: 'center'}]}>
      <Image source={Logo} style={{resizeMode: 'contain', width: '50%', marginTop: '15Tets%'}}></Image>
      {showButton && <View style={{padding: 30}}>
        {/* <CustomTextField placeholder='Username' loading={loading} secure={false} autoFocus={true}></CustomTextField> */}
        {/* <CustomTextField placeholder='Password' loading={loading} secure={true} autoFocus={false}></CustomTextField> */}
        <LoginButton title={'Login with Auth0'} loading={loading} click={login}></LoginButton>
      </View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black'
  },
});

export default Login;
