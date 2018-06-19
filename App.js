import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Root, Spinner } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Font } from 'expo';
import firebase from 'firebase';

import Home from './src/screens/Home';
import LoginByEmail from './src/screens/LoginByEmail';
import LoginWithFacebook from './src/screens/LoginWithFacebook';
import LoginByPhone from './src/screens/LoginByPhone';
import ConfirmPhone from './src/screens/ConfirmPhone';
import Note from './src/screens/Note';

export default class App extends React.Component {
  state = { font_loading: true };

  async componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBcAdxMuNgULR0X4L2OcpnvDkDumzHQvXg',
      authDomain: 'one-time-password-30206.firebaseapp.com',
      databaseURL: 'https://one-time-password-30206.firebaseio.com',
      projectId: 'one-time-password-30206',
      storageBucket: 'one-time-password-30206.appspot.com',
      messagingSenderId: '352516860518'
    });

    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ font_loading: false });

    console.ignoredYellowBox = ['Setting a timer'];
  }

  render() {
    if (this.state.font_loading)
      return (
        <View>
          <Spinner />
        </View>
      );

    console.log('Start Run');
    const AppNavigator = StackNavigator(
      {
        Home: { screen: Home },
        LoginByEmail: { screen: LoginByEmail },
        LoginWithFacebook: { screen: LoginWithFacebook },
        LoginByPhone: { screen: LoginByPhone },
        ConfirmPhone: { screen: ConfirmPhone },
        Note: { screen: Note }
      },
      {
        initialRouteName: 'Home',
        headerMode: 'none'
      }
    );

    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}
