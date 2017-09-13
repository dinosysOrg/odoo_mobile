import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class SaleScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>
            The sales  screen
        </Text>
      </View>
    );
  }
}

const styles= {
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
}