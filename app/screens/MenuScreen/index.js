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
import { FontAwesome } from '@expo/vector-icons';
import strings from '../../strings';

const MenuItem = ({title, icon, onPress, selected}) => (
  <TouchableOpacity style={selected ? styles.menuItemSelected : styles.menuItem}
      onPress={onPress} >
        <View style={{height:30, width:30, alignItems: 'center'}}>
            <FontAwesome name={icon} size={26} c color={selected ? '#5FC5B0' : 'gray'} />
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
    this.menuList = [
      {title: strings.slide_menu.profile, icon: "user", screen: "ProfileScreen"},
      {title: strings.slide_menu.sale, icon: "tags", screen: "SaleScreen"},
      {title: strings.slide_menu.product, icon: "steam",  screen: "HomeScreen"},
      {title: strings.slide_menu.customer, icon: "users",  screen: "CustomerScreen"},
      {title: strings.slide_menu.logout, icon: "sign-out",  screen: "Logout"},
    ]
  }

  _selectScreen = (name, index) => {
    this.setState({selectedItem : index});
    let { navigation } = this.props;
    navigation.navigate(name);
  }

  _renderMenuItem = (item, index) => (
          <MenuItem key={index}
            title={item.title}
            icon={item.icon}
            selected={this.state.selectedItem == index}
            onPress={() => this._selectScreen(item.screen, index)} />
  )

  _renderMenus = () => (
      this.menuList.map((item, index) => this._renderMenuItem(item, index))
  )

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.sideMenu}>

        <View style={styles.avatarView}>
          <Image style={styles.avatar} source={{uri: 'https://avatarfiles.alphacoders.com/798/79894.jpg'}}  />
          <Text style={styles.userName}> MEWO MEWO </Text>
        </View>

         <ScrollView>
            <View style={ {paddingTop: 10, flex: 1} }>
                  {this._renderMenus()}
            </View>
         </ScrollView>

      </View>
    );
  }
}
