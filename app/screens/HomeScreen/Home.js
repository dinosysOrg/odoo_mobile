import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style = {{ flex: 1, width: 60, height: 44}}>
        <TouchableOpacity style = {{backgroundColor: 'red'}}
          onPress = {() => {this.props.navigation.navigate('DrawerOpen')}}
        >
          <Text> Menu </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
