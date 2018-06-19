import React, { Component } from 'react';
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

class LoginByPhone extends Component {
  state = { phone: '', status: '' };

  onButtonPress = async () => {
    try {
      this.setState({ status: 'Creating account' });
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
    } catch (err) {
      console.log('It seem this account already exist.');
    }

    try {
      this.setState({ status: 'Requesting verification code' });
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, {
        phone: this.state.phone
      });
    } catch (err) {
      console.log(err + ' request');
    }

    this.props.navigation.navigate('ConfirmPhone', { phone: this.state.phone });
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
              <Label>Phone</Label>
              <Input
                value={this.state.phone}
                onChangeText={phone => this.setState({ phone })}
                placeholder="Your Phone Number"
              />
            </Item>
          </Form>

          <Button onPress={this.onButtonPress} block style={{ margin: 15 }}>
            <Text>Get verification Code</Text>
          </Button>

          <ListItem itemDivider>
            <Text>Status: {this.state.status}</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default LoginByPhone;
