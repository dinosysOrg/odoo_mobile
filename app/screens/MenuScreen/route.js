import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, Platform  } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Menu from './index';
import Product from '../ProductScreen/index';
import Profile from '../ProfileScreen/index';
import Setting from '../SettingScreen/index';
import CustomerList from '../CustomerScreen/index';
import SaleScreen from '../SaleScreen';
export const SideMenu = DrawerNavigator(
  {
    ProfileScreen: {
      screen: Profile
    },
    ProductScreen: {
      screen: Product
    },
    SettingsScreen: {
      screen: Setting
    },
    CustomerScreen: {
      screen: CustomerList
    },
    SaleScreen: {
      screen: SaleScreen
    }
  },
  {
    drawerWidth: Dimensions.get('window').width * 3/4,
    drawerPosition: 'left',
    contentComponent: props => <Menu {...props} />
  }
)
