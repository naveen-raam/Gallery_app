/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {StyleSheet, View,  Image, BackHandler, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { Text, Icon } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import {Actions} from 'react-native-router-flux';


export default class addNote extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,

        title: '',
        desc: '',
        image: '',
        imageCount: 0,

      
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

selectFile = () => {
  ImagePicker.openPicker({
    multiple: true
  }).then(images => {
    // console.log(images);
    this.setState({image: images, imageCount: images.length})

  });
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
                  maxLength={100}
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
                    maxLength={100}
                    style={{
                        flex: 1,
                        fontSize: hp('2%'),

                    }}
                />
            </View>
          </View>
          <View style = {{marginTop: hp('1.81%'),}}>
           <Text style={styles.TextInputName}>Select File(s)</Text>
              <TouchableOpacity onPress={this.selectFile} style={styles.background}  >
                <Icon name="ios-add" style={styles.icon} />
                <Text style = {{fontSize: hp('2%')}}> tap to add image(s)</Text>
              </TouchableOpacity>   
            <Text style = {{fontSize: hp('2%'), marginLeft: wp('5.56%'), color: '#BC2C3D', }}> {this.state.imageCount} image(s) added</Text>
          </View>

          <TouchableOpacity
                            style={[styles.button, { marginTop: hp('3.47%') }]}
                            onPress={() => {
                                console.log("Add pressed");
                                //this.props.navigation.navigate('SignupEmail');

                                Actions.pop()
                            }}
                        >
                            <View style={[styles.horizontalContainer]}>

                                <Text style={{ marginLeft: ('1.39%'), color: "#BC2C3D" }} >Add</Text>
                            </View>
          </TouchableOpacity>

          
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
button: {


  color: '#BC2C3D',
  backgroundColor: '#EFD2BC',
  fontSize: hp('5%'),
  textAlign: 'center',

  width: wp('88.89%'),
  height: hp('6.67%'),
  marginLeft: wp('5.56%'),
  textAlignVertical: "center",

  alignContent: 'center',
  borderColor: '#707070',
  borderRadius: 5,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',




},
});
