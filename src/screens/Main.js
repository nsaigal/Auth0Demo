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
  Text,

} from 'react-native';

import Auth0 from 'react-native-auth0';
import SInfo from 'react-native-sensitive-info';

const Main = ({navigation, route}) => {

  const [name, setName] = React.useState('');
  const auth0 = new Auth0({ domain: 'dev-q514-v6g.us.auth0.com', clientId: 'MLjFQIRfXQzzpPwW6La7PzjMdDCuSymz' });

  useEffect(() => {
    // Get user info. If the access token is invalid, navigate user back to login
    auth0.auth
    .userInfo({ token: route.params.accessToken })
    .then(data => {
      setName(data.name);
    })
    .catch(err => {
      SInfo.deleteItem('accessToken', {});
      SInfo.deleteItem('refreshToken', {});
      route.params.logOut();
    });
  }, []);

  return (
    <SafeAreaView style={[styles.container, {alignItems: 'center'}]}>
      {name != '' && <Text style={styles.text}>
        Welcome, {name}!
      </Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'Avenir',
    fontSize: 20,
    padding: 100
  },
});

export default Main;
