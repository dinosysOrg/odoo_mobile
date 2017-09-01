import React from 'react';
import { StyleSheet, Image, View, Text  } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Menu from './Menu';
import Home from '../HomeScreen/Home';

export const HomeStack = StackNavigator(
  {
    Home_Screen: {
      screen: Home,
      navigationOptions: {
        title: "Home"
      },
    }
  }
);

export const SideMenu = DrawerNavigator(
  {
    Home: {
      screen: HomeStack
    }
  },
  {
    drawerWidth: 200,
    drawerPosition: 'left',
    contentComponent: props => <Menu {...props} />
  }
)
