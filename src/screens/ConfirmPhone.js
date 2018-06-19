import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';

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

const ROOT_URL =
  'https://us-central1-one-time-password-30206.cloudfunctions.net';

class ConfirmPhone extends Component {
  state = { phone: '', status: '', code: '' };

  componentDidMount() {
    let phone = this.props.navigation.getParam('phone');
    this.setState({ phone: phone });
  }

  onButtonPress = async () => {
    const { phone, code } = this.state;
    try {
      this.setState({ status: 'Verifying ... ' });
      let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
        phone: this.state.phone,
        code: this.state.code
      });

      firebase.auth().signInWithCustomToken(data.token);

      let ref = firebase.database().ref(`/users/${phone}/note`);
      let loginType = 'phone: ' + phone;

      this.setState({ status: 'Login success, Opening Your Note' });
      this.openNote(loginType, ref);
    } catch (err) {
      console.log(err + ' verify');
    }
  };

  openNote = (loginType, ref) => {
    ref.once('value').then(function(snapshot) {
      let note_exist = snapshot.exists(); // true
      if (!note_exist) {
        ref.set('');
      }
    });

    ref.on('value', snapshot => {
      ref.off();
      note_content = snapshot.val();
      this.setState({ status: '' });
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
            <Title>Phone</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Separator bordered>
            <Text>Create Account</Text>
          </Separator>
          <Form>
            <Item inlineLabel>
              <Label>Code</Label>
              <Input
                value={this.state.code}
                onChangeText={code => this.setState({ code })}
                placeholder="Enter code"
              />
            </Item>
          </Form>
          <Button onPress={this.onButtonPress} block style={{ margin: 15 }}>
            <Text>Login</Text>
          </Button>

          <ListItem itemDivider>
            <Text>Status: {this.state.status}</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default ConfirmPhone;
