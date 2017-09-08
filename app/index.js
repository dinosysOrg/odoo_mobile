import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './navigators/AppNavigator';
import store from './redux/configStore';

export default class OdooMobile extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }

}