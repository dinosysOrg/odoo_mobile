import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, Platform  } from 'react-native';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import MainScreen from '../screens/MainScreen/index';
import LoginScreen from '../screens/LoginScreen/index';
import { SideMenu } from '../screens/MenuScreen/route';
import strings from '../strings';
import Icon from 'react-native-vector-icons/Entypo';

export const AppNavigator = StackNavigator({



  Main: { screen: SideMenu,
          navigationOptions: ({navigation}) => ({
              title: strings.home_screen.title,
              headerStyle: { backgroundColor: '#5FC5B0' },
              headerTintColor: 'white',
              headerLeft: <DrawerButton navigation={navigation}/>
          })
  },
  Login: {
          screen: LoginScreen,
          navigationOptions: {
                  title: strings.login_screen.title,
                  headerStyle: { backgroundColor: '#1FC36A' },
                  headerTintColor: 'white'
          }
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
    <View>
      <TouchableOpacity onPress={() => {
        console.log("drawer",props)
        props.navigation.navigate('DrawerToggle')}
      }>
        <Icon name='menu' color='white' size={44} />
      </TouchableOpacity>
    </View>
  );
};

export default connect(mapStateToProps)(AppWithNavigationState);
