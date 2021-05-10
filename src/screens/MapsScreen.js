import React from 'react';
import {StyleSheet, Platform, View,  Image, BackHandler, Keyboard, TouchableOpacity, TextInput} from 'react-native';
import AddNote from '../components/addNote';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
} from 'native-base';
import {Actions} from 'react-native-router-flux';

const MapsScreen = () => {
  return (
    <Container style={styles.MainContainer}>
      <Header style={styles.header} androidStatusBarColor="#BC2C3D">
        <Left>
          <Button transparent onPress={Actions.pop}>
            <Icon name="arrow-back" style={styles.icon} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>Add a note</Title>
        </Body>
        {/* <Right>
          <Button transparent>
            <Icon name="ios-chatbubbles" style={styles.icon} />
          </Button>
        </Right> */}
      </Header>
     <AddNote />
    </Container>
  );
};

export default MapsScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  header: {
    backgroundColor: '#EFD2BC',
  },
  headerText: {
    color: '#BC2C3D',
    marginLeft: -50,
    fontSize: 20,
    fontWeight: '900',
  },
  icon: {
    color: '#BC2C3D',
    fontSize: 26,
  },
});
