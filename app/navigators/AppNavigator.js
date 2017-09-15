import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, Platform  } from 'react-native';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import MainScreen from '../screens/MainScreen/index';
import LoginScreen from '../screens/LoginScreen/index';
import { SideMenu } from '../screens/MenuScreen/route';
import strings from '../strings';
import { Ionicons } from '@expo/vector-icons';

export const AppNavigator = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
            title: strings.login_screen.title,
            headerStyle: { backgroundColor: '#54bda7' },
            headerTintColor: 'white'
    }
  },
  Main: { screen: SideMenu,
    navigationOptions: ({navigation}) => ({
        title: strings.home_screen.title,
        headerStyle: { backgroundColor: '#5FC5B0' },
        headerTintColor: 'white',
        headerLeft: <DrawerButton navigation={navigation}/>
    })
  },

});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

const DrawerButton = (props) => {
	return (
      <TouchableOpacity style={styles.container} onPress={() => {
        props.navigation.navigate('DrawerToggle')}
      }>
        <Ionicons style={styles.menuIcon} name="ios-menu" size={32} color="white" style={styles.menuIcon} />
      </TouchableOpacity>
  );
};


const styles = {
  container: {
  },
  menuIcon: {
      padding: 10
  }
}

export default connect(mapStateToProps)(AppWithNavigationState);
