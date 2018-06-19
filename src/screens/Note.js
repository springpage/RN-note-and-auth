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
  ListItem,
  Textarea,
  Toast
} from 'native-base';
import styles from './styles';

class Note extends Component {
  state = { note: '', loginType: '' };
  componentDidMount() {
    Toast.show({
      text: 'Sign In successfully',
      duration: 2000
    });
    const { navigation } = this.props;

    let note = navigation.getParam('note_content');
    let loginType = navigation.getParam('loginType');
    this.setState({ note, loginType });
  }

  updateNote() {
    let ref = this.props.navigation.getParam('ref');
    ref.set(this.state.note).then(
      Toast.show({
        text: 'Updated your Note',
        duration: 2000
      })
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>Your Note</Title>
          </Body>
          <Right>
            <Button
              hasText
              transparent
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text>Close</Text>
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Separator bordered>
            <Text>Logged In with {this.state.loginType}</Text>
          </Separator>

          <Form>
            <Item>
              <Input
                multiline
                numberOfLines={10}
                value={this.state.note}
                onChangeText={note => this.setState({ note })}
              />
            </Item>
          </Form>
          <Button
            onPress={this.updateNote.bind(this)}
            block
            style={{ margin: 15 }}
          >
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Note;
