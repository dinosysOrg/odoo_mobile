import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import MainScreen from '../screens/MainScreen/index';
import LoginScreen from '../screens/LoginScreen/index';
import strings from '../strings';
export const AppNavigator = StackNavigator({
  Login: { 
          screen: LoginScreen, 
          navigationOptions: { 
                  title: strings.login_screen.title,
                  headerStyle: { backgroundColor: '#397ad0' },
                  headerTintColor: 'white'
          }  
  },
  Main: { screen: MainScreen,  
          navigationOptions: { 
              title: strings.home_screen.title,
              headerStyle: { backgroundColor: '#397ad0' },
              headerTintColor: 'white'
          } 
        }
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

export default connect(mapStateToProps)(AppWithNavigationState);