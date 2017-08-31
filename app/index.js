import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Odoo from'./odoo/index';

var odoo = new Odoo({
  host: 'localhost',
  port: 4569,
  database: '4yopping',
  username: 'admin',
  password: '4yopping'
});

// Connect to Odoo
odoo.connect(function (err) {
  if (err) { return console.log(err); }

  // Get a partner
  odoo.get('res.partner', 4, function (err, partner) {
    if (err) { return console.log(err); }

    console.log('Partner', partner);
  });
});
export default class OdooMobile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
