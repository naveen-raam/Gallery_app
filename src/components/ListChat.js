import React, {Component} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
  AsyncStorage,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import firebase from '../config/Fire';
import {Bubbles} from 'react-native-loader';
import {ScrollView} from 'react-native-gesture-handler';

export default class ListChat extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoading: true,
      refresh: false,

      data : [],
    };
  }

  componentDidMount() {
    let r = []
    firebase.shared.getAlluser(this.listUser);
    AsyncStorage.getAllKeys((err,keys) => {
      console.log(keys)
      AsyncStorage.multiGet(keys, (err,stores) => {
        stores.map((result,i,store) => {
          let key = store[i][0];
          let value = store[i][1];
          console.log(key)
          var obj = JSON.parse(value)
          if(obj.item){
            let temp = {
              id: key,
              title: obj.title,
              desc: obj.desc,
              path: obj.item[0].path
            }
            // console.log(obj.item[0].path)
            //console.log(temp)
            r.push(temp)
            
            // console.log(obj.title)
          }
          
        })
        console.log(r,"ff")
        this.setState({data:r})
      })
    })
    
  }

  listUser = users => {
    this.setState({users, isLoading: false});
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (

    <TouchableOpacity  
          onPress={() =>
        Actions.chat({
          title: item.id,
          receiverId: item.desc,
          image: item.title,
          email: item.desc,
          address: item.desc,
        })
      }
    style={{flex:1/3, 
    aspectRatio:1}}>
      <Text style={styles.TextInputName}>{item.title}</Text>
      <Text style={styles.descriptionText}>{item.desc}</Text>
   <Image style={{flex: 1}} resizeMode='contain' source={{ uri:  item.path}}></Image>
</TouchableOpacity>
  );

  onRefresh = () => {
    this.setState({refresh: true});
    let r = []
    AsyncStorage.getAllKeys((err,keys) => {
      console.log(keys)
      AsyncStorage.multiGet(keys, (err,stores) => {
        stores.map((result,i,store) => {
          let key = store[i][0];
          let value = store[i][1];
          console.log(key)
          var obj = JSON.parse(value)
          if(obj.item){
            let temp = {
              id: key,
              title: obj.title,
              desc: obj.desc,
              path: obj.item[0].path
            }
            // console.log(obj.item[0].path)
            //console.log(temp)
            r.push(temp)
            
            // console.log(obj.title)
          }
          
        })
        console.log(r,"ff")
        this.setState({data:r})
      })
    })
    this.setState({refresh: false});
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <Text style={styles.loadingText}>Please Wait...</Text>
        <Bubbles size={15} color="#BC2C3D" />
      </View>
    ) : (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={this.onRefresh}
            refreshing={this.state.refresh}
          />
        }>
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
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 22,
    fontWeight: 'bold',
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
descriptionText: {
  marginLeft: wp('5.56%'),
  fontFamily: 'Montserrat_SemiBold',
  fontSize: hp('2%'),
  marginBottom: hp('1.81%'),
},
});
