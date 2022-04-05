/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/screens/Login.js';
import Main from './src/screens/Main.js';

const App: () => Node = () => {

  const [loggedIn, setLogIn] = useState(null);
  const LoginStack = createNativeStackNavigator();
  const MainStack = createNativeStackNavigator();

  function LoginStackScreen() {
    return (
      <LoginStack.Navigator>
        <LoginStack.Screen 
          name="Login"
          component={Login} 
          options={{ title: '', headerShown:false }} 
          initialParams={{logIn: (accessToken) => {
            setLogIn(accessToken);
          }}}
        />
      </LoginStack.Navigator>
    );
  }

  function MainStackScreen() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen 
          name="Main"
          component={Main} 
          options={{ title: '', headerShown:false }} 
          initialParams={{accessToken: loggedIn, logOut: () => {
            setLogIn('');
          }}}
        />
      </MainStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
    {!loggedIn ? <LoginStackScreen></LoginStackScreen> : <MainStackScreen></MainStackScreen>}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;
