import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ProfileScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>
            The profile screen
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