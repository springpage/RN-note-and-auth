import React, { Component } from "react";
import firebase from 'firebase';
import { Facebook } from 'expo';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text,
  Separator,
  ListItem
} from "native-base";
import styles from "./styles";

class LoginWithFacebook extends Component {

  async LoginWithFacebook(){
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    '173160326692398',
    { permissions: ['public_profile'] }
  );

  if (type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then(user=> {
        let ref = firebase.database().ref(`/users/${user.user.uid}/note`);
        let loginType= 'facebook: '+user.additionalUserInfo.profile.name;
        this.openNote(loginType, ref);

      })
      .catch((error) => {
        console.log(error);
      });

    console.log('Login success with Facebook');

  }
  }

  openNote = (loginType, ref) => {
    ref.once("value")
      .then(function(snapshot) {
        let note_exist = snapshot.exists();  // true
        if (!note_exist){
          ref.set('');
        }
      });
      
    ref.on('value', snapshot => {
        ref.off();
        note_content=snapshot.val();
        this.setState({ status: ''});
        this.props.navigation.navigate('Note',{note_content:note_content, ref, loginType});
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Button
            onPress={this.LoginWithFacebook.bind(this)}
            block
            style={{ margin: 15}}
          >
            <Text>Start</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default LoginWithFacebook;
