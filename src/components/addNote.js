/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {StyleSheet, View,  Image, BackHandler, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';



export default class addNote extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,

        title: '',
        desc: '',

      
    };
  }

  componentDidMount = () => {
    this.setState({loading: false});
  };

  handleTitleChange = (text) => {
    this.setState({ title: text.trim() })
}
handleDescChange = (text) => {
  this.setState({ desc: text.trim() })
}

  render() {
    return (
     <View style={[{ flex: 1, backgroundColor: '#FFFFFF', }]}>


        <View style={{ justifyContent: 'center', }}>
          <Text style={styles.TextInputName}>Title</Text>
          <View style={styles.background}>


              <TextInput

                  onChangeText={this.handleTitleChange}
                  placeholder='Enter title'
                  style={{
                      flex: 1,
                      fontSize: hp('2%'),

                  }}
              />
          </View>
          <View style = {{marginTop: hp('1.81%')}}>
          <Text style={styles.TextInputName}>Description</Text>
          <View style={styles.background}>


              <TextInput

                  onChangeText={this.handleDescChange}
                  placeholder='Enter Description'
                  style={{
                      flex: 1,
                      fontSize: hp('2%'),

                  }}
              />
          </View>
          </View>

          
        </View>
       
     </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  background: {
    paddingHorizontal: wp('4.17%'),
    width: wp('88.89%'),
    height: hp('6.11%'),
    borderColor: '#BFBEBE',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',

    alignSelf: 'center',
},
TextInputName: {
  marginLeft: wp('5.56%'),
  fontFamily: 'Montserrat_SemiBold',
  fontSize: hp('3%'),
  marginBottom: hp('1.81%'),
},
});
