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

const MenuItem = ({title, icon, onPress, selected}) => (
  <TouchableOpacity style={selected ? styles.menuItemSelected : styles.menuItem}
      onPress={onPress} >
        <View style={{height:30, width:30, alignItems: 'center'}}>
          <Icon name={icon} color={selected ? '#5FC5B0' : 'gray'} size={30} />
        </View>
        <Text style={selected ? styles.menuTextSelected: styles.menuText} >{title}</Text>
  </TouchableOpacity>
)

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0,
    };
  }

  _selectScreen = (name, index) => {
    this.setState({selectedItem : index});
    let { navigation } = this.props;
    navigation.navigate(name);
  }

  _getStyle(infrc) {

  }

  render() {
    const { navigation } = this.props
    let { selectedItem } = this.state;

    return (
      <View style={styles.sideMenu}>

        <View style={styles.avatarView}>
          <Image style={styles.avatar} source={{uri: 'https://avatarfiles.alphacoders.com/798/79894.jpg'}}  />
          <Text style={styles.userName}> MEWO MEWO </Text>
        </View>

         <ScrollView>
         <View style={{paddingTop:10, flex: 1}}>

         <MenuItem title="Home" icon="home" selected={selectedItem==0}
            onPress={() => this._selectScreen('HomeScreen', 0)} />

          <MenuItem title="Profile" icon="user" selected={selectedItem==1}
               onPress={() => this._selectScreen('ProfileScreen', 1)} />

          <MenuItem title="Setting" icon="gear" selected={selectedItem==2}
                onPress={() => this._selectScreen('SettingsScreen', 2)} />

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
        backgroundColor: 'white',
    },

    avatarView: {
      top: 0,
      right: 0,
      left: 0,
      width: SideMenuWidth,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
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
    },

    menuItemSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 50,
        paddingVertical: 10,
    },

    menuText: {
        left: 20,
        color: 'gray',
        fontWeight: '700',
    },

    menuTextSelected: {
        left: 20,
        color: '#5FC5B0',
        fontWeight: '700',
    },

    userName: {
      marginTop: 10,
      fontWeight: '700',
      color: '#5FC5B0',
    },
})
