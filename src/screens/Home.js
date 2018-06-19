import React, { Component } from 'react';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  ListItem,
  List
} from 'native-base';

import styles from './styles';

const datas = [
  {
    route: 'LoginByEmail',
    text: 'Login using Email and Password'
  },
  {
    route: 'LoginWithFacebook',
    text: 'Login with Facebook account'
  },
  {
    route: 'LoginByPhone',
    text: 'Login by your Phone'
  }
];

class Home extends Component {
  // eslint-disable-line

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>Secret</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={datas}
            renderRow={data => (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Text>{data.text}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{ color: '#999' }} />
                </Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default Home;
