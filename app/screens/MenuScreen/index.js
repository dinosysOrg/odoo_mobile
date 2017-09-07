import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

let SideMenuWidth = Dimensions.get('window').width * 3/4

export default class Menu extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.sideMenu}>

        <View style={styles.avatarView}>
          <Image style={styles.avatar} source={{uri: 'https://avatarfiles.alphacoders.com/798/79894.jpg'}}  />
          <Text style={styles.userName}> Albert Einstein </Text>
        </View>

         <ScrollView>
         <View style={{paddingTop:10, flex: 1}}>

         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HomeScreen')} >
               <Icon name='home' color='white' size={24} />
               <Text style={styles.menuText} >Home</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileScreen')} >
               <Icon name='user-o' color = 'white' size={24} />
               <Text style={styles.menuText} >Profile</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileScreen')} >
               <Icon name='cog' color = 'white' size={24} />
               <Text style={styles.menuText} >Settings</Text>
         </TouchableOpacity>

         </View>
         </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: SideMenuWidth,
        flexDirection: 'column',
        backgroundColor: '#2A3C47',
    },

    avatarView: {
      top: 0,
      right: 0,
      left: 0,
      width: SideMenuWidth,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'gray',
      paddingTop: 10,
    },

    avatar: {
      width: SideMenuWidth/2,
      height: SideMenuWidth/2,
      borderWidth: 2,
      borderColor: 'yellow',
      borderRadius: SideMenuWidth/4,
      shadowColor: 'yellow',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 10,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 5,
    },

    menuText: {
        marginLeft: 20,
        color: 'white',
        fontWeight: '700',
    },

    userName: {
      marginTop: 10,
      fontWeight: '700',
      color: 'white',
    },
})
