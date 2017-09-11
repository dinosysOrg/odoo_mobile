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
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

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

          <MenuItem title="Customers" icon="users" selected={selectedItem==3}
                onPress={() => this._selectScreen('CustomerScreen', 3)} />

         </View>
         </ScrollView>

      </View>
    );
  }
}
