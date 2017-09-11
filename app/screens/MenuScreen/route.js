import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, Platform  } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Menu from './index';
import Home from '../HomeScreen/index';
import Profile from '../ProfileScreen/index';
import Setting from '../SettingScreen/index';
import CustomerList from '../CustomerScreen/index';

export const SideMenu = DrawerNavigator(
  {
    HomeScreen: {
      screen: Home
    },
    ProfileScreen: {
      screen: Profile
    },
    SettingsScreen: {
      screen: Setting
    },
    CustomerScreen: {
      screen: CustomerList
    },
  },
  {
    drawerWidth: Dimensions.get('window').width * 3/4,
    drawerPosition: 'left',
    contentComponent: props => <Menu {...props} />
  }
)
