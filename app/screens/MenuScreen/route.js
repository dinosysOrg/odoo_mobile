import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, Platform  } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Menu from './index';
import Product from '../ProductScreen/index';
import Setting from '../SettingScreen/index';
import CustomerList from '../CustomerScreen/index';
import SaleScreen from '../SaleScreen';

//List of screen in menu
export const SideMenu = DrawerNavigator(
  {
    SaleScreen: {
      screen: SaleScreen
    },
    ProductScreen: {
      screen: Product
    },
    CustomerScreen: {
      screen: CustomerList
    },
    SettingScreen: {
      screen: Setting
    },
  },
  {
    drawerWidth: Dimensions.get('window').width * 3/4,
    drawerPosition: 'left',
    contentComponent: props => <Menu {...props} />
  }
)
