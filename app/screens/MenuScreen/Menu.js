import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class Menu extends Component {
  render() {
    return (
      <View style = {{ flex: 1, backgroundColor: 'blue'}}>
        <Text> Menu </Text>
      </View>
    );
  }
}
