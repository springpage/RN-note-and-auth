import React, { Component } from 'react';
import firebase from 'firebase';

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
} from 'native-base';
import styles from './styles';

class LoginByEmail extends Component {
  state = {
    signUpEmail: '',
    signUpPassword: '',
    status: '',
    signInEmail: '',
    signInPassword: ''
  };

  onSignUpPress() {
    const { signUpEmail, signUpPassword } = this.state;

    this.setState({ status: 'Signing Up' });

    firebase
      .auth()
      .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then(user => this.onSignUpSuccess(user))
      .catch(err => console.log(err));
  }

  onSignUpSuccess = user => {
    console.log(user.user.uid);
    firebase
      .database()
      .ref(`/users/${user.user.uid}/note`)
      .set('')
      .then(this.setState({ status: 'Created Account successfully.' }))
      .catch(err => console.log(err));
  };

  onSignInPress() {
    const { signInEmail, signInPassword } = this.state;
    this.setState({ status: 'Signing In' });
    firebase
      .auth()
      .signInWithEmailAndPassword(signInEmail, signInPassword)
      .then(user => this.onSignInSuccess(user));
  }

  onSignInSuccess = user => {
    let note_content;
    const ref = firebase.database().ref(`/users/${user.user.uid}/note`);
    ref.on('value', snapshot => {
      ref.off();
      note_content = snapshot.val();
      this.setState({ status: '' });
      let loginType = 'email: ' + this.state.signInEmail;
      this.props.navigation.navigate('Note', {
        note_content: note_content,
        ref,
        loginType
      });
    });
  };
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
          <Separator bordered>
            <Text>Create Account</Text>
          </Separator>
          <Form>
            <Item inlineLabel>
              <Label>Email</Label>
              <Input
                value={this.state.signUpEmail}
                onChangeText={signUpEmail => this.setState({ signUpEmail })}
              />
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input
                value={this.state.signUpPassword}
                onChangeText={signUpPassword =>
                  this.setState({ signUpPassword })
                }
                secureTextEntry
              />
            </Item>
          </Form>

          <Button
            onPress={this.onSignUpPress.bind(this)}
            block
            style={{ margin: 15 }}
          >
            <Text>Sign Up</Text>
          </Button>
          <Separator bordered>
            <Text>Sign in with your account</Text>
          </Separator>
          <Form>
            <Item inlineLabel>
              <Label>Email</Label>
              <Input
                value={this.state.signInEmail}
                onChangeText={signInEmail => this.setState({ signInEmail })}
              />
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input
                value={this.state.signInPassword}
                onChangeText={signInPassword =>
                  this.setState({ signInPassword })
                }
                secureTextEntry
              />
            </Item>
          </Form>

          <Button
            onPress={this.onSignInPress.bind(this)}
            block
            style={{ margin: 15 }}
          >
            <Text>Sign In</Text>
          </Button>
          <ListItem itemDivider>
            <Text>Status: {this.state.status}</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default LoginByEmail;
