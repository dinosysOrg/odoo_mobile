import React from 'react';
import { StyleSheet, Image, View, Text, Icon, TouchableOpacity  } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Menu from './Menu';
import Home from '../HomeScreen/Home';

export const HomeStack = StackNavigator(
  {
    Home_Screen: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'HOME',
        headerLeft: <DrawerButton navigation={navigation}  />
      }),
    }
  }
);

const DrawerButton = (props) => {
	return (
    <View>
      <TouchableOpacity onPress={() => {props.navigation.navigate('DrawerOpen')}}>
        <Image
          source = {require('../../images/menu.png')}
          style = {{tintColor: 'blue', padding: 10, marginLeft: 10, width: 44, height: 44}}
        />
      </TouchableOpacity>
    </View>
  );
};

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
