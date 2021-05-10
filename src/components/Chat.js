import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, TextInput, AsyncStorage,FlatList, ScrollView,RefreshControl,Image} from 'react-native';
import { Text, Icon } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';




export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,

        data: "",

      
    };
  }

  componentDidMount = () => {
    this.setState({loading: false});
    console.log("all props" , this.props.data)
    let r = []

    AsyncStorage.getAllKeys((err,keys) => {
      // console.log(keys)
      AsyncStorage.multiGet(keys, (err,stores) => {
        stores.map((result,i,store) => {
          let key = store[i][0];
          let value = store[i][1];
          // console.log(key)
          var obj = JSON.parse(value)
          if(obj.item){
            for(var x in obj.item){
              if(obj.key == this.props.data[1]){
              console.log(obj.item[x].path)
              let temp = {
                id:x,
                uri: obj.item[x].path,
              }
              r.push(temp)
            }
            }
            //console.log(obj.item[0].path)
          }
          
        })
        console.log("hhh",r)
        this.setState({data:r})
      })
      
    })
    
  };



  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    

    <TouchableOpacity  
          
    style={{flex:1/3, 
    aspectRatio:1}}>
      
   <Image style={{marginTop: hp("5%"), flex: 1}} resizeMode='contain' source={{ uri:  item.uri}}></Image>
</TouchableOpacity>
  );

  render() {
    return (
      <ScrollView>
        <Text style={styles.TextInputName}>{this.props.data[4]}</Text>
        <Text style={styles.descriptionText}>{this.props.data[0]}</Text>
     
        <FlatList
       
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </ScrollView>
     
    );
  }

}

const styles = StyleSheet.create({
 
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
  descriptionText: {
  marginLeft: wp('5.56%'),
  fontFamily: 'Montserrat_SemiBold',
  fontSize: hp('2%'),
  marginBottom: hp('1.81%'),
},
});
